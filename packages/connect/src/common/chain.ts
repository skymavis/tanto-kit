export enum ChainIds {
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

export const CHAINS_CONFIG: IChainsConfig = {
  [ChainIds.RoninMainet]: {
    chainId: ChainIds.RoninMainet,
    blockExplorerUrl: 'https://app.roninchain.com',
    chainName: 'Ronin Mainnet',
    iconUrl: 'https://cdn.skymavis.com/explorer-cdn/asset/favicon/apple-touch-icon.png',
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
    nativeCurrency: {
      name: 'GoerliETH',
      symbol: 'GTH',
      decimals: 18,
    },
  },
};
