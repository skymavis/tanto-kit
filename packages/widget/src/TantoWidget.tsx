import { domAnimation, LazyMotion } from 'motion/react';
import { useEffect } from 'react';
import { useAccount, useAccountEffect } from 'wagmi';

import { FlexModal } from './components/flex-modal/FlexModal';
import { TransitionContainer } from './components/transition-container/TransitionContainer';
import { CONNECT_WIDGET_HIDE_DELAY } from './constants';
import { useWidget } from './hooks/useWidget';
import { authenticatedRoutes, publicRoutes, Route } from './types/route';
import { ConnectInjector } from './views/Connect/ConnectInjector';
import { ConnectWC } from './views/Connect/ConnectWC';
import { Profile } from './views/Profile/Profile';
import { WalletList } from './views/WalletList/WalletList';

const views = {
  [Route.WALLETS]: <WalletList />,
  [Route.CONNECT_INJECTOR]: <ConnectInjector />,
  [Route.CONNECT_WC]: <ConnectWC />,
  [Route.PROFILE]: <Profile />,
};

export function TantoWidget() {
  const { isConnected } = useAccount();
  const { view, open, setOpen, hide, goBack, reset } = useWidget();

  useAccountEffect({
    onConnect() {
      setTimeout(hide, CONNECT_WIDGET_HIDE_DELAY);
    },
  });

  useEffect(() => {
    if (
      (isConnected && publicRoutes.includes(view.route)) ||
      (!isConnected && authenticatedRoutes.includes(view.route))
    )
      reset();
  }, [isConnected, view.route]);

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
