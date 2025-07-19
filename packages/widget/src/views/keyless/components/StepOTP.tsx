import { useTheme } from '@emotion/react';

import { Box } from '../../../components/box/Box';
import { OTPInput } from '../../../components/otp-input/OTPInput';
import { ResendEmail } from './ResendEmail';

export interface StepOTPProps {
  email: string;
  onOTPSubmit: (code: string) => void;
  onResend: () => void;
  isLoading?: boolean;
}

export function StepOTP({ email, onOTPSubmit, onResend, isLoading = false }: StepOTPProps) {
  const theme = useTheme();

  return (
    <Box fullWidth vertical align="center" css={{ textAlign: 'center' }}>
      <h1 css={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Enter confirmation code</h1>
      <p css={{ fontSize: 14, fontWeight: 400, marginBottom: 48, color: theme.mutedText, maxWidth: 340 }}>
        Please check <span css={{ color: theme.bodyText }}>{email}</span> and enter the code below.
      </p>
      <div css={{ marginBottom: 48 }}>
        <OTPInput length={6} onComplete={onOTPSubmit} isDisabled={isLoading} />
      </div>
      <ResendEmail css={{ marginTop: 48 }} onResend={onResend} />
    </Box>
  );
}
