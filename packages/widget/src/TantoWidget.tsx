import { FlexModal } from './components/flex-modal/FlexModal';
import { TransitionContainer } from './components/transition-container/TransitionContainer';
import { useWidget } from './hooks/useWidget';
import { Route } from './types/route';
import { Connect } from './views/Connect/Connect';
import { WalletList } from './views/WalletList';

export function TantoWidget() {
  const { open, view, setOpen, goBack } = useWidget();

  const views = {
    [Route.WALLETS]: <WalletList />,
    [Route.CONNECT]: <Connect />,
  };

  return (
    <FlexModal
      title={view.title}
      open={open}
      showBackButton={view.showBackButton}
      onOpenChange={setOpen}
      onBack={goBack}
    >
      <TransitionContainer viewKey={view.route}>{views[view.route]}</TransitionContainer>
    </FlexModal>
  );
}
