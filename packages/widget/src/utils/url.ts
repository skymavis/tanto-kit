import { RONIN_WALLET_WEB_LINK } from '../constants';

export function generateRoninMobileWCLink(uri: string, prefix = `${RONIN_WALLET_WEB_LINK}/`) {
  return `${prefix}auth-connect?uri=${encodeURIComponent(uri)}`;
}

export function isValidURL(url: string) {
  try {
    void new URL(url);
    return true;
  } catch {
    return false;
  }
}
