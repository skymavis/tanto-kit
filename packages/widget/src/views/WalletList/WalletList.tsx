import { useEffect } from 'react';

import { analytic } from '../../analytic';
import { Box } from '../../components/box/Box';
import { DashedDivider } from '../../components/dashed-divider/DashedDivider';
import { Disclaimer } from '../../components/disclaimer/Disclaimer';
import { GetWalletCTA } from '../../components/get-wallet-cta/GetWalletCTA';
import { useWidgetConnect } from '../../hooks/useWidgetConnect';
import { Wallet } from '../../types/wallet';
import { isMobile, isRoninInAppBrowser } from '../../utils';
import { WalletGroup } from './components/WalletGroup';

const mapWalletData = (item: Wallet) => {
  const { connector, name, homepage, id, isInstalled } = item;

  return {
    id,
    name,
    homepage,
    isInstalled,
    connector: {
      id: connector?.id,
      type: connector?.type,
      name: connector?.name,
      chainId: connector?.chainId,
    },
  };
};

export function WalletList() {
  const { primaryWallets, secondaryWallets } = useWidgetConnect();

  useEffect(() => {
    analytic.sendEvent('walletlist_view', {
      wallet_selected: primaryWallets.map(mapWalletData),
      wallets_available: [...primaryWallets, ...secondaryWallets].map(mapWalletData),
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
