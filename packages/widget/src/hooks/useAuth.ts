import { useContext } from 'react';

import { AuthContext } from '../contexts/auth/AuthContext';
import { TantoWidgetError, TantoWidgetErrorCodes } from '../utils/errors';

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new TantoWidgetError(
      TantoWidgetErrorCodes.CONTEXT_NOT_INITIALIZED,
      'useAuth must be used within a AuthProvider',
    );
  }
  return context;
}
