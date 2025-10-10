import type { Address, Hex } from 'viem';

import type { PreferredMethod } from '../../types/wallet';
import { HeadlessConfig } from '../HeadlessConfig';
import { SessionRepository } from '../SessionRepository';
import { HttpClient } from './HttpClient';

export interface UserProfileResponse {
  uuid: string;
  address: Address;
  hasSupportPwdless: boolean;
  preferMethod: PreferredMethod;
}

export interface SendTransactionRequest {
  tx: {
    to: Address;
    value: Hex;
    gas: Hex;
    gasPrice: Hex;
    nonce: Hex;
    chainId: Hex;
  };
  rpcUrl: string;
}

export interface MigrateToPasswordlessRequest {
  shardCiphertextB64: string;
  shardEncryptedKeyB64: string;
  shardNonceB64: string;
}

export interface SendTransactionResponse {
  txHash: Hex;
}

export interface DecryptClientShardResponse {
  data: {
    key: string;
    updatedAt: number;
  };
  status: 'OK';
}

export class WalletApi {
  static inject = ['headlessConfig', 'httpClient', 'sessionRepository'] as const;

  constructor(
    private headlessConfig: HeadlessConfig,
    private httpClient: HttpClient,
    private sessionRepository: SessionRepository,
  ) {}

  getUserProfile = async (): Promise<UserProfileResponse> => {
    const profile = await this.httpClient.call<UserProfileResponse>({
      baseUrl: this.headlessConfig.mpcBaseUrl,
      method: 'POST',
      path: '/get-user-profile',
    });
    if (profile.preferMethod === 'passwordless') await this.sessionRepository.setAddress(profile.address);
    return profile;
  };

  createKeylessWallet = async (): Promise<{ uuid: string }> => {
    return this.httpClient.call<{ uuid: string }>({
      baseUrl: this.headlessConfig.mpcBaseUrl,
      method: 'POST',
      path: '/keygen',
      data: { url: this.headlessConfig.mpcSocketUrl },
    });
  };

  getExchangePublicKey = async (): Promise<{ publicKey: string }> => {
    return this.httpClient.call<{ publicKey: string }>({
      baseUrl: this.headlessConfig.mpcBaseUrl,
      method: 'POST',
      path: '/get-exchange-public-key',
    });
  };

  generateExchangeAsymmetricKey = async (): Promise<{ publicKey: string }> => {
    return this.httpClient.call<{ publicKey: string }>({
      baseUrl: this.headlessConfig.mpcBaseUrl,
      method: 'POST',
      path: '/generate-exchange-key',
    });
  };

  getEncryptedClientShard = async (): Promise<DecryptClientShardResponse> => {
    return this.httpClient.call<DecryptClientShardResponse>({
      baseUrl: this.headlessConfig.mpcBaseUrlV1,
      path: '/backup/keys',
    });
  };

  migrateToPasswordless = async ({
    shardCiphertextB64,
    shardEncryptedKeyB64,
    shardNonceB64,
  }: MigrateToPasswordlessRequest): Promise<{ uuid: string }> => {
    return this.httpClient.call<{ uuid: string }>({
      baseUrl: this.headlessConfig.mpcBaseUrl,
      method: 'POST',
      path: '/migrate-shard',
      data: {
        shardCiphertextB64,
        shardEncryptedKeyB64,
        shardNonceB64,
      },
    });
  };

  signMessage = async ({ messageBase64 }: { messageBase64: string }): Promise<{ signature: Hex }> => {
    return this.httpClient.call<{ signature: Hex }>({
      baseUrl: this.headlessConfig.mpcBaseUrl,
      method: 'POST',
      path: '/sign',
      data: { messageBase64 },
    });
  };

  sendTransaction = async ({
    tx,
    rpcUrl,
  }: {
    tx: SendTransactionRequest['tx'];
    rpcUrl: string;
  }): Promise<SendTransactionResponse> => {
    return this.httpClient.call<SendTransactionResponse>({
      baseUrl: this.headlessConfig.mpcBaseUrl,
      method: 'POST',
      path: '/send',
      shouldTransformRequest: false,
      data: { tx, rpc_url: rpcUrl },
    });
  };
}
