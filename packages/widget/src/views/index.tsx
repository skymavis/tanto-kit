import { Route } from '../types/route';
import { ConnectInjector } from './Connect/ConnectInjector';
import { ConnectWC } from './Connect/ConnectWC';
import { Profile } from './Profile/Profile';
import { WalletList } from './WalletList/WalletList';

export const views = {
  [Route.WALLETS]: <WalletList />,
  [Route.CONNECT_INJECTOR]: <ConnectInjector />,
  [Route.CONNECT_WC]: <ConnectWC />,
  [Route.PROFILE]: <Profile />,
};
