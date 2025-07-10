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
  const { createAccountOnConnect: enableAuth = false, clientId, __internal_customBaseUrl } = useTantoConfig();
  const { address, chainId, connector } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<Error | null>(null);
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

    const sessionId = v4();
    currentSignInRef.current = sessionId;
    setIsSigningIn(true);
    setError(null);

    try {
      // Wait for WC (in case of connect to metamask) switch chain
      if (isWCConnector(connector?.id)) await delay(1_000);

      if (isWaypointConnector(connector?.id)) return;

      const { nonce, expirationTime, issuedAt, notBefore } = await generateNonce({
        baseUrl: __internal_customBaseUrl,
        address,
        clientId,
      });
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

      const { idToken } = await createAccount({
        baseUrl: __internal_customBaseUrl,
        message,
        signature,
        clientId,
      });
      authEventEmitter.emit('success', {
        address,
        chainId,
        token: idToken,
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
    connector?.id,
    generateNonce,
    signMessageAsync,
    createAccount,
    clientId,
    disconnect,
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
