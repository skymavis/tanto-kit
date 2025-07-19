import type { View } from '../contexts/widget-router/WidgetRouterContext';
import { Route } from '../types/route';
import { ConnectInjector } from '../views/connect/ConnectInjector';
import { ConnectWC } from '../views/connect/ConnectWC';
import { Keyless } from '../views/keyless/Keyless';
import { Profile } from '../views/profile/Profile';
import { WalletList } from '../views/wallet-list/WalletList';

const WalletTitle = (
  <div
    css={{
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      height: '100%',
      paddingBottom: 6,
      paddingTop: 12,
    }}
  >
    <p
      css={theme => ({
        fontSize: '0.55em',
        fontWeight: 500,
        color: theme.mutedText,
        textTransform: 'uppercase',
        textAlign: 'center',
      })}
    >
      Powered by Ronin Wallet
    </p>
  </div>
);

const ConnectedTitle = <p css={{ width: '100%', textAlign: 'center' }}>Connected</p>;

export const viewConfigs: Record<Route, View> = {
  [Route.WALLETS]: {
    route: Route.WALLETS,
    content: <WalletList />,
    title: WalletTitle,
    showBackButton: false,
  },
  [Route.KEYLESS]: {
    route: Route.KEYLESS,
    content: <Keyless />,
    showBackButton: false,
  },
  [Route.CONNECT_INJECTOR]: {
    route: Route.CONNECT_INJECTOR,
    content: <ConnectInjector />,
  },
  [Route.CONNECT_WC]: {
    route: Route.CONNECT_WC,
    content: <ConnectWC />,
  },
  [Route.PROFILE]: {
    route: Route.PROFILE,
    content: <Profile />,
    title: ConnectedTitle,
  },
};
