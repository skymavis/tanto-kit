import { useCallback } from 'react';

import { useBoolean } from './useBoolean';
import { useCounter } from './useCounter';
import { useInterval } from './useInterval';

interface CountdownOptions {
  countStart: number;
  intervalMs?: number;
  isIncrement?: boolean;
  countStop?: number;
}

interface CountdownControllers {
  startCountdown: () => void;
  stopCountdown: () => void;
  resetCountdown: () => void;
}

export function useCountdown({
  countStart,
  countStop = 0,
  intervalMs = 1000,
  isIncrement = false,
}: CountdownOptions): [number, CountdownControllers] {
  const { count, increment, decrement, reset: resetCounter } = useCounter(countStart);

  const { value: isCountdownRunning, setTrue: startCountdown, setFalse: stopCountdown } = useBoolean(false);

  const resetCountdown = useCallback(() => {
    stopCountdown();
    resetCounter();
  }, [stopCountdown, resetCounter]);

  const countdownCallback = useCallback(() => {
    if (count === countStop) {
      stopCountdown();
      return;
    }

    if (isIncrement) {
      increment();
    } else {
      decrement();
    }
  }, [count, countStop, decrement, increment, isIncrement, stopCountdown]);

  useInterval(countdownCallback, isCountdownRunning ? intervalMs : null);

  return [count, { startCountdown, stopCountdown, resetCountdown }];
}
