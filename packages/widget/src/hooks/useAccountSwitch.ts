import { useEffect, useRef } from 'react';
import { useAccount } from 'wagmi';

export const useAccountSwitch = (callback: (newAddress: string, oldAddress: string) => void) => {
  const { address, isConnected } = useAccount();
  const previousAddress = useRef<string | undefined>(address);

  useEffect(() => {
    if (isConnected && address && previousAddress.current && previousAddress.current !== address)
      callback(address, previousAddress.current);
    previousAddress.current = address;
  }, [address, isConnected, callback]);
};
