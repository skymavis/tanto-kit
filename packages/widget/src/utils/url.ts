import { RONIN_WALLET_APP_DEEPLINK, RONIN_WALLET_WEB_LINK } from '../constants';

export const generateInAppBrowserRoninMobileLink = (uri: string) => {
  return `${RONIN_WALLET_APP_DEEPLINK}in_app_browser?url=${encodeURIComponent(uri)}`;
};

export const generateRoninMobileWCLink = (uri: string, prefix = `${RONIN_WALLET_WEB_LINK}/`) =>
  `${prefix}auth-connect?uri=${encodeURIComponent(uri)}`;

export const isValidURL = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
