import styled from '@emotion/styled';

import { Countdown } from '../../../components/countdown/Countdown';
import { RESEND_EMAIL_PENDING_TIME } from '../../../constants';

interface ResendEmailProps {
  pendingTime?: number;
  className?: string;
  label?: string;
  resendText?: string;
  onResend?: () => void;
}

const Container = styled.div(({ theme }) => ({
  fontSize: 14,
  color: theme.mutedText,
  textAlign: 'center',
}));

const ResendButton = styled.span(({ theme }) => ({
  cursor: 'pointer',
  color: theme.linkColor,
}));

const Timer = styled.span({
  fontVariantNumeric: 'tabular-nums',
});

export function ResendEmail({
  onResend,
  className,
  pendingTime = RESEND_EMAIL_PENDING_TIME,
  label = "Didn't get an email?",
  resendText = 'Resend code',
}: ResendEmailProps) {
  return (
    <Container className={className}>
      {label}{' '}
      <Countdown pendingTime={pendingTime}>
        {({ count, start }) =>
          count === 0 ? (
            <ResendButton
              onClick={() => {
                onResend?.();
                start();
              }}
            >
              {resendText}
            </ResendButton>
          ) : (
            <>
              Send a new code in <Timer>{count.toString().padStart(2, '0')}s</Timer>
            </>
          )
        }
      </Countdown>
    </Container>
  );
}
