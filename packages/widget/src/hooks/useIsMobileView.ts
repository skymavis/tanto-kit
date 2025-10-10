import { useEffect, useState } from 'react';

import { MOBILE_BREAKPOINT } from '../constants';
import { isMobile } from '../utils/userAgent';

export function useIsMobileView(breakpoint: number = MOBILE_BREAKPOINT) {
  const [mobile, setMobile] = useState<boolean | undefined>(isMobile());

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => {
      setMobile(window.innerWidth < breakpoint);
    };
    mql.addEventListener('change', onChange);
    setMobile(window.innerWidth < breakpoint);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!mobile;
}
