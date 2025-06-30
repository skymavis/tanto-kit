import { useTanto } from './useTanto';

export function useTantoConfig() {
  const { config } = useTanto();
  return config;
}
