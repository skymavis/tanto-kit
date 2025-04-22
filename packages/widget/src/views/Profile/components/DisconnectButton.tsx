import { useCallback } from 'react';
import { useDisconnect } from 'wagmi';

import { Button } from '../../../components/button/Button';
import { DISCONNECT_WIDGET_HIDE_DELAY } from '../../../constants';
import { useWidget } from '../../../hooks/useWidget';

export function DisconnectButton() {
  const { hide } = useWidget();
  const { disconnect } = useDisconnect();

  const handleDisconnect = useCallback(() => {
    hide();
    setTimeout(disconnect, DISCONNECT_WIDGET_HIDE_DELAY);
  }, [hide, disconnect]);

  return (
    <Button fullWidth intent="secondary" onClick={handleDisconnect}>
      Disconnect
    </Button>
  );
}
