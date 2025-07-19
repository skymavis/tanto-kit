import { useMemo } from 'react';

import { useWidgetUIConfig } from '../../../../contexts/widget-ui-config/useWidgetUIConfig';
import { useIsMobileView } from '../../../../hooks/useIsMobileView';
import type { Wallet } from '../../../../types/wallet';
import { isInjectedConnector, isWaypointConnector, isWCConnector } from '../../../../utils/walletDetection';

export function useWalletState(wallet: Wallet) {
  const { icon, connector, displayOptions = {} } = wallet;
  const { thumbnail, highlightBackground } = displayOptions;
  const { markKeylessWalletConnected = false, markWCConnected = false } = useWidgetUIConfig();
  const isMobile = useIsMobileView();

  return useMemo(() => {
    const isWaypointWallet = isWaypointConnector(connector?.id);
    const isWCWallet = isWCConnector(connector?.id);
    const isInjected = isInjectedConnector(connector?.type);
    const isMarkedConnected = (isWaypointWallet && markKeylessWalletConnected) || (isWCWallet && markWCConnected);

    return {
      walletLogo: thumbnail ?? icon,
      isMarkedConnected,
      isInjected,
      isWCWallet,
      isWaypointWallet,
      highlightContent: highlightBackground ? (isMobile ? 'Fastest' : 'Fastest to start') : undefined,
    };
  }, [
    thumbnail,
    icon,
    connector?.id,
    connector?.type,
    markKeylessWalletConnected,
    markWCConnected,
    highlightBackground,
    isMobile,
  ]);
}
