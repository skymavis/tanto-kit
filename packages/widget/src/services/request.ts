export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestOptions {
  method?: RequestMethod;
  body?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
}

export class RequestError extends Error {
  readonly status: number;
  readonly data: unknown;
  constructor(message: string, status: number, data: unknown = null) {
    super(message);
    this.name = 'RequestError';
    this.status = status;
    this.data = data;
  }
}

export async function request<T = unknown>(url: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', timeout = 15000, headers = {}, body } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const hasBody = body !== undefined && ['POST', 'PUT', 'PATCH'].includes(method);

  const fetchOptions: RequestInit = {
    method,
    headers: {
      Accept: 'application/json',
      ...(hasBody && { 'Content-Type': 'application/json' }),
      ...headers,
    },
    body: hasBody ? JSON.stringify(body) : undefined,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, fetchOptions);
    const responseData = await response.json();

    if (!response.ok)
      throw new RequestError(response.statusText || `HTTP ${response.status}`, response.status, responseData);

    return responseData as T;
  } catch (error) {
    if (error instanceof RequestError) throw error;

    if (error instanceof Error) {
      if (error.name === 'AbortError') throw new RequestError('Request timeout', 408);
      throw new RequestError(error.message, 0);
    }

    throw new RequestError('Unknown error occurred', 0);
  } finally {
    clearTimeout(timeoutId);
  }
}
