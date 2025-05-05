import { useCallback } from 'react';
import { useDisconnect } from 'wagmi';

import { Button } from '../../../components/button/Button';
import { MODAL_ANIMATION_DURATION } from '../../../constants';
import { useWidget } from '../../../hooks/useWidget';

export function DisconnectButton() {
  const { hide } = useWidget();
  const { disconnect } = useDisconnect();

  const handleDisconnect = useCallback(() => {
    hide();
    setTimeout(disconnect, MODAL_ANIMATION_DURATION);
  }, [hide, disconnect]);

  return (
    <Button fullWidth intent="secondary" onClick={handleDisconnect}>
      Disconnect
    </Button>
  );
}
