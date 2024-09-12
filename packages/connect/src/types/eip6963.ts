import { IEIP1193Provider } from './eip1193';

export interface IEIP6963AnnounceProviderEvent extends Event {
  detail: IEIP6963ProviderDetail;
}

export interface IEIP6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
}

export interface IEIP6963ProviderDetail {
  info: IEIP6963ProviderInfo;
  provider: IEIP1193Provider;
}

export enum EIP6963EventNames {
  AnnounceProvider = 'eip6963:announceProvider',
  RequestProvider = 'eip6963:requestProvider',
}
