import camelcaseKeys from 'camelcase-keys';
import decamelizeKeys from 'decamelize-keys';
import { type $Fetch, type FetchContext, ofetch } from 'ofetch';

import { HeadlessConfig } from '../HeadlessConfig';
import { SessionRepository } from '../SessionRepository';

export const HTTP_STATUS_UNAUTHORIZED = 401;

export class HttpError extends Error {
  constructor(public code: number, public message: string) {
    super(message);
  }
}

declare module 'ofetch' {
  interface FetchOptions {
    shouldRefreshToken?: boolean;
    shouldTransformRequest?: boolean;
    shouldTransformResponse?: boolean;
  }
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export class HttpClient {
  private $fetch!: $Fetch;
  private refreshTokensPromise: Promise<RefreshTokenResponse> | null = null;

  static inject = ['headlessConfig', 'sessionRepository'] as const;

  constructor(private headlessConfig: HeadlessConfig, private sessionRepository: SessionRepository) {
    this.$fetch = ofetch.create({
      onRequest: this.onRequest.bind(this),
      onResponse: this.onResponse.bind(this),
      onResponseError: this.onResponseError.bind(this),
    });
  }

  async call<T>({
    method = 'GET',
    baseUrl = this.headlessConfig.waypointBaseUrl,
    path = '',
    shouldTransformRequest = true,
    shouldTransformResponse = true,
    data,
    ...extras
  }: {
    method?: string;
    baseUrl?: string;
    path?: string;
    data?: Record<string, any>;
  } & Record<string, any>): Promise<T> {
    const res: T = await this.$fetch(path, {
      method,
      baseURL: baseUrl,
      shouldTransformRequest,
      shouldTransformResponse,
      ...{ [method.toLowerCase() === 'get' ? 'query' : 'body']: data },
      ...extras,
    });
    return res;
  }

  private async onRequest({ options }: FetchContext) {
    const { body, query, params, shouldTransformRequest = true, shouldTransformResponse = true } = options;

    if ((query !== undefined || params !== undefined) && shouldTransformRequest)
      options.query = decamelizeKeys(query ?? params ?? {}, { deep: true });

    if (
      body &&
      typeof body === 'object' &&
      !(body instanceof URLSearchParams) &&
      !(body instanceof FormData) &&
      shouldTransformRequest
    )
      options.body = decamelizeKeys(body, { deep: true }) as any;

    if (shouldTransformResponse)
      options.parseResponse = (responseText: string) => camelcaseKeys(JSON.parse(responseText), { deep: true });

    options.retry = false;

    const accessToken = await this.sessionRepository.getAccessToken();
    if (accessToken) options.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  private async onResponse(context: FetchContext) {
    const { response, options, request } = context;

    const isUnauthorized = response?.status === HTTP_STATUS_UNAUTHORIZED;

    if (!isUnauthorized) return;

    try {
      const { accessToken: newAccessToken } = await this.refreshTokens();
      const headers = new Headers(options.headers);
      headers.set('Authorization', `Bearer ${newAccessToken}`);

      await this.$fetch(request, {
        ...options,
        headers,
        shouldRefreshToken: false,
        onResponse(ctx) {
          Object.assign(context, ctx);
        },
      });
    } catch {}
  }

  private async onResponseError(context: FetchContext) {
    const { response } = context;
    const ok = response?.ok;

    if (!ok)
      throw new HttpError(
        response?._data?.code ?? response?._data?.errorCode,
        response?._data?.message ?? response?._data?.errorMessage,
      );
  }

  private async refreshTokens() {
    if (this.refreshTokensPromise) return this.refreshTokensPromise;

    try {
      const refreshToken = await this.sessionRepository.getRefreshToken();

      if (!refreshToken) throw new Error('No refresh token found');

      this.refreshTokensPromise = this.call<RefreshTokenResponse>({
        baseUrl: this.headlessConfig.waypointBaseUrl,
        method: 'POST',
        path: '/auth/refresh-token',
        headers: { 'sm-client-id': this.headlessConfig.clientId },
        data: { refreshToken },
        shouldTransformRequest: false,
      });

      const tokens = await this.refreshTokensPromise;

      await Promise.all([
        this.sessionRepository.setAccessToken(tokens.accessToken),
        this.sessionRepository.setRefreshToken(tokens.refreshToken),
      ]);

      return tokens;
    } catch (error) {
      this.sessionRepository.clear();
      throw new Error('Session expired. Please login again.', { cause: error });
    } finally {
      this.refreshTokensPromise = null;
    }
  }
}
