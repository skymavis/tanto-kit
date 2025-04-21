import { BlueFilledWalletConnectLogo } from '../assets/BlueWalletConnectLogo';
import { RoninExtensionCustomLogo } from '../assets/RoninExtensionCustomLogo';
import { RoninExtensionCustomSquareLogo } from '../assets/RoninExtensionCustomSquareLogo';
import { RoninWaypointCustomLogo } from '../assets/RoninWaypointCustomLogo';
import { RoninWaypointCustomSquareLogo } from '../assets/RoninWaypointCustomSquareLogo';
import { WalletConnectLogo } from '../assets/WalletConnectLogo';
import { WEB_WALLET_LINK } from '../constants';
import { WalletConfig } from '../types/wallet';

export const walletConfigs: {
  [walletId: string]: Partial<WalletConfig>;
} = {
  WAYPOINT: {
    name: 'Email & Social',
    highlightOnList: true,
    icon: <RoninWaypointCustomSquareLogo />,
    iconOnList: <RoninWaypointCustomLogo />,
  },
  'RONIN_WALLET, com.roninchain.wallet': {
    name: 'Ronin Extension',
    icon: <RoninExtensionCustomSquareLogo />,
    iconOnList: <RoninExtensionCustomLogo />,
    downloadUrl: WEB_WALLET_LINK,
  },
  walletConnect: {
    icon: <BlueFilledWalletConnectLogo />,
    iconOnList: <WalletConnectLogo />,
    descriptionOnList: 'Scan QR on mobile wallet to connect',
  },
};
