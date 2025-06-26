import { useEffect } from 'react';

import { analytic } from '../../analytic';
import { TransitionedView } from '../../components/animated-containers/TransitionedView';
import { Box } from '../../components/box/Box';
import { CopyButton } from '../../components/copy-button/CopyButton';
import { GetWalletCTA } from '../../components/get-wallet-cta/GetWalletCTA';
import { WCQRCode } from '../../components/qr-code/WCQRCode';
import { RONIN_WALLET_APP_DEEPLINK } from '../../constants';
import { useWalletConnectUri } from '../../hooks/useWalletConnectUri';
import { useWidgetConnect } from '../../hooks/useWidgetConnect';
import { ConnectState } from '../../types/connect';
import { generateRoninMobileWCLink, isMobile } from '../../utils';
import { openWindow } from '../../utils/openWindow';
import { ConnectLayout } from './components/ConnectLayout';
import { ScanGuideline } from './components/ScanGuideline';

const ScanQRCode = ({ uri }: { uri: string | undefined }) => {
  return (
    <Box vertical align="center" justify="center" gap={20} pt={20}>
      <Box vertical align="center" justify="center" gap={16}>
        <CopyButton value={uri}>Copy link</CopyButton>
        <WCQRCode value={uri} />
        <ScanGuideline />
      </Box>
      <GetWalletCTA />
    </Box>
  );
};

export function ConnectWC() {
  const mobile = isMobile();
  const { selectedWallet, selectedConnector } = useWidgetConnect();
  const { uri, status, generateConnectUri, error } = useWalletConnectUri({
    connector: selectedConnector,
    onReceiveDisplayUri: uri => {
      if (mobile) openWindow(generateRoninMobileWCLink(uri, RONIN_WALLET_APP_DEEPLINK));
    },
  });

  useEffect(() => {
    analytic.sendEvent('wallet_connect_attempt', {
      chain_id: selectedConnector?.chainId,
      wallet_type: selectedConnector?.name,
    });
  }, [selectedConnector]);

  useEffect(() => {
    if (status === ConnectState.ERROR && error) {
      analytic.sendEvent('wallet_connect_fail', {
        chain_id: selectedConnector?.chainId,
        wallet_type: selectedWallet?.name,
        error_reason: error.message,
      });
    }
  }, [status, error, selectedConnector, selectedWallet]);

  if (!selectedWallet) return null;

  if (mobile) return <ConnectLayout status={status} wallet={selectedWallet} wcUri={uri} onRetry={generateConnectUri} />;

  return (
    <TransitionedView viewKey={status}>
      {status === ConnectState.PENDING ? (
        <ScanQRCode uri={uri} />
      ) : (
        <ConnectLayout status={status} wallet={selectedWallet} wcUri={uri} onRetry={generateConnectUri} />
      )}
    </TransitionedView>
  );
}
