import { RoninExtensionLogo } from '../assets/RoninExtensionLogo';
import { RoninWaypointLogo } from '../assets/RoninWaypointLogo';
import { WalletConnectLogo } from '../assets/WalletConnectLogo';
import { WalletConfig } from '../types/wallet';

export const walletConfigs: {
  [walletId: string]: Partial<WalletConfig>;
} = {
  WAYPOINT: {
    name: 'Email & Social',
    highlightOnList: true,
    iconOnList: <RoninWaypointLogo />,
  },
  'RONIN_WALLET, com.roninchain.wallet': {
    name: 'Ronin Extension',
    iconOnList: <RoninExtensionLogo />,
  },
  walletConnect: {
    iconOnList: <WalletConnectLogo />,
    descriptionOnList: 'Scan QR on mobile wallet to connect',
  },
};
