import { useContext } from 'react';

import { TantoContext, TantoState } from '../contexts/tanto/TantoContext';

export function useTanto(): TantoState {
  const context = useContext(TantoContext);
  if (context === undefined) {
    throw new Error('useTanto must be used within a TantoProvider');
  }
  return context;
}
