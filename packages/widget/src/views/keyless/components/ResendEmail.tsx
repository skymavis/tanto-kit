import { useTheme } from '@emotion/react';
import { useEffect } from 'react';

import { useCountdown } from '../../../hooks/useCountdown';

export interface ResendEmailProps {
  onResend?: () => void | Promise<void>;
  pendingTime?: number;
  className?: string;
  label?: string;
  resendText?: string;
}

export function ResendEmail({
  onResend,
  className,
  pendingTime = 30,
  label = "Didn't get an email?",
  resendText = 'Resend code',
}: ResendEmailProps) {
  const theme = useTheme();
  const [count, { startCountdown, resetCountdown }] = useCountdown({ countStart: pendingTime });

  useEffect(() => {
    startCountdown();
  }, [startCountdown]);

  const resendHandler = async () => {
    onResend?.();
    resetCountdown();
    startCountdown();
  };

  return (
    <div css={{ color: theme.mutedText, fontSize: 14, textAlign: 'center', ...(className && { className }) }}>
      {label}{' '}
      {count === 0 ? (
        <span css={{ cursor: 'pointer', color: theme.linkColor }} onClick={resendHandler}>
          {resendText}
        </span>
      ) : (
        <>
          Send a new code in{' '}
          <span css={{ fontVariantNumeric: 'tabular-nums' }}>{`0${Math.floor(count)}`.slice(-2)}s</span>
        </>
      )}
    </div>
  );
}
