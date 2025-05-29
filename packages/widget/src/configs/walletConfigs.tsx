import { BlueFilledWalletConnectLogo } from '../assets/BlueWalletConnectLogo';
import {
  RoninExtensionCustomSquareLogo,
  RoninMobileCustomSquareLogo,
  RoninWaypointCustomSquareLogo,
} from '../assets/RoninCustomSquareLogo';
import { RoninExtensionCustomLogo } from '../assets/RoninExtensionCustomLogo';
import { RoninMobileCustomLogo } from '../assets/RoninMobileCustomLogo';
import { RoninWaypointCustomLogo } from '../assets/RoninWaypointCustomLogo';
import { SafeLogo } from '../assets/SafeLogo';
import { WalletConnectLogo } from '../assets/WalletConnectLogo';
import { RONIN_WALLET_WEB_LINK } from '../constants';
import { WalletConfig, WalletId } from '../types/wallet';

export const walletConfigs: Record<WalletId, WalletConfig> = {
  WAYPOINT: {
    name: 'Continue with Email',
    icon: <RoninWaypointCustomSquareLogo />,
    displayOptions: {
      thumbnail: <RoninWaypointCustomLogo />,
      highlightBackground: true,
      showRoninBadge: true,
      connectingDescription: 'Confirm connection via pop-up windows',
    },
  },
  RONIN_WALLET: {
    name: 'Ronin Wallet Extension',
    icon: <RoninExtensionCustomSquareLogo />,
    homepage: RONIN_WALLET_WEB_LINK,
    displayOptions: {
      thumbnail: <RoninExtensionCustomLogo />,
      showRoninBadge: true,
    },
  },
  'com.roninchain.wallet': {
    name: 'Ronin Wallet Extension',
    icon: <RoninExtensionCustomSquareLogo />,
    homepage: RONIN_WALLET_WEB_LINK,
    displayOptions: {
      thumbnail: <RoninExtensionCustomLogo />,
      showRoninBadge: true,
    },
  },
  walletConnect: {
    name: 'WalletConnect',
    icon: <BlueFilledWalletConnectLogo />,
    displayOptions: {
      thumbnail: <WalletConnectLogo />,
      description: 'Scan QR on mobile wallet to connect',
    },
  },
  CUSTOM_RONIN_MOBILE_WALLET: {
    name: 'Ronin Wallet Mobile',
    icon: <RoninMobileCustomSquareLogo />,
    displayOptions: {
      thumbnail: <RoninMobileCustomLogo />,
      description: 'Sign in with the app',
      showRoninBadge: true,
    },
  },
  CUSTOM_RONIN_IN_APP_WALLET: {
    name: 'Ronin Wallet Mobile',
    icon: <RoninMobileCustomSquareLogo />,
    displayOptions: {
      thumbnail: <RoninMobileCustomLogo />,
      description: 'Sign in with the app',
      showRoninBadge: true,
    },
  },
  safe: {
    name: 'Safe',
    icon: <SafeLogo />,
  },
};
