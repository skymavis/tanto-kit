import styled from '@emotion/styled';
import { FC } from 'react';

import { Wallet } from '../../types/wallet';

interface WalletGroupProps {
  className?: string;
  wallets: Wallet[];
}

const Container = styled.div({
  display: 'flex',
  padding: 0,
  overflow: 'hidden',
  flexDirection: 'column',
  alignItems: 'stretch',
  borderRadius: '12px',
  background: 'rgba(205, 213, 229, 0.07)',
});

const WalletWrapper = styled.div({
  '&:first-child': {
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
  },
  '&:last-child': {
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
  },
});

const WalletGroup: FC<WalletGroupProps> = ({ wallets, className }) => {
  return (
    <Container className={className}>
      {wallets.map(wallet => {
        return <WalletWrapper key={wallet.id}></WalletWrapper>;
      })}
    </Container>
  );
};

export default WalletGroup;
