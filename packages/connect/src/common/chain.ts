export enum SupportedChainIds {
  Ethereum = 1,
  Goerli = 5,
  RoninMainet = 2020,
  RoninTestnet = 2021,
}

export interface IChainInfo {
  chainId: number;
  blockExplorerUrl?: string;
  chainName: string;
  iconUrl?: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export type IChainsConfig = Record<number, IChainInfo>;

export const DEFAULT_CHAINS_CONFIG: IChainsConfig = {
  [SupportedChainIds.RoninMainet]: {
    chainId: SupportedChainIds.RoninMainet,
    blockExplorerUrl: 'https://app.roninchain.com',
    chainName: 'Ronin Mainnet',
    iconUrl: 'https://cdn.skymavis.com/explorer-cdn/asset/favicon/apple-touch-icon.png',
    nativeCurrency: {
      name: 'Ronin',
      symbol: 'RON',
      decimals: 18,
    },
  },
  [SupportedChainIds.RoninTestnet]: {
    chainId: SupportedChainIds.RoninTestnet,
    blockExplorerUrl: 'https://saigon-app.roninchain.com',
    chainName: 'Saigon Testnet',
    iconUrl: 'https://cdn.skymavis.com/explorer-cdn/asset/favicon/apple-touch-icon.png',
    nativeCurrency: {
      name: 'tRonin',
      symbol: 'tRON',
      decimals: 18,
    },
  },
  [SupportedChainIds.Ethereum]: {
    chainId: SupportedChainIds.Ethereum,
    blockExplorerUrl: 'https://etherscan.io',
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [SupportedChainIds.Goerli]: {
    chainId: SupportedChainIds.Goerli,
    blockExplorerUrl: 'https://goerli.etherscan.io/',
    chainName: 'Goerli',
    nativeCurrency: {
      name: 'GoerliETH',
      symbol: 'GTH',
      decimals: 18,
    },
  },
};
