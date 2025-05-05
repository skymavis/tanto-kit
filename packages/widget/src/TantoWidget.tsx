import { useEffect } from 'react';
import { useAccount, useAccountEffect, useBalance } from 'wagmi';

import { TransitionedView } from './components/animated-containers/TransitionedView';
import { FlexModal, FlexModalProps } from './components/flex-modal/FlexModal';
import { CONNECT_WIDGET_HIDE_DELAY } from './constants';
import { useWalletConnectListener } from './hooks/useWalletConnectListener';
import { useWidget } from './hooks/useWidget';
import { authenticatedRoutes, publicRoutes, Route } from './types/route';
import { isMobile } from './utils';
import { openWindow } from './utils/openWindow';
import { ConnectInjector } from './views/Connect/ConnectInjector';
import { ConnectWC } from './views/Connect/ConnectWC';
import { Profile } from './views/Profile/Profile';
import { WalletList } from './views/WalletList/WalletList';

export interface TantoWidgetProps {
  container?: FlexModalProps['container'];
}

const views = {
  [Route.WALLETS]: <WalletList />,
  [Route.CONNECT_INJECTOR]: <ConnectInjector />,
  [Route.CONNECT_WC]: <ConnectWC />,
  [Route.PROFILE]: <Profile />,
};

export function TantoWidget(props: TantoWidgetProps) {
  const { container } = props;
  const { view, open, setOpen, hide, goBack, reset } = useWidget();
  const { isConnected, address, chainId, connector } = useAccount();

  useWalletConnectListener({
    connector,
    onSignRequest: () => {
      if (isMobile()) openWindow('roninwallet://');
    },
  });

  useBalance({ address, chainId });
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
      container={container}
      title={view.title}
      open={open}
      showBackButton={view.showBackButton}
      onOpenChange={setOpen}
      onBack={goBack}
    >
      <TransitionedView viewKey={view.route}>{views[view.route]}</TransitionedView>
    </FlexModal>
  );
}
