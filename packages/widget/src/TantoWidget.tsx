import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import { FlexModal } from './components/flex-modal/FlexModal';
import { TransitionContainer } from './components/transition-container/TransitionContainer';
import { useWidget } from './hooks/useWidget';
import { Route } from './types/route';
import { ConnectInjector } from './views/Connect/ConnectInjector';
import { ConnectQRCode } from './views/Connect/ConnectQRCode';
import { WalletList } from './views/WalletList';

export function TantoWidget() {
  const { open, view, setOpen, goBack } = useWidget();

  const views = {
    [Route.WALLETS]: <WalletList />,
    [Route.CONNECT_INJECTOR]: <ConnectInjector />,
    [Route.CONNECT_QRCODE]: <ConnectQRCode />,
  };

  const { isConnected } = useAccount();
  const { hide } = useWidget();

  useEffect(() => {
    if (isConnected) hide();
  }, [isConnected]);

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
