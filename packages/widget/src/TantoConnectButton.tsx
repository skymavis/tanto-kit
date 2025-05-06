import { useAccount } from 'wagmi';

import { SmoothWidth } from './components/animated-containers/SmoothWidth';
import { TransitionedView } from './components/animated-containers/TransitionedView';
import { Avatar } from './components/avatar/Avatar';
import { Box } from './components/box/Box';
import { Button } from './components/button/Button';
import { CSSReset } from './components/css-reset/CSSReset';
import { useWidget } from './hooks/useWidget';
import { truncate } from './utils';

export function TantoConnectButton() {
  const { address, isConnected } = useAccount();
  const { show } = useWidget();
  const normalizedAddress = address?.toLocaleLowerCase();

  return (
    <CSSReset>
      <Button intent={isConnected ? 'secondary' : 'primary'} onClick={show}>
        <SmoothWidth>
          <TransitionedView viewKey={isConnected}>
            {isConnected ? (
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
