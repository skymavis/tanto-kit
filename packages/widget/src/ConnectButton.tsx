import { CSSProperties } from 'react';
import { useAccount } from 'wagmi';

import { SmoothWidth } from './components/animated-containers/SmoothWidth';
import { TransitionedView } from './components/animated-containers/TransitionedView';
import { Avatar } from './components/avatar/Avatar';
import { Box } from './components/box/Box';
import { Button } from './components/button/Button';
import { CSSReset } from './components/css-reset/CSSReset';
import { WidgetModalProvider } from './contexts/widget-modal/WidgetModalProvider';
import { useConnectCallback } from './hooks/useConnectCallback';
import { useTantoConfig } from './hooks/useTantoConfig';
import { useWidgetModal } from './hooks/useWidgetModal';
import { AccountConnectionCallback } from './types/connect';
import { truncate } from './utils';
import { WidgetModal } from './WidgetModal';

export type TantoConnectButtonProps = AccountConnectionCallback & {
  className?: string;
  style?: CSSProperties;
};

function ConnectButton({ onConnect, onDisconnect, ...rest }: TantoConnectButtonProps) {
  const { disableProfile } = useTantoConfig();
  const { address, isConnected } = useAccount();
  const { show } = useWidgetModal();
  const normalizedAddress = address?.toLowerCase();

  useConnectCallback({
    onConnect,
    onDisconnect,
  });

  return (
    <CSSReset {...rest}>
      <Button intent={isConnected ? 'secondary' : 'primary'} onClick={show}>
        <SmoothWidth>
          <TransitionedView viewKey={isConnected}>
            {isConnected && !disableProfile ? (
              <Box align="center" gap={8}>
                <Avatar seed={normalizedAddress} size="S" />
                <p>{truncate(normalizedAddress)}</p>
              </Box>
            ) : (
              <p css={{ minWidth: 120 }}>Connect Wallet</p>
            )}
          </TransitionedView>
        </SmoothWidth>
      </Button>
    </CSSReset>
  );
}

export function TantoConnectButton(props: TantoConnectButtonProps) {
  return (
    <WidgetModalProvider>
      <ConnectButton {...props} />
      <WidgetModal />
    </WidgetModalProvider>
  );
}
