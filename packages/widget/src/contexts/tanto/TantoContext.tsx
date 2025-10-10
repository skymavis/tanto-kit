import { createContext } from 'react';

import { SocialProvider } from '../../types/social';

export interface TantoConfig {
  clientId?: string;
  reducedMotion?: boolean;
  disableProfile?: boolean;
  hideConnectSuccessPrompt?: boolean;
  initialChainId?: number;
  createAccountOnConnect?: boolean;
  showConfirmationModal?: boolean;
  excludedWalletIds?: string[];
  excludedSocialProviders?: SocialProvider[];
  __internal_waypointBaseUrl?: string;
  __internal_mpcBaseUrlV1?: string;
  __internal_mpcBaseUrl?: string;
  __internal_mpcSocketUrl?: string;
}

export interface TantoState {
  config: TantoConfig;
}

export const TantoContext = createContext<TantoState | undefined>(undefined);
