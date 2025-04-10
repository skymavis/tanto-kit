import { FlexModal } from './components/flex-modal/FlexModal';
import { TransitionContainer } from './components/transition-container/TransitionContainer';
import { Route, useWidget } from './contexts/WidgetContext';
import { ConnectorList } from './views/ConnectorList';

export function TantoWidget() {
  const { open, view, setOpen } = useWidget();

  const views = {
    [Route.CONNECTORS]: <ConnectorList />,
  };

  return (
    <FlexModal title={view.title} open={open} onOpenChange={setOpen}>
      <TransitionContainer viewKey={view.route}>{views[view.route]}</TransitionContainer>
    </FlexModal>
  );
}
