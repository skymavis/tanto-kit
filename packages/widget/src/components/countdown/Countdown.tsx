import { useCallback, useEffect } from 'react';

import { useCountdown } from '../../hooks/useCountdown';

interface CountdownProps {
  pendingTime: number;
  children: (props: { count: number; start: () => void }) => React.ReactNode;
}

export function Countdown({ pendingTime, children }: CountdownProps) {
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: pendingTime,
  });

  const start = useCallback(() => {
    resetCountdown();
    startCountdown();
  }, [resetCountdown, startCountdown]);

  useEffect(() => {
    if (pendingTime >= 0) {
      start();
    }
  }, [pendingTime, start]);

  return children({
    count,
    start,
  });
}
