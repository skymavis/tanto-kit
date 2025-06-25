export class TantoWidgetError extends Error {
  constructor(public readonly code: string, message: string, public readonly details?: Record<string, any>) {
    super(`[${code}] ${message}`);
    this.name = 'TantoWidgetError';
  }
}

export const TantoWidgetErrorCodes = {
  KEYLESS_WALLET_CONFIG_MISSING_CLIENT_ID: 'KEYLESS_WALLET_CONFIG_MISSING_CLIENT_ID',
  CONTEXT_NOT_INITIALIZED: 'CONTEXT_NOT_INITIALIZED',
  NONCE_NOT_AVAILABLE: 'NONCE_NOT_AVAILABLE',
} as const;
