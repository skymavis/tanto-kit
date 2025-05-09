import { BlueFilledWalletConnectLogo } from '../assets/BlueWalletConnectLogo';
import { RoninExtensionCustomLogo } from '../assets/RoninExtensionCustomLogo';
import { RoninExtensionCustomSquareLogo } from '../assets/RoninExtensionCustomSquareLogo';
import { RoninMobileCustomLogo } from '../assets/RoninMobileCustomLogo';
import { RoninMobileCustomSquareLogo } from '../assets/RoninMobileCustomSquareLogo';
import { RoninWaypointCustomLogo } from '../assets/RoninWaypointCustomLogo';
import { RoninWaypointCustomSquareLogo } from '../assets/RoninWaypointCustomSquareLogo';
import { WalletConnectLogo } from '../assets/WalletConnectLogo';
import { RONIN_WALLET_WEB_LINK } from '../constants';
import { WalletConfig, WalletId } from '../types/wallet';

export const walletConfigs: Record<WalletId, WalletConfig> = {
  WAYPOINT: {
    name: 'Email & Social',
    icon: <RoninWaypointCustomSquareLogo />,
    displayOptions: {
      thumbnail: <RoninWaypointCustomLogo />,
      highlight: true,
    },
  },
  RONIN_WALLET: {
    name: 'Ronin Wallet Extension',
    icon: <RoninExtensionCustomSquareLogo />,
    homepage: RONIN_WALLET_WEB_LINK,
    displayOptions: {
      thumbnail: <RoninExtensionCustomLogo />,
    },
  },
  'com.roninchain.wallet': {
    name: 'Ronin Wallet Extension',
    icon: <RoninExtensionCustomSquareLogo />,
    homepage: RONIN_WALLET_WEB_LINK,
    displayOptions: {
      thumbnail: <RoninExtensionCustomLogo />,
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
    },
  },
  CUSTOM_RONIN_IN_APP_WALLET: {
    name: 'Ronin Wallet Mobile',
    icon: <RoninMobileCustomSquareLogo />,
    displayOptions: {
      thumbnail: <RoninMobileCustomLogo />,
      description: 'Sign in with the app',
    },
  },
};
