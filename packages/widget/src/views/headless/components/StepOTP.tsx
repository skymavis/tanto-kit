import styled from '@emotion/styled';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { Box } from '../../../components/box/Box';
import { OTPInput } from '../../../components/otp-input/OTPInput';
import { useDelayFocus } from '../../../hooks/useDelayFocus';
import { HttpError } from '../../../services/api/HttpClient';
import { mutation } from '../../../services/queries';
import { PreferredMethod } from '../../../types/wallet';
import { ResendEmail } from './ResendEmail';

const MAX_OTP_LENGTH = 6;

interface StepOTPProps {
  email: string;
  clearOnError?: boolean;
  onOTPSuccess: (preferMethod: PreferredMethod) => void;
  onOTPError: (error: HttpError) => void;
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

const EmailHighlight = styled.span(({ theme }) => ({
  color: theme.bodyText,
}));

export function StepOTP({ email, clearOnError = false, onOTPSuccess, onOTPError }: StepOTPProps) {
  const [otp, setOTP] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const authenticateOTPMutation = useMutation(mutation.authenticateWithOTP());
  const getUserProfileMutation = useMutation(mutation.getUserProfile());
  const initOTPPasswordlessMutation = useMutation(mutation.initOTPPasswordless());

  const handleOTPSubmit = useCallbackRef(async (code: string) => {
    try {
      await authenticateOTPMutation.mutateAsync({ email, otp: code });
      const { preferMethod } = await getUserProfileMutation.mutateAsync();
      onOTPSuccess(preferMethod);
    } catch (error) {
      if (error instanceof HttpError) {
        onOTPError(error);
        return;
      }
      if (clearOnError) setOTP('');
    }
  });

  const handleOTPChange = useCallbackRef((code: string) => {
    setOTP(prevCode => {
      if (code.length !== prevCode.length) {
        authenticateOTPMutation.reset();
        return code;
      }
      if (prevCode.length === MAX_OTP_LENGTH) return prevCode;
      authenticateOTPMutation.reset();
      return code;
    });
  });

  const handleResend = useCallbackRef(() => {
    setOTP('');
    authenticateOTPMutation.reset();
    initOTPPasswordlessMutation.mutate({ email });
    inputRef.current?.focus();
  });

  useEffect(() => {
    if (authenticateOTPMutation.error?.message) inputRef.current?.focus();
  }, [authenticateOTPMutation.error?.message]);

  useDelayFocus(inputRef);

  return (
    <Box fullWidth vertical align="center" gap={48}>
      <Box vertical align="center" gap={4}>
        <Title>Enter confirmation code</Title>
        <Description>
          Please check <EmailHighlight>{email}</EmailHighlight> and enter the code below.
        </Description>
      </Box>

      <OTPInput
        ref={inputRef}
        value={otp}
        length={MAX_OTP_LENGTH}
        onChange={handleOTPChange}
        onComplete={handleOTPSubmit}
        isLoading={authenticateOTPMutation.isPending || getUserProfileMutation.isPending}
        isSuccess={authenticateOTPMutation.isSuccess}
        error={authenticateOTPMutation.error?.message}
      />

      <ResendEmail onResend={handleResend} />
    </Box>
  );
}
