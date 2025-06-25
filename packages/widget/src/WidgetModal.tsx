import { XIcon } from './assets/XIcon';
import { IconButton } from './components/button/Button';
import { FlexModal } from './components/flex-modal/FlexModal';
import { CONNECT_SUCCESS_DELAY } from './constants';
import { WidgetRouterProvider } from './contexts/widget-router/WidgetRouterProvider';
import { useAccountEffect } from './hooks/useAccountEffect';
import { useTantoConfig } from './hooks/useTantoConfig';
import { useWidgetModal } from './hooks/useWidgetModal';
import { WidgetContent } from './WidgetContent';

export function WidgetModal() {
  const { open, setOpen, hide } = useWidgetModal();
  const { hideConnectSuccessPrompt } = useTantoConfig();

  useAccountEffect({
    onConnect() {
      setTimeout(hide, hideConnectSuccessPrompt ? 0 : CONNECT_SUCCESS_DELAY);
    },
  });

  return (
    <FlexModal open={open} onOpenChange={setOpen}>
      <WidgetRouterProvider>
        <WidgetContent close={<IconButton intent="secondary" variant="plain" icon={<XIcon />} onClick={hide} />} />
      </WidgetRouterProvider>
    </FlexModal>
  );
}
