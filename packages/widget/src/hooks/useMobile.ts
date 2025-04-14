import { useEffect, useState } from 'react';

import { isMobile } from '../utils/devices';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [mobile, setMobile] = useState<boolean | undefined>(isMobile());

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!mobile;
}
