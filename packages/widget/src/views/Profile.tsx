import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useAccount, useBalance, useDisconnect } from 'wagmi';

import { Avatar } from '../components/avatar/Avatar';
import { Box } from '../components/box/Box';
import { Button } from '../components/button/Button';
import { CopyButton } from '../components/copy-button/CopyButton';
import { DISCONNECT_WIDGET_HIDE_DELAY } from '../constants';
import { useWidget } from '../hooks/useWidget';
import { formatBalance, truncate } from '../utils';

const AddressText = styled.p({
  fontSize: 18,
  lineHeight: '28px',
});

const BalanceText = styled.p(({ theme }) => ({
  fontSize: 16,
  lineHeight: '22px',
  color: theme.neutralTextColor,
}));

export function Profile() {
  const { hide } = useWidget();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data, isLoading } = useBalance({ address });

  const handleDisconnect = useCallback(() => {
    hide();
    setTimeout(disconnect, DISCONNECT_WIDGET_HIDE_DELAY);
  }, []);

  const normalizedAddress = address?.toLowerCase();

  return (
    <Box vertical align="center" gap={32}>
      <Box vertical align="center" gap={20}>
        <Avatar seed={normalizedAddress} size="XXL" showDot={isConnected} />
        <Box vertical align="center" gap={8}>
          <Box align="center" gap={2}>
            <AddressText>{truncate(normalizedAddress)}</AddressText>
            <CopyButton variant="plain" value={address} />
          </Box>
          <BalanceText>{`${isLoading || !data ? '--' : formatBalance(data.value)} RON`}</BalanceText>
        </Box>
      </Box>
      <Button fullWidth intent="secondary" onClick={handleDisconnect}>
        Disconnect
      </Button>
    </Box>
  );
}
