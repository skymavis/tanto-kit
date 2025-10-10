import EventEmitter from 'eventemitter3';
import type { Address, EIP1193Parameters, Hash, Hex, PublicRpcSchema, TypedDataDefinition } from 'viem';
import { toHex } from 'viem';

import {
  HeadlessAsyncTaskManager,
  HeadlessOperationParamsMap,
  HeadlessOperationType,
} from './HeadlessAsyncTaskManager';
import type { TransactionParams } from './helpers/types';
import { WalletService } from './WalletService';

export type HeadlessProviderRpcSchema = [
  ...PublicRpcSchema,
  {
    Method: 'eth_accounts';
    Parameters?: undefined;
    ReturnType: Address[];
  },
  {
    Method: 'eth_requestAccounts';
    Parameters?: undefined;
    ReturnType: Address[];
  },
  {
    Method: 'eth_sendTransaction';
    Parameters: [transaction: TransactionParams];
    ReturnType: Hash;
  },
  {
    Method: 'eth_signTypedData_v4';
    Parameters: [address: Address, typedData: TypedDataDefinition | string];
    ReturnType: Hex;
  },
  {
    Method: 'personal_sign';
    Parameters: [data: Hex, address: Address];
    ReturnType: Hex;
  },
];

export class HeadlessProvider extends EventEmitter {
  static inject = ['walletService', 'headlessAsyncTaskManager'] as const;

  constructor(private walletService: WalletService, private headlessAsyncTaskManager: HeadlessAsyncTaskManager) {
    super();
  }

  getChainId(): number {
    return this.walletService.getChainId();
  }

  getAccounts(): Address[] {
    const address = this.walletService.getAddress();
    return address ? [address] : [];
  }

  async isSignable(): Promise<boolean> {
    try {
      await this.walletService.getSignableAddress();
      return true;
    } catch {
      return false;
    }
  }

  async connect(): Promise<{ address: Address }> {
    const signableAddress = await this.walletService.getSignableAddress();
    return { address: signableAddress };
  }

  disconnect(): void {
    this.walletService.disconnect();
  }

  async requestAccounts(): Promise<Address[]> {
    const address = await this.walletService.getSignableAddress();
    return address ? [address] : [];
  }

  async personalSign(params: [data: Hex, address: Address]): Promise<Hex> {
    return this.walletService.personalSign(params);
  }

  async signTypedDataV4(params: [address: Address, data: TypedDataDefinition | string]): Promise<Hex> {
    return this.walletService.signTypedDataV4(params);
  }

  async sendTransaction(params: [transaction: TransactionParams]): Promise<Hash> {
    return this.walletService.sendTransaction(params);
  }

  private async waitForUserConfirmation<T extends HeadlessOperationType, R>(
    operationType: T,
    params: HeadlessOperationParamsMap[T],
    executor: () => Promise<R>,
  ) {
    await this.headlessAsyncTaskManager.createTask({ operationType, params });
    return executor();
  }

  async request<ReturnType = unknown>(args: EIP1193Parameters<HeadlessProviderRpcSchema>): Promise<ReturnType> {
    const { method, params } = args;

    switch (method) {
      case 'eth_accounts':
        return this.getAccounts() as ReturnType;

      case 'eth_requestAccounts':
        return (await this.requestAccounts()) as ReturnType;

      case 'eth_chainId':
        return toHex(this.getChainId()) as ReturnType;

      case 'personal_sign':
        return this.waitForUserConfirmation(HeadlessOperationType.PersonalSign, params, () =>
          this.personalSign(params),
        ) as ReturnType;

      case 'eth_signTypedData_v4':
        return this.waitForUserConfirmation(HeadlessOperationType.SignTypedDataV4, params, () =>
          this.signTypedDataV4(params),
        ) as ReturnType;

      case 'eth_sendTransaction':
        return this.waitForUserConfirmation(HeadlessOperationType.SendTransaction, params, () =>
          this.sendTransaction(params),
        ) as ReturnType;

      default:
        return this.walletService.getPublicClient().request(args) as ReturnType;
    }
  }
}
