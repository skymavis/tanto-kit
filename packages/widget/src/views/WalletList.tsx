import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import { useWallets } from '../hooks/useWallets';
import { useWidget } from '../hooks/useWidget';
import { WalletGroup } from './Connect/WalletGroup';

// WIP
export function WalletList() {
  const { primaryWallets, secondaryWallets } = useWallets();
  const { isConnected } = useAccount();
  const { hide } = useWidget();

  useEffect(() => {
    if (isConnected) hide();
  }, [isConnected]);

  return (
    <div>
      <WalletGroup wallets={primaryWallets} />
      <WalletGroup wallets={secondaryWallets} />
    </div>
  );
}
