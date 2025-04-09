import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

interface TantoContextValue {}

const TantoContext = createContext<TantoContextValue>({});

export function TantoProvider(props: { children?: ReactNode }) {
  const { children } = props;

  return <TantoContext.Provider value={{}}>{children}</TantoContext.Provider>;
}

export function useTanto() {
  const context = useContext(TantoContext);
  if (!context) throw new Error('useTanto must be used within an TantoProvider');
  return context;
}
