import { CSSProperties, ReactNode } from 'react';

import { SmoothWidth } from './components/animated-containers/SmoothWidth';
import { TransitionedView } from './components/animated-containers/TransitionedView';
import { Avatar } from './components/avatar/Avatar';
import { Box } from './components/box/Box';
import { Button } from './components/button/Button';
import { CSSReset } from './components/css-reset/CSSReset';
import { useAccount } from './hooks/useAccount';
import { useConnectCallback } from './hooks/useConnectCallback';
import { useRnsName } from './hooks/useRnsName';
import { useTantoConfig } from './hooks/useTantoConfig';
import { useWidgetModal } from './hooks/useWidgetModal';
import { AccountConnectionCallback } from './types/connect';
import { truncate } from './utils';

export type TantoConnectButtonProps = AccountConnectionCallback & {
  className?: string;
  style?: CSSProperties;
  text?: string;
  children?: (renderProps: {
    isConnected: boolean;
    rns?: string;
    address?: string;
    chainId?: number | undefined;
    modalOpen: boolean;
    showModal: () => void;
    hideModal: () => void;
  }) => ReactNode;
};

export function TantoConnectButton({
  onConnect,
  onDisconnect,
  children,
  text = 'Connect Wallet',
  ...rest
}: TantoConnectButtonProps) {
  const { disableProfile } = useTantoConfig();
  const { address, chainId, isConnected } = useAccount();
  const { open, show, hide } = useWidgetModal();
  const { data: rns, isSuccess: isRnsSuccess } = useRnsName({ address });
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
            rns,
            address: normalizedAddress,
            modalOpen: open,
            showModal: show,
            hideModal: hide,
          })}
        </SmoothWidth>
      ) : (
        <Button intent={isConnected ? 'secondary' : 'primary'} onClick={show}>
          <SmoothWidth css={{ minWidth: 120 }}>
            <TransitionedView viewKey={isConnected && isRnsSuccess}>
              {isConnected && !disableProfile ? (
                <Box align="center" gap={8}>
                  <Avatar seed={normalizedAddress} size="S" />
                  <p>{rns ? rns : truncate(normalizedAddress)}</p>
                </Box>
              ) : (
                text
              )}
            </TransitionedView>
          </SmoothWidth>
        </Button>
      )}
    </CSSReset>
  );
}
