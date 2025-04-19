import { Box } from '../components/box/Box';
import { DashedDivider } from '../components/dashed-divider/DashedDivider';
import { Disclaimer } from '../components/disclaimer/Disclaimer';
import { useWallets } from '../hooks/useWallets';
import { WalletGroup } from './Connect/WalletGroup';

export function WalletList() {
  const { primaryWallets, secondaryWallets } = useWallets();

  return (
    <Box vertical gap={20}>
      <WalletGroup wallets={primaryWallets} />
      {secondaryWallets.length > 0 && (
        <Box vertical gap={12}>
          <DashedDivider text="Other wallets" />
          <WalletGroup wallets={secondaryWallets} />
        </Box>
      )}
      <Disclaimer />
    </Box>
  );
}
