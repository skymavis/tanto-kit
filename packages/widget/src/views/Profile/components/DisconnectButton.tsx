import { useCallback, useContext } from 'react';
import { useDisconnect } from 'wagmi';

import { Button } from '../../../components/button/Button';
import { DIALOG_VISIBILITY_TRANSITION_DURATION, DRAWER_VISIBILITY_TRANSITION_DURATION } from '../../../constants';
import { WidgetModalContext } from '../../../contexts/widget-modal/WidgetModalContext';
import { useIsMobileView } from '../../../hooks/useIsMobileView';

export function DisconnectButton() {
  const isMobile = useIsMobileView();
  const { disconnect } = useDisconnect();
  const widgetModalContext = useContext(WidgetModalContext);

  const handleDisconnect = useCallback(() => {
    if (widgetModalContext) widgetModalContext.hide();
    setTimeout(disconnect, isMobile ? DRAWER_VISIBILITY_TRANSITION_DURATION : DIALOG_VISIBILITY_TRANSITION_DURATION);
  }, [widgetModalContext, disconnect]);

  return (
    <Button fullWidth intent="secondary" onClick={handleDisconnect}>
      Disconnect
    </Button>
  );
}
