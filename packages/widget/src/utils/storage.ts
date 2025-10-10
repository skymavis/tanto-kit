import localforage from 'localforage';

import { DefaultConfig } from '../getDefaultConfig';
import { isClient } from './common';

const CONFIG_STORAGE_KEY = 'tanto.config';

export interface AsyncStorage {
  getItem<T>(key: string): Promise<T | null>;
  setItem<T>(key: string, value: T): Promise<T>;
  removeItem(key: string): Promise<void>;
}

export const tantoStorage = localforage.createInstance({
  name: 'TANTO_WIDGET_INDEXED_DB',
});

export const setConfig = (config: DefaultConfig) => {
  if (isClient()) localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
};

export const getConfig = () => {
  return isClient() ? (JSON.parse(localStorage.getItem(CONFIG_STORAGE_KEY) ?? '{}') as DefaultConfig) : null;
};
