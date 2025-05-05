import { Box } from '../../components/box/Box';
import { DashedDivider } from '../../components/dashed-divider/DashedDivider';
import { Disclaimer } from '../../components/disclaimer/Disclaimer';
import { GetWalletCTA } from '../../components/get-wallet-cta/GetWalletCTA';
import { useWallets } from '../../hooks/useWallets';
import { isMobile, isRoninInAppBrowser } from '../../utils';
import { WalletGroup } from './components/WalletGroup';

export function WalletList() {
  const { primaryWallets, secondaryWallets } = useWallets();

  return (
    <Box vertical gap={20}>
      <WalletGroup wallets={primaryWallets} />
      {secondaryWallets.length > 0 && (
        <Box vertical gap={12}>
          {primaryWallets.length > 0 && <DashedDivider text="Other wallets" />}
          <WalletGroup wallets={secondaryWallets} />
        </Box>
      )}
      {isMobile() && !isRoninInAppBrowser() && <GetWalletCTA />}
      <Disclaimer />
    </Box>
  );
}
