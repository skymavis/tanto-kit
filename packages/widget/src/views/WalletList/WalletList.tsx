import { Box } from '../../components/box/Box';
import { DashedDivider } from '../../components/dashed-divider/DashedDivider';
import { Disclaimer } from '../../components/disclaimer/Disclaimer';
import { GetWalletCTA } from '../../components/get-wallet-cta/GetWalletCTA';
import { useWallets } from '../../hooks/useWallets';
import { isMobile, isRoninWallet } from '../../utils';
import { WalletGroup } from './components/WalletGroup';

export function WalletList() {
  const isMobileDevice = isMobile();
  const isInApp = isRoninWallet();

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
      {isMobileDevice && !isInApp && <GetWalletCTA />}
      <Disclaimer />
    </Box>
  );
}
