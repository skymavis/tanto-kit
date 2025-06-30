import { createEmitter } from '@wagmi/core/internal';

export type AuthEventType = 'signInSuccess' | 'signInError';

export interface AuthEventData {
  address?: string;
  chainId?: number;
  data?: any;
  error?: Error;
}

export type AuthEventCallback = (data: AuthEventData) => void;

export const authEventEmitter = createEmitter('tanto-auth');

export function useAuthEvents() {
  const createEventHandler = (eventType: AuthEventType) => {
    return (callback: AuthEventCallback) => {
      const handler = ({ uid: _, ...data }: AuthEventData & { uid?: string }) => callback(data);
      authEventEmitter.on(eventType, handler);
      return () => authEventEmitter.off(eventType, handler);
    };
  };

  return {
    onSignInSuccess: createEventHandler('signInSuccess'),
    onSignInError: createEventHandler('signInError'),
  };
}
