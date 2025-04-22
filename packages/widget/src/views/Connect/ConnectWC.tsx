import { memo } from 'react';

import { Box } from '../../components/box/Box';
import { CopyButton } from '../../components/copy-button/CopyButton';
import { GetWalletCTA } from '../../components/get-wallet-cta/GetWalletCTA';
import { WCQRCode } from '../../components/qr-code/WCQRCode';
import { TransitionContainer } from '../../components/transition-container/TransitionContainer';
import { useConnectStatus } from '../../hooks/useConnectStatus';
import { useTanto } from '../../hooks/useTanto';
import { useWalletConnectUri } from '../../hooks/useWalletConnectUri';
import { CONNECT_STATES } from '../../types';
import { isMobile } from '../../utils';
import { ConnectLayout } from './components/ConnectLayout';
import { ScanGuideline } from './components/ScanGuideline';

const ScanQRCode = memo(({ uri }: { uri: string | undefined }) => {
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
});

export function ConnectWC() {
  const mobile = isMobile();
  const { wallet, connector } = useTanto();
  const { uri } = useWalletConnectUri({ connector });
  const { status } = useConnectStatus({ connector });

  if (!wallet || !connector) return null;

  if (mobile) return <ConnectLayout status={status} walletIcon={wallet.icon} walletName={wallet.name} wcUri={uri} />;

  return (
    <TransitionContainer viewKey={status}>
      {status === CONNECT_STATES.CONNECTED ? (
        <ConnectLayout status={status} walletIcon={wallet.icon} walletName={wallet.name} wcUri={uri} />
      ) : (
        <ScanQRCode uri={uri} />
      )}
    </TransitionContainer>
  );
}
