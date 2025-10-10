import { AsyncStorage } from './storage';

// For testing
export const mockAsyncStorage: AsyncStorage = {
  async getItem<T>(key: string): Promise<T | null> {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  },
  async setItem<T>(key: string, value: T): Promise<T> {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  },
  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  },
};
