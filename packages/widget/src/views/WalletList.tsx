import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import { useTanto } from '../hooks/useTanto';
import { useWallets } from '../hooks/useWallet';
import { useWidget } from '../hooks/useWidget';
import { Route } from '../types/route';

// WIP
export function WalletList() {
  const { setWallet } = useTanto();
  const wallets = useWallets();
  const { isConnected } = useAccount();
  const { goTo, hide } = useWidget();

  useEffect(() => {
    if (isConnected) hide();
  }, [isConnected]);

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        textAlign: 'center',
      }}
    >
      {wallets.map(wallet => (
        <div
          css={{
            backgroundColor: 'rgba(205, 213, 229, 0.07)',
            padding: 16,
          }}
          onClick={() => {
            setWallet(wallet);
            goTo(Route.CONNECT, {
              title: wallet.name,
            });
          }}
          key={wallet.id}
        >
          Connect to {wallet.name}
        </div>
      ))}
    </div>
  );
}
