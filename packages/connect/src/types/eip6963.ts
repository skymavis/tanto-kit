import { IEIP1193Provider } from './eip1193';

interface IEIP6963AnnounceProviderEvent extends Event {
  detail: IEIP6963ProviderDetail;
}

/**
 * Represents the assets needed to display and identify a wallet.
 *
 * @property uuid - A locally unique identifier for the wallet. MUST be a v4 UUID.
 * @property name - The name of the wallet.
 * @property icon - The icon for the wallet. MUST be data URI.
 * @property rdns - The reverse syntax domain name identifier for the wallet.
 */
interface IEIP6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
}

interface IEIP6963ProviderDetail {
  info: IEIP6963ProviderInfo;
  provider: IEIP1193Provider;
}

enum EIP6963EventNames {
  AnnounceProvider = 'eip6963:announceProvider',
  RequestProvider = 'eip6963:requestProvider',
  UpdateProvider = 'eip6963:updateProvider',
}

export type { IEIP6963AnnounceProviderEvent, IEIP6963ProviderDetail, IEIP6963ProviderInfo };
export { EIP6963EventNames };
