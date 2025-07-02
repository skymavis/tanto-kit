import styled from '@emotion/styled';

import { MAX_WALLET_ITEMS_PER_GROUP, WALLET_ITEM_HEIGHT } from '../../../constants';
import type { Wallet } from '../../../types/wallet';
import { WalletItem } from './wallet-item/WalletItem';

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
  overflowY: 'auto',
  maxHeight: MAX_WALLET_ITEMS_PER_GROUP * WALLET_ITEM_HEIGHT + (MAX_WALLET_ITEMS_PER_GROUP - 1),
});

export function WalletGroup({ wallets, className }: WalletGroupProps) {
  if (wallets.length === 0) return null;

  return (
    <Container data-scrollable className={className}>
      {wallets.map(wallet => (
        <WalletItem key={wallet.id} wallet={wallet} />
      ))}
    </Container>
  );
}
