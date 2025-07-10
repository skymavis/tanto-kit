import { useEffect, useState } from 'react';

import { MOBILE_BREAKPOINT } from '../constants';
import { isMobile } from '../utils/userAgent';

export function useIsMobileView() {
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
