import { FlexModal } from './components/flex-modal/FlexModal';
import { useWidget } from './hooks/useWidget';
import { TantoWidgetContent } from './TantoWidgetContent';

export function TantoWidget() {
  const { open, setOpen } = useWidget();

  return (
    <FlexModal open={open} onOpenChange={setOpen}>
      <TantoWidgetContent showCloseButton />
    </FlexModal>
  );
}
