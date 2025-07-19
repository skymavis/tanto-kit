import { useTheme } from '@emotion/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Box } from '../../../components/box/Box';
import { Button } from '../../../components/button/Button';
import { Input } from '../../../components/input/Input';
import { TRANSITION_DURATION } from '../../../constants';

const passwordLessSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});

type PasswordLessFormData = z.infer<typeof passwordLessSchema>;

export interface StepMigratePasswordProps {
  onSubmit: (data: PasswordLessFormData) => void;
}

export function StepMigratePassword({ onSubmit }: StepMigratePasswordProps) {
  const theme = useTheme();
  const passwordLessInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PasswordLessFormData>({
    resolver: zodResolver(passwordLessSchema),
    mode: 'onSubmit',
    defaultValues: {
      password: '',
    },
  });

  useEffect(() => {
    setTimeout(() => {
      if (passwordLessInputRef.current) {
        passwordLessInputRef.current.focus();
      }
    }, TRANSITION_DURATION * 1.5);
  }, []);

  return (
    <Box fullWidth vertical align="center" css={{ textAlign: 'center' }}>
      <h1 css={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Account migration</h1>
      <div css={{ marginBottom: 48 }}>
        <p css={{ fontSize: 14, fontWeight: 400, color: theme.mutedText, maxWidth: 340 }}>
          Your account needs to be recovered to passwordless authentication.
        </p>
      </div>
      <form css={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => {
            const { ref, ...rest } = field;
            return (
              <Input
                ref={composeRefs(passwordLessInputRef, ref)}
                css={{ width: '100%', marginBottom: 16 }}
                placeholder="Recovery password"
                error={errors.password?.message}
                {...rest}
              />
            );
          }}
        />
        <Button disabled={!isValid} fullWidth type="submit">
          Continue
        </Button>
      </form>
    </Box>
  );
}
