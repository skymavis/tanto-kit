import { BlueFilledWalletConnectLogo } from '../assets/BlueWalletConnectLogo';
import { CoinbaseLogo } from '../assets/CoinbaseLogo';
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
import { RONIN_WALLET_WEB_LINK, WALLET_IDS } from '../constants';
import { WalletConfig, WalletId } from '../types/wallet';

export const walletConfigs: Record<WalletId, WalletConfig> = {
  [WALLET_IDS.WAYPOINT]: {
    name: 'Continue with Email',
    icon: <RoninWaypointCustomSquareLogo />,
    displayOptions: {
      thumbnail: <RoninWaypointCustomLogo />,
      highlightBackground: true,
      showRoninBadge: true,
      connectingDescription: 'Confirm connection via pop-up windows',
    },
  },
  [WALLET_IDS.RONIN_WALLET]: {
    name: 'Ronin Wallet Extension',
    icon: <RoninExtensionCustomSquareLogo />,
    homepage: RONIN_WALLET_WEB_LINK,
    displayOptions: {
      thumbnail: <RoninExtensionCustomLogo />,
      showRoninBadge: true,
    },
  },
  [WALLET_IDS.RONIN_WALLET_INJECTED]: {
    name: 'Ronin Wallet Extension',
    icon: <RoninExtensionCustomSquareLogo />,
    homepage: RONIN_WALLET_WEB_LINK,
    displayOptions: {
      thumbnail: <RoninExtensionCustomLogo />,
      showRoninBadge: true,
    },
  },
  [WALLET_IDS.WALLET_CONNECT]: {
    name: 'WalletConnect',
    icon: <BlueFilledWalletConnectLogo />,
    displayOptions: {
      thumbnail: <WalletConnectLogo />,
      description: 'Scan QR on mobile wallet to connect',
    },
  },
  [WALLET_IDS.CUSTOM_RONIN_MOBILE_WALLET]: {
    name: 'Ronin Wallet Mobile',
    icon: <RoninMobileCustomSquareLogo />,
    displayOptions: {
      thumbnail: <RoninMobileCustomLogo />,
      description: 'Sign in with the app',
      showRoninBadge: true,
    },
  },
  [WALLET_IDS.CUSTOM_RONIN_IN_APP_WALLET]: {
    name: 'Ronin Wallet Mobile',
    icon: <RoninMobileCustomSquareLogo />,
    displayOptions: {
      thumbnail: <RoninMobileCustomLogo />,
      description: 'Sign in with the app',
      showRoninBadge: true,
    },
  },
  [WALLET_IDS.SAFE]: {
    name: 'Safe',
    icon: <SafeLogo />,
  },
  [WALLET_IDS.COINBASE_WALLET]: {
    name: 'Coinbase Wallet',
    icon: <CoinbaseLogo />,
  },
};
