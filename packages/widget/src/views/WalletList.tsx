import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import { Box } from '../components/box/Box';
import { DashedDivider } from '../components/dashed-divider/DashedDivider';
import { useWallets } from '../hooks/useWallets';
import { useWidget } from '../hooks/useWidget';
import { WalletGroup } from './Connect/WalletGroup';

export function WalletList() {
  const { primaryWallets, secondaryWallets } = useWallets();
  const { isConnected } = useAccount();
  const { hide } = useWidget();

  useEffect(() => {
    if (isConnected) hide();
  }, [isConnected]);

  return (
    <Box vertical gap={20}>
      <WalletGroup wallets={primaryWallets} />
      {secondaryWallets.length > 0 && (
        <Box vertical gap={12}>
          <DashedDivider text="Other wallets" />
          <WalletGroup wallets={secondaryWallets} />
        </Box>
      )}
    </Box>
  );
}
