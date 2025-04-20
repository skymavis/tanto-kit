import { useState } from 'react';
import { useAccount, useAccountEffect } from 'wagmi';

import { Box } from '../../components/box/Box';
import { CopyButton } from '../../components/copy-button/CopyButton';
import { WCQRCode } from '../../components/qr-code/WCQRCode';
import { TransitionContainer } from '../../components/transition-container/TransitionContainer';
import { useTanto } from '../../hooks/useTanto';
import { useWalletConnectUri } from '../../hooks/useWalletConnectUri';
import { ConnectContent } from './components/ConnectContent';
import { ConnectLogo } from './components/ConnectLogo';
import { GetWalletCTA } from './components/GetWalletCTA';
import { ScanGuideline } from './components/ScanGuideline';
import { CONNECT_STATES, ConnectState } from './types';

export function ConnectQRCode() {
  const [status, setStatus] = useState<ConnectState>(CONNECT_STATES.CONNECTING);
  const { wallet, connector } = useTanto();

  const { isConnected } = useAccount();
  useAccountEffect({
    onConnect() {
      setStatus(CONNECT_STATES.CONNECTED);
    },
  });
  const { uri: walletConnectUri } = useWalletConnectUri({ connector });

  if (!wallet || !connector) return null;

  return (
    <TransitionContainer viewKey={Number(isConnected)}>
      <Box vertical align="center" justify="center" gap={20} pt={20}>
        {isConnected ? (
          <>
            <ConnectLogo walletIcon={wallet.icon} status={status} />
            <ConnectContent walletName={wallet.name} status={status} />
          </>
        ) : (
          <>
            <Box vertical align="center" justify="center" gap={16}>
              <CopyButton value={walletConnectUri}>Copy URI</CopyButton>
              <WCQRCode value={walletConnectUri} />
              <ScanGuideline />
            </Box>
            <GetWalletCTA />
          </>
        )}
      </Box>
    </TransitionContainer>
  );
}
