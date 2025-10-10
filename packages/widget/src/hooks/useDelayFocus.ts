import { RefObject, useEffect } from 'react';

import { TRANSITION_DURATION } from '../constants';

export function useDelayFocus<T extends HTMLElement>(ref: RefObject<T>, delay: number = TRANSITION_DURATION * 1.5) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      ref.current?.focus();
    }, delay);

    return () => clearTimeout(timeout);
  }, [ref, delay]);
}
