import { domAnimation, LazyMotion } from 'motion/react';
import { useAccount } from 'wagmi';

import { Avatar } from './components/avatar/Avatar';
import { Box } from './components/box/Box';
import { Button } from './components/button/Button';
import { CSSResetContainer } from './components/css-reset-container/CSSResetContainer';
import { useSmoothWidthResize } from './hooks/useSmoothWidthResize';
import { useWidget } from './hooks/useWidget';
import { truncate } from './utils';

export function TantoConnectButton() {
  const { address, isConnected } = useAccount();
  const { show } = useWidget();
  const { ResizableContainer } = useSmoothWidthResize();
  const normalizedAddress = address?.toLocaleLowerCase();

  return (
    <CSSResetContainer>
      <LazyMotion features={domAnimation} strict>
        <Button intent={isConnected ? 'secondary' : 'primary'} onClick={show}>
          <ResizableContainer>
            {isConnected ? (
              <Box gap={8}>
                <Avatar seed={normalizedAddress} size={'S'} />
                <p>{truncate(normalizedAddress)}</p>
              </Box>
            ) : (
              <p css={{ width: 120 }}>Connect Wallet</p>
            )}
          </ResizableContainer>
        </Button>
      </LazyMotion>
    </CSSResetContainer>
  );
}
