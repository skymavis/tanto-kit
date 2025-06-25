export type FetcherMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface FetcherOptions {
  method?: FetcherMethod;
  data?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
}

export class FetcherError extends Error {
  readonly status: number;
  readonly data: unknown;
  constructor(message: string, status: number, data: unknown = null) {
    super(message);
    this.name = 'FetcherError';
    this.status = status;
    this.data = data;
  }
}

export const fetcher = async <T = unknown>(url: string, options: FetcherOptions = {}): Promise<T> => {
  const { method = 'GET', timeout = 15000, headers = {}, data } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const hasBody = data !== undefined && ['POST', 'PUT', 'PATCH'].includes(method);

  const fetchOptions: RequestInit = {
    method,
    headers: {
      Accept: 'application/json',
      ...(hasBody && { 'Content-Type': 'application/json' }),
      ...headers,
    },
    body: hasBody ? JSON.stringify(data) : undefined,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, fetchOptions);
    const responseData = await response.json();

    if (!response.ok)
      throw new FetcherError(response.statusText || `HTTP ${response.status}`, response.status, responseData);

    return responseData as T;
  } catch (error) {
    if (error instanceof FetcherError) throw error;

    if (error instanceof Error) {
      if (error.name === 'AbortError') throw new FetcherError('Request timeout', 408);
      throw new FetcherError(error.message, 0);
    }

    throw new FetcherError('Unknown error occurred', 0);
  } finally {
    clearTimeout(timeoutId);
  }
};
