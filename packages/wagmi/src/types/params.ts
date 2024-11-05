import { AddEthereumChainParameter } from 'viem';

export interface ConnectParams {
  chainId?: number;
  isReconnecting?: boolean;
}

export interface SwitchChainParams {
  addEthereumChainParameter?: Omit<AddEthereumChainParameter, 'chainId'>;
  chainId: number;
}
