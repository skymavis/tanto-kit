import { useMutation, useQuery } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

import { useAccountSwitch } from '../../hooks/useAccountSwitch';
import { authEventEmitter } from '../../hooks/useAuthEvents';
import { mutation, query } from '../../services/queries';
import { delay } from '../../utils/common';
import { TantoWidgetError, TantoWidgetErrorCodes } from '../../utils/errors';
import { generateSiweMessage } from '../../utils/siwe';
import { isWaypointConnector, isWCConnector } from '../../utils/walletDetection';
import { useTantoConfig } from '../tanto/useTantoConfig';
import type { AuthState } from './AuthContext';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }: PropsWithChildren) {
  const { createAccountOnConnect: enableAuth = false } = useTantoConfig();
  const { address, chainId, connector } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { data: nonce, refetch: refetchNonce } = useQuery({
    ...query.nonce(),
    enabled: enableAuth,
  });

  const { mutateAsync: createAccount } = useMutation(mutation.createAccount());

  const reset = useCallback(() => {
    setIsSigningIn(false);
    setError(null);
  }, []);

  const signIn = useCallback(async (): Promise<void> => {
    if (!enableAuth || !address || !chainId || isSigningIn) return;

    setIsSigningIn(true);
    setError(null);

    try {
      // WC connector has a delay to switch chain
      if (isWCConnector(connector?.id)) await delay(1_000);

      if (isWaypointConnector(connector?.id)) {
        authEventEmitter.emit('signInSuccess', { address, chainId });
        return;
      }

      if (!nonce) throw new TantoWidgetError(TantoWidgetErrorCodes.NONCE_NOT_AVAILABLE, 'Nonce is not available');

      const message = generateSiweMessage({ address, chainId, nonce });
      const signature = await signMessageAsync({ message });
      const authData = await createAccount({ signature });

      authEventEmitter.emit('signInSuccess', {
        address,
        chainId,
        data: authData,
      });
    } catch (error) {
      const authError =
        error instanceof Error
          ? error
          : new TantoWidgetError(TantoWidgetErrorCodes.CREATE_ACCOUNT_FAILED, 'Failed to create account');

      console.debug('Auth error:', authError);
      setError(authError);
      authEventEmitter.emit('signInError', {
        address,
        chainId,
        error: authError,
      });

      disconnect();
    } finally {
      refetchNonce();
      setIsSigningIn(false);
    }
  }, [
    enableAuth,
    address,
    chainId,
    isSigningIn,
    nonce,
    signMessageAsync,
    disconnect,
    refetchNonce,
    createAccount,
    connector?.id,
  ]);

  useAccountSwitch(signIn);

  const contextValue = useMemo<AuthState>(
    () => ({
      enable: enableAuth,
      error,
      isSigningIn,
      signIn,
      reset,
    }),
    [enableAuth, isSigningIn, error, signIn, reset],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
