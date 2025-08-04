import { createEmitter } from '@wagmi/core/internal';
import { useEffect } from 'react';

export interface AuthSuccessData {
  address: string;
  chainId: number;
  token: string;
}

export interface AuthFailedData {
  error: Error;
}

export type AuthSuccessCallback = (data: AuthSuccessData) => void;
export type AuthFailedCallback = (data: AuthFailedData) => void;

export const authEventEmitter = createEmitter<{
  success: AuthSuccessData;
  failed: AuthFailedData;
}>('tanto-auth');

export interface UseAuthEffectParameters {
  onSuccess?: AuthSuccessCallback;
  onError?: AuthFailedCallback;
}

export function useAuthEffect({ onSuccess, onError }: UseAuthEffectParameters) {
  useEffect(() => {
    if (onSuccess) {
      const handler = ({ uid: _, ...data }: AuthSuccessData & { uid?: string }) => onSuccess(data);
      authEventEmitter.on('success', handler);
      return () => authEventEmitter.off('success', handler);
    }
  }, [onSuccess]);

  useEffect(() => {
    if (onError) {
      const handler = ({ uid: _, ...data }: AuthFailedData & { uid?: string }) => onError(data);
      authEventEmitter.on('failed', handler);
      return () => authEventEmitter.off('failed', handler);
    }
  }, [onError]);
}
