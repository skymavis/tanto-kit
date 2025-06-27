import { createContext } from 'react';

export interface AuthState {
  enable: boolean;
  error: Error | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  reset: () => void;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);
