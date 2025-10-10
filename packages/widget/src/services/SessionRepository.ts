import { jwtDecode } from 'jwt-decode';
import { Address } from 'viem';

import { AsyncStorage } from '../utils/storage';

export class SessionRepository {
  static ADDRESS_STORAGE_KEY = 'auth.address';
  static ACCESS_TOKEN_STORAGE_KEY = 'auth.access_token';
  static REFRESH_TOKEN_STORAGE_KEY = 'auth.refresh_token';
  static ACCESS_TOKEN_EXP_KEY = 'auth.access_token_expiration';

  static inject = ['asyncStorage'] as const;

  constructor(private asyncStorage: AsyncStorage) {}

  async getAddress(): Promise<Address | null> {
    const address = await this.asyncStorage.getItem<Address>(SessionRepository.ADDRESS_STORAGE_KEY);
    return address ?? null;
  }

  async setAddress(value: Address): Promise<void> {
    await this.asyncStorage.setItem(SessionRepository.ADDRESS_STORAGE_KEY, value);
  }

  async getAccessToken({ acceptExpired = false }: { acceptExpired?: boolean } = {}): Promise<string | null> {
    if ((await this.isAccessTokenExpired()) && !acceptExpired) return null;
    const accessToken = await this.asyncStorage.getItem<string>(SessionRepository.ACCESS_TOKEN_STORAGE_KEY);
    return accessToken ?? null;
  }

  async setAccessToken(value: string): Promise<void> {
    const exp = this.getTokenExp(value);
    await Promise.all([
      this.asyncStorage.setItem(SessionRepository.ACCESS_TOKEN_STORAGE_KEY, value),
      this.asyncStorage.setItem(SessionRepository.ACCESS_TOKEN_EXP_KEY, exp),
    ]);
  }

  async getRefreshToken(): Promise<string | null> {
    const refreshToken = await this.asyncStorage.getItem<string>(SessionRepository.REFRESH_TOKEN_STORAGE_KEY);
    return refreshToken ?? null;
  }

  async setRefreshToken(value: string): Promise<void> {
    await this.asyncStorage.setItem(SessionRepository.REFRESH_TOKEN_STORAGE_KEY, value);
  }

  async isAccessTokenExpired(): Promise<boolean> {
    const exp = await this.asyncStorage.getItem<number>(SessionRepository.ACCESS_TOKEN_EXP_KEY);
    if (!exp) return true;
    return exp < Date.now();
  }

  async clear(): Promise<void> {
    await Promise.all([
      this.asyncStorage.removeItem(SessionRepository.ADDRESS_STORAGE_KEY),
      this.asyncStorage.removeItem(SessionRepository.ACCESS_TOKEN_STORAGE_KEY),
      this.asyncStorage.removeItem(SessionRepository.REFRESH_TOKEN_STORAGE_KEY),
      this.asyncStorage.removeItem(SessionRepository.ACCESS_TOKEN_EXP_KEY),
    ]);
  }

  private getTokenExp(token: string): number {
    const decoded = jwtDecode<{ exp: number }>(token);
    return decoded.exp * 1000;
  }
}
