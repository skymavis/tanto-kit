import { useCallback, useContext } from 'react';
import { useDisconnect } from 'wagmi';

import { Button } from '../../../components/button/Button';
import { VISIBILITY_TRANSITION_DURATION } from '../../../constants';
import { WidgetModalContext } from '../../../contexts/widget-modal/WidgetModalContext';

export function DisconnectButton() {
  const { disconnect } = useDisconnect();
  const widgetModalContext = useContext(WidgetModalContext);

  const handleDisconnect = useCallback(() => {
    if (widgetModalContext) widgetModalContext.hide();
    setTimeout(disconnect, VISIBILITY_TRANSITION_DURATION);
  }, [widgetModalContext, disconnect]);

  return (
    <Button fullWidth intent="secondary" onClick={handleDisconnect}>
      Disconnect
    </Button>
  );
}
