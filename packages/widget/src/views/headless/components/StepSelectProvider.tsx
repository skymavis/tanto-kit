import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Box } from '../../../components/box/Box';
import { Button } from '../../../components/button/Button';
import { Countdown } from '../../../components/countdown/Countdown';
import { Input } from '../../../components/input/Input';
import { useDelayFocus } from '../../../hooks/useDelayFocus';
import { HttpError } from '../../../services/api/HttpClient';
import { mutation } from '../../../services/queries';
import { PreferredMethod } from '../../../types/wallet';
import { getSecondsFromMessage } from '../../../utils/string';
import { SocialButtons } from './SocialButtons';

const emailSchema = z.object({
  email: z.email('Invalid email address.').min(1, 'Email is required.'),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface StepSelectProviderProps {
  onSendEmailSuccess: (email: string) => void;
  onAuthSocialSuccess: (preferMethod: PreferredMethod) => void;
  onAuthSocialError: (error: HttpError) => void;
}

const Form = styled.form({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '32px !important',
  gap: 16,
});

export function StepSelectProvider({
  onSendEmailSuccess,
  onAuthSocialSuccess,
  onAuthSocialError,
}: StepSelectProviderProps) {
  const [retryWaitSeconds, setRetryWaitSeconds] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid: isFormValid },
    watch,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: 'onSubmit',
    defaultValues: { email: '' },
  });

  const emailValue = watch('email');

  const initOTPPasswordlessMutation = useMutation({
    ...mutation.initOTPPasswordless(),
    onSuccess: () => {
      setRetryWaitSeconds(0);
    },
    onError: (error: Error) => setRetryWaitSeconds(getSecondsFromMessage(error.message)),
  });

  useDelayFocus(inputRef);

  const canSubmitEmail = isFormValid && !initOTPPasswordlessMutation.isPending;

  const handleEmailSubmit = useCallbackRef(async ({ email }: EmailFormData) => {
    try {
      await initOTPPasswordlessMutation.mutateAsync({ email });
      onSendEmailSuccess(email);
    } catch (error) {
      console.debug('Failed to send OTP:', error);
    }
  });

  useEffect(() => {
    initOTPPasswordlessMutation.reset();
    setRetryWaitSeconds(0);
  }, [emailValue]);

  return (
    <Box vertical gap={16}>
      <Form onSubmit={handleSubmit(handleEmailSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="your@gmail.com"
              ref={inputRef}
              readOnly={initOTPPasswordlessMutation.isPending}
              error={errors.email?.message}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Countdown pendingTime={retryWaitSeconds}>
          {({ count }) => {
            const isCountingDown = count > 0;

            if (isCountingDown) {
              return (
                <Button fullWidth disabled>
                  Try again in {count.toString().padStart(2, '0')}s
                </Button>
              );
            }

            return (
              <Button
                fullWidth
                disabled={!canSubmitEmail}
                loading={initOTPPasswordlessMutation.isPending}
                type="submit"
              >
                Continue
              </Button>
            );
          }}
        </Countdown>
      </Form>

      <SocialButtons onSuccess={onAuthSocialSuccess} onError={onAuthSocialError} />
    </Box>
  );
}
