import type { Address } from 'viem';

import { HeadlessConfig } from '../HeadlessConfig';
import { SessionRepository } from '../SessionRepository';
import { HttpClient } from './HttpClient';

export interface GenerateNonceResponse {
  expirationTime: string;
  issuedAt: string;
  nonce: string;
  notBefore: string;
}

export interface CreateAccountResponse {
  address: string;
  idToken: string;
  userID: string;
}

export interface AuthenticateWithOtpResponse {
  user: {
    userID: string;
    email: string;
    isNew: boolean;
  };
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export class AuthApi {
  static inject = ['headlessConfig', 'httpClient', 'sessionRepository'] as const;

  constructor(
    private headlessConfig: HeadlessConfig,
    private httpClient: HttpClient,
    private sessionRepository: SessionRepository,
  ) {}

  generateNonce = async ({ address }: { address: Address }): Promise<GenerateNonceResponse> => {
    return this.httpClient.call<GenerateNonceResponse>({
      method: 'POST',
      path: '/siwe/init',
      headers: { 'sm-client-id': this.headlessConfig.clientId },
      data: { address },
    });
  };

  authenticateWithSiwe = async ({
    message,
    signature,
  }: {
    message: string;
    signature: string;
  }): Promise<CreateAccountResponse> => {
    return this.httpClient.call<CreateAccountResponse>({
      method: 'POST',
      path: '/siwe/authenticate',
      headers: { 'sm-client-id': this.headlessConfig.clientId },
      data: { message, signature },
    });
  };

  initOTPPasswordless = async ({ email }: { email: string }): Promise<{ emailSent: boolean }> => {
    return this.httpClient.call<{ emailSent: boolean }>({
      method: 'POST',
      path: '/passwordless/init',
      headers: { 'sm-client-id': this.headlessConfig.clientId },
      body: { email },
    });
  };

  authenticateWithOtp = async ({
    email,
    otp,
  }: {
    email: string;
    otp: string;
  }): Promise<AuthenticateWithOtpResponse> => {
    const authData = await this.httpClient.call<AuthenticateWithOtpResponse>({
      method: 'POST',
      path: '/passwordless/authenticate',
      headers: { 'sm-client-id': this.headlessConfig.clientId },
      data: { email, code: otp },
    });
    await Promise.all([
      this.sessionRepository.setAccessToken(authData.accessToken),
      this.sessionRepository.setRefreshToken(authData.refreshToken),
    ]);
    return authData;
  };

  exchangeToken = async ({ idToken }: { idToken: string }): Promise<AuthenticateWithOtpResponse> => {
    const authData = await this.httpClient.call<AuthenticateWithOtpResponse>({
      method: 'POST',
      path: '/auth/exchange-token',
      headers: { 'sm-client-id': this.headlessConfig.clientId },
      shouldTransformRequest: false,
      data: { idToken },
    });
    await Promise.all([
      this.sessionRepository.setAccessToken(authData.accessToken),
      this.sessionRepository.setRefreshToken(authData.refreshToken),
    ]);
    return authData;
  };
}
