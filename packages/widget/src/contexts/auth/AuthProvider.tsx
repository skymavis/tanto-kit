import { useMutation, useQuery } from '@tanstack/react-query';
import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

import { useAccountSwitch } from '../../hooks/useAccountSwitch';
import { authEventEmitter } from '../../hooks/useAuthEvents';
import { useTantoConfig } from '../../hooks/useTantoConfig';
import { mutation, query } from '../../services/queries';
import { generateSiweMessage, isWaypointConnector } from '../../utils';
import { TantoWidgetError, TantoWidgetErrorCodes } from '../../utils/errors';
import { AuthContext, AuthState } from './AuthContext';

export const AuthProvider = ({ children }: PropsWithChildren) => {
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
};
