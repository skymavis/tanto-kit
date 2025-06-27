import { useAccount } from 'wagmi';

import { RONIN_WALLET_APP_DEEPLINK } from '../../constants';
import { useConnectorRequestInterceptor } from '../../hooks/useConnectorRequestInterceptor';
import { openWindow } from '../../utils/openWindow';
import { isMobile } from '../../utils/userAgent';
import { isWCConnector } from '../../utils/walletDetection';

export function useDeeplinkHandler() {
  const { connector } = useAccount();

  useConnectorRequestInterceptor({
    beforeRequest: () => {
      const shouldOpenDeepLink = isMobile() && connector && isWCConnector(connector.id);
      if (shouldOpenDeepLink) openWindow(RONIN_WALLET_APP_DEEPLINK);
    },
  });
}
