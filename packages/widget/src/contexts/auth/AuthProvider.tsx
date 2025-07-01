import { useMutation } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

import { useAccountSwitch } from '../../hooks/useAccountSwitch';
import { authEventEmitter } from '../../hooks/useAuthEffect';
import { mutation } from '../../services/queries';
import { delay } from '../../utils/common';
import { TantoWidgetError, TantoWidgetErrorCodes } from '../../utils/errors';
import { generateSiweMessage } from '../../utils/siwe';
import { isWaypointConnector, isWCConnector } from '../../utils/walletDetection';
import { useTantoConfig } from '../tanto/useTantoConfig';
import type { AuthState } from './AuthContext';
import { AuthContext } from './AuthContext';
import { useWaypointMessageHandler } from './useWaypointMessageHandler';

export function AuthProvider({ children }: PropsWithChildren) {
  const { createAccountOnConnect: enableAuth = false, clientId } = useTantoConfig();
  const { address, chainId, connector } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Use ref to track the current sign-in session to prevent race conditions
  const currentSignInRef = useRef<string | null>(null);

  const { mutateAsync: generateNonce } = useMutation(mutation.generateNonce());
  const { mutateAsync: createAccount } = useMutation(mutation.createAccount());

  const reset = useCallback(() => {
    setIsSigningIn(false);
    setError(null);
    currentSignInRef.current = null;
  }, []);

  const signIn = useCallback(async (): Promise<void> => {
    if (!enableAuth || !address || !chainId || isSigningIn) return;

    setIsSigningIn(true);
    setError(null);

    const sessionId = v4();
    currentSignInRef.current = sessionId;

    try {
      if (isWCConnector(connector?.id)) await delay(1_000);

      if (isWaypointConnector(connector?.id)) return;

      const { nonce, expirationTime, issuedAt, notBefore } = await generateNonce({ address });
      const message = generateSiweMessage({
        address,
        chainId,
        nonce,
        expirationTime,
        issuedAt,
        notBefore,
      });
      const signature = await signMessageAsync({ message });

      if (currentSignInRef.current !== sessionId) return;

      const token = await createAccount({ message, signature, clientId });

      authEventEmitter.emit('success', {
        address,
        chainId,
        token,
      });
    } catch (error) {
      if (currentSignInRef.current !== sessionId) return;

      const authError =
        error instanceof Error
          ? error
          : new TantoWidgetError(TantoWidgetErrorCodes.CREATE_ACCOUNT_FAILED, 'Failed to create account');

      console.debug('Auth error:', authError);

      setError(authError);
      authEventEmitter.emit('failed', { error: authError });
      disconnect();
    } finally {
      setIsSigningIn(false);
    }
  }, [
    enableAuth,
    address,
    chainId,
    isSigningIn,
    generateNonce,
    signMessageAsync,
    disconnect,
    createAccount,
    connector?.id,
    clientId,
  ]);

  useAccountSwitch(signIn);
  useWaypointMessageHandler(enableAuth);

  const contextValue = useMemo<AuthState>(
    () => ({
      enable: enableAuth,
      error,
      isSigningIn,
      signIn,
      reset,
    }),
    [enableAuth, error, isSigningIn, signIn, reset],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
