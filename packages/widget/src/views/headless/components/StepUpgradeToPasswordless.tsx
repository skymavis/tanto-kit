import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

import { Hourglass } from '../../../assets/Hourglass';
import { TransitionedView } from '../../../components/animated-containers/TransitionedView';
import { Box } from '../../../components/box/Box';
import { Button } from '../../../components/button/Button';
import { DotLoading } from '../../../components/dot-loading/DotLoading';
import { PasswordInput } from '../../../components/password-input/PasswordInput';
import { useDelayFocus } from '../../../hooks/useDelayFocus';
import { mutation, query } from '../../../services/queries';

interface StepUpgradeToPasswordlessProps {
  onUpgradeSuccess: () => void;
  onCancelUpgrade: () => void;
}

const Title = styled.h1({
  fontSize: 20,
  fontWeight: 600,
  textAlign: 'center',
});

const Description = styled.p(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.mutedText,
  maxWidth: 340,
  textAlign: 'center',
}));

const Form = styled.form({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
});

const ActionButton = styled.span(({ theme }) => ({
  cursor: 'pointer',
  fontSize: 14,
  color: theme.linkColor,
}));

const passwordSchema = z.object({
  password: z.string().min(1, 'Please enter your recovery password.'),
});
type PasswordFormData = z.infer<typeof passwordSchema>;

enum Step {
  REQUEST_PASSWORD = 1,
  UPGRADE = 2,
}

export function StepUpgradeToPasswordless({ onUpgradeSuccess, onCancelUpgrade }: StepUpgradeToPasswordlessProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(Step.REQUEST_PASSWORD);
  const [error, setError] = useState<string | null>(null);

  const encryptedClientShardQuery = useQuery(query.encryptedClientShard());
  const decryptClientShardMutation = useMutation(mutation.decryptClientShard());
  const migrateToPasswordlessMutation = useMutation(mutation.migrateToPasswordless());
  const getUserProfileMutation = useMutation(mutation.getUserProfile());

  const {
    control,
    handleSubmit,
    formState: { errors, isValid: isFormValid },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: 'onSubmit',
    defaultValues: { password: '' },
  });

  const isLoadingDecrypt = decryptClientShardMutation.isPending;
  const isDisableButton = !isFormValid || encryptedClientShardQuery.isPending || isLoadingDecrypt;

  const errorMessage = errors.password?.message || error;

  const onSubmit = useCallbackRef(async ({ password }: PasswordFormData) => {
    try {
      if (!encryptedClientShardQuery.data) return;

      const clientShard = await decryptClientShardMutation.mutateAsync({
        encryptedClientShard: encryptedClientShardQuery.data.data.key,
        recoveryPassword: password,
      });

      setStep(Step.UPGRADE);

      await migrateToPasswordlessMutation.mutateAsync({ clientShard });
      const { preferMethod } = await getUserProfileMutation.mutateAsync();

      if (preferMethod === 'passwordless') {
        onUpgradeSuccess();
      }
    } catch {
      setError('Invalid recovery password.');
    }
  });

  useDelayFocus(inputRef);

  return (
    <TransitionedView viewKey={step}>
      {step === Step.REQUEST_PASSWORD && (
        <Box fullWidth vertical align="center" gap={32}>
          <Box vertical align="center" gap={4}>
            <Title>Upgrade your account</Title>
            <Description>Enter your recovery password to unlock a smoother and more secure experience.</Description>
          </Box>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  ref={inputRef}
                  placeholder="Recovery password"
                  readOnly={isLoadingDecrypt}
                  error={errorMessage}
                  value={field.value}
                  onChange={value => {
                    setError(null);
                    field.onChange(value);
                  }}
                />
              )}
            />

            <Button fullWidth disabled={isDisableButton} loading={isLoadingDecrypt} type="submit">
              Start upgrade
            </Button>

            <ActionButton onClick={onCancelUpgrade}>Not now? Continue with current version</ActionButton>
          </Form>
        </Box>
      )}

      {step === Step.UPGRADE && (
        <Box fullWidth vertical align="center" gap={32}>
          <Hourglass />
          <Box vertical gap={4} align="center">
            <Box gap={4} mb={8} align="flex-end">
              <Title css={{ lineHeight: '16px' }}>Upgrading</Title>
              <DotLoading />
            </Box>
            <Description>Please keep this page open.</Description>
          </Box>
        </Box>
      )}
    </TransitionedView>
  );
}
