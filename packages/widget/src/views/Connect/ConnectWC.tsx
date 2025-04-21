import { useState } from 'react';
import { useAccountEffect } from 'wagmi';

import { Box } from '../../components/box/Box';
import { CopyButton } from '../../components/copy-button/CopyButton';
import { GetWalletCTA } from '../../components/get-wallet-cta/GetWalletCTA';
import { WCQRCode } from '../../components/qr-code/WCQRCode';
import { TransitionContainer } from '../../components/transition-container/TransitionContainer';
import { useTanto } from '../../hooks/useTanto';
import { useWalletConnectUri } from '../../hooks/useWalletConnectUri';
import { isMobile } from '../../utils';
import { ConnectContent } from './components/ConnectContent';
import { ConnectLogo } from './components/ConnectLogo';
import { ScanGuideline } from './components/ScanGuideline';
import { CONNECT_STATES, ConnectState } from './types';

export function ConnectWC() {
  const mobile = isMobile();
  const [status, setStatus] = useState<ConnectState>(() =>
    mobile ? CONNECT_STATES.OPENING_WALLET : CONNECT_STATES.CONNECTING,
  );
  const { wallet, connector } = useTanto();
  const { uri } = useWalletConnectUri({ connector });

  useAccountEffect({
    onConnect() {
      setStatus(CONNECT_STATES.CONNECTED);
    },
  });

  if (!wallet || !connector) return null;

  if (mobile)
    return (
      <Box vertical align="center" justify="center" gap={20} pt={20}>
        <ConnectLogo walletIcon={wallet.icon} status={status} />
        <ConnectContent walletName={wallet.name} status={status} wcUri={uri} />
      </Box>
    );

  return (
    <TransitionContainer viewKey={status}>
      <Box vertical align="center" justify="center" gap={20} pt={20}>
        {status === 'connected' && (
          <>
            <ConnectLogo walletIcon={wallet.icon} status={status} />
            <ConnectContent walletName={wallet.name} status={status} />
          </>
        )}
        {status === 'connecting' && (
          <>
            <Box vertical align="center" justify="center" gap={16}>
              <CopyButton value={uri}>Copy link</CopyButton>
              <WCQRCode value={uri} />
              <ScanGuideline />
            </Box>
            <GetWalletCTA />
          </>
        )}
      </Box>
    </TransitionContainer>
  );
}
