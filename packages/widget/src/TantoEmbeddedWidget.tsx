import styled from '@emotion/styled';
import { GetAccountReturnType } from '@wagmi/core';
import type { Compute } from '@wagmi/core/internal';
import { useAccountEffect } from 'wagmi';

import { TantoWidgetContent } from './TantoWidgetContent';

const EmbeddedContainer = styled.div(({ theme }) => ({
  padding: '8px 20px 20px 20px',
  backgroundColor: theme.modalBackgroundColor,
}));

interface TantoEmbeddedWidgetProps {
  onConnect?: (
    data: Compute<
      Pick<
        Extract<GetAccountReturnType, { status: 'connected' }>,
        'address' | 'addresses' | 'chain' | 'chainId' | 'connector'
      > & {
        isReconnected: boolean;
      }
    >,
  ) => void;
}

export function TantoEmbeddedWidget({ onConnect }: TantoEmbeddedWidgetProps) {
  useAccountEffect({
    onConnect,
  });

  return (
    <EmbeddedContainer>
      <TantoWidgetContent />
    </EmbeddedContainer>
  );
}
