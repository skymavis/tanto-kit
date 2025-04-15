import styled from '@emotion/styled';
import { FC } from 'react';

import { useTanto } from '../../hooks/useTanto';
import { useWidget } from '../../hooks/useWidget';
import { Route } from '../../types/route';
import { Wallet } from '../../types/wallet';

interface WalletItemProps {
  wallet: Wallet;
}

const Container = styled.div({
  backgroundColor: 'rgba(205, 213, 229, 0.07)',
  padding: 16,
});

export const WalletItem: FC<WalletItemProps> = ({ wallet }) => {
  const { setWallet } = useTanto();
  const { goTo } = useWidget();

  return (
    <Container
      onClick={() => {
        if (typeof wallet.alternativeConnectAction === 'function') {
          wallet.alternativeConnectAction();
          return;
        }
        setWallet(wallet);
        goTo(Route.CONNECT, {
          title: wallet.name,
        });
      }}
    >
      Connect to {wallet.name}
    </Container>
  );
};
