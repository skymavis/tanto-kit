import { BlueFilledWalletConnectLogo } from '../assets/BlueWalletConnectLogo';
import { RoninExtensionCustomLogo } from '../assets/RoninExtensionCustomLogo';
import { RoninWaypointCustomLogo } from '../assets/RoninWaypointCustomLogo';
import { WalletConnectLogo } from '../assets/WalletConnectLogo';
import { WEB_WALLET_LINK } from '../constants';
import { WalletConfig } from '../types/wallet';

export const walletConfigs: {
  [walletId: string]: Partial<WalletConfig>;
} = {
  WAYPOINT: {
    name: 'Email & Social',
    highlightOnList: true,
    icon: <RoninWaypointCustomLogo />,
    iconOnList: <RoninWaypointCustomLogo />,
  },
  'RONIN_WALLET, com.roninchain.wallet': {
    name: 'Ronin Extension',
    icon: <RoninExtensionCustomLogo />,
    iconOnList: <RoninExtensionCustomLogo />,
    downloadUrl: WEB_WALLET_LINK,
  },
  walletConnect: {
    icon: <BlueFilledWalletConnectLogo />,
    iconOnList: <WalletConnectLogo />,
    descriptionOnList: 'Scan QR on mobile wallet to connect',
  },
};
