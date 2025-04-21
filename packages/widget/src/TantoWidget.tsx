import { domAnimation, LazyMotion } from 'motion/react';
import { useAccountEffect } from 'wagmi';

import { FlexModal } from './components/flex-modal/FlexModal';
import { TransitionContainer } from './components/transition-container/TransitionContainer';
import { CONNECT_WIDGET_HIDE_DELAY } from './constants';
import { useWidget } from './hooks/useWidget';
import { Route } from './types/route';
import { ConnectInjector } from './views/Connect/ConnectInjector';
import { ConnectWC } from './views/Connect/ConnectWC';
import { Profile } from './views/Profile';
import { WalletList } from './views/WalletList';

export function TantoWidget() {
  const { open, view, setOpen, goBack } = useWidget();

  const views = {
    [Route.WALLETS]: <WalletList />,
    [Route.CONNECT_INJECTOR]: <ConnectInjector />,
    [Route.CONNECT_WC]: <ConnectWC />,
    [Route.PROFILE]: <Profile />,
  };

  const { hide } = useWidget();

  useAccountEffect({
    onConnect() {
      setTimeout(hide, CONNECT_WIDGET_HIDE_DELAY);
    },
  });

  return (
    <FlexModal
      title={view.title}
      open={open}
      showBackButton={view.showBackButton}
      onOpenChange={setOpen}
      onBack={goBack}
    >
      <LazyMotion features={domAnimation} strict>
        <TransitionContainer viewKey={view.route}>{views[view.route]}</TransitionContainer>
      </LazyMotion>
    </FlexModal>
  );
}
