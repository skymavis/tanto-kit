import styled from '@emotion/styled';

import { Wallet } from '../../types/wallet';
import { WalletItem } from './WalletItem';

interface WalletGroupProps {
  className?: string;
  wallets: Wallet[];
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  overflow: 'hidden',
  borderRadius: 16,
  gap: 1,
});

export const WalletGroup = ({ wallets, className }: WalletGroupProps) => {
  return (
    <Container className={className}>
      {wallets.map(wallet => (
        <WalletItem key={wallet.id} wallet={wallet} />
      ))}
    </Container>
  );
};
