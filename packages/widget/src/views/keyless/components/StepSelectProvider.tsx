import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../../../components/button/Button';
import { Input } from '../../../components/input/Input';
import { TRANSITION_DURATION } from '../../../constants';

const emailSchema = z.object({
  email: z.email('Invalid email address').min(1, 'Email is required'),
});

type EmailFormData = z.infer<typeof emailSchema>;

export interface StepSelectProviderProps {
  onSubmit: (data: EmailFormData) => void;
  defaultEmail?: string;
}

export function StepSelectProvider({ onSubmit, defaultEmail = '' }: StepSelectProviderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: defaultEmail,
    },
  });

  const email = watch('email');

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, TRANSITION_DURATION * 1.5);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            ref={inputRef}
            css={{ marginBottom: 16 }}
            placeholder="your@gmail.com"
            error={errors.email?.message}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Button disabled={!email || !isValid} fullWidth type="submit">
        Continue
      </Button>
    </form>
  );
}
