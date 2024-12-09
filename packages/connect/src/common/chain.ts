export enum ChainIds {
  Ethereum = 1,
  Goerli = 5,
  RoninMainnet = 2020,
  RoninTestnet = 2021,

  BaseMainnet = 8453,
}

export interface IChainInfo {
  chainId: number;
  blockExplorerUrl?: string;
  chainName: string;
  iconUrl?: string;
  rpcUrls?: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export type IChainsConfig = Record<number, IChainInfo>;

export const CHAINS_CONFIG: IChainsConfig = {
  [ChainIds.RoninMainnet]: {
    chainId: ChainIds.RoninMainnet,
    blockExplorerUrl: 'https://app.roninchain.com',
    chainName: 'Ronin Mainnet',
    iconUrl: 'https://cdn.skymavis.com/explorer-cdn/asset/favicon/apple-touch-icon.png',
    rpcUrls: ['https://api.roninchain.com/rpc'],
    nativeCurrency: {
      name: 'Ronin',
      symbol: 'RON',
      decimals: 18,
    },
  },
  [ChainIds.RoninTestnet]: {
    chainId: ChainIds.RoninTestnet,
    blockExplorerUrl: 'https://saigon-app.roninchain.com',
    chainName: 'Saigon Testnet',
    iconUrl: 'https://cdn.skymavis.com/explorer-cdn/asset/favicon/apple-touch-icon.png',
    rpcUrls: ['https://saigon-testnet.roninchain.com/rpc'],
    nativeCurrency: {
      name: 'tRonin',
      symbol: 'tRON',
      decimals: 18,
    },
  },
  [ChainIds.Ethereum]: {
    chainId: ChainIds.Ethereum,
    blockExplorerUrl: 'https://etherscan.io',
    chainName: 'Ethereum',
    rpcUrls: [],
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  [ChainIds.Goerli]: {
    chainId: ChainIds.Goerli,
    blockExplorerUrl: 'https://goerli.etherscan.io/',
    chainName: 'Goerli',
    rpcUrls: [],
    nativeCurrency: {
      name: 'GoerliETH',
      symbol: 'GTH',
      decimals: 18,
    },
  },
  [ChainIds.BaseMainnet]: {
    chainId: ChainIds.BaseMainnet,
    blockExplorerUrl: 'https://basescan.org/',
    chainName: 'Base Mainnet',
    rpcUrls: ['https://mainnet.base.org'],
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
};
