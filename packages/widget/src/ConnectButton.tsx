import { CSSProperties, ReactNode } from 'react';
import { useAccount } from 'wagmi';

import { SmoothWidth } from './components/animated-containers/SmoothWidth';
import { TransitionedView } from './components/animated-containers/TransitionedView';
import { Avatar } from './components/avatar/Avatar';
import { Box } from './components/box/Box';
import { Button } from './components/button/Button';
import { CSSReset } from './components/css-reset/CSSReset';
import { useConnectCallback } from './hooks/useConnectCallback';
import { useTantoConfig } from './hooks/useTantoConfig';
import { useWidgetModal } from './hooks/useWidgetModal';
import { AccountConnectionCallback } from './types/connect';
import { truncate } from './utils';

export type TantoConnectButtonProps = AccountConnectionCallback & {
  className?: string;
  style?: CSSProperties;
  children?: (renderProps: {
    isConnected: boolean;
    address?: string;
    chainId?: number | undefined;
    modalOpen: boolean;
    showModal: () => void;
    hideModal: () => void;
  }) => ReactNode;
};

export function TantoConnectButton({ onConnect, onDisconnect, children, ...rest }: TantoConnectButtonProps) {
  const { disableProfile } = useTantoConfig();
  const { address, chainId, isConnected } = useAccount();
  const { open, show, hide } = useWidgetModal();
  const normalizedAddress = address?.toLowerCase();

  useConnectCallback({
    onConnect,
    onDisconnect,
  });

  return (
    <CSSReset {...rest}>
      {typeof children === 'function' ? (
        <SmoothWidth>
          {children({
            isConnected,
            chainId,
            address: normalizedAddress,
            modalOpen: open,
            showModal: show,
            hideModal: hide,
          })}
        </SmoothWidth>
      ) : (
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
      )}
    </CSSReset>
  );
}
