import { useEffect, useState } from 'react';

import { isSafeWallet } from '../utils';

export const useIsSafeWallet = () => {
  const [isSafe, setIsSafe] = useState(false);

  useEffect(() => {
    const check = async () => {
      const result = await isSafeWallet();
      setIsSafe(result);
    };

    check();
  }, []);

  return { isSafe };
};
