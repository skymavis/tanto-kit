import { useEffect } from 'react';

import { analytic } from '../../analytic';
import { Box } from '../../components/box/Box';
import { DashedDivider } from '../../components/dashed-divider/DashedDivider';
import { Disclaimer } from '../../components/disclaimer/Disclaimer';
import { GetWalletCTA } from '../../components/get-wallet-cta/GetWalletCTA';
import { useWidgetConnect } from '../../hooks/useWidgetConnect';
import { isMobile, isRoninInAppBrowser } from '../../utils';
import { WalletGroup } from './components/WalletGroup';

export function WalletList() {
  const { primaryWallets, secondaryWallets } = useWidgetConnect();

  useEffect(() => {
    analytic.sendEvent('walletlist_view', {
      wallet_selected: primaryWallets,
      wallets_available: [...primaryWallets, ...secondaryWallets],
    });
  }, [primaryWallets, secondaryWallets]);

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
