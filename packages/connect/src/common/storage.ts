export const STORAGE_PREFIX = 'tanto';

export const LocalStorage = {
  isAccessible: () => typeof localStorage !== 'undefined',

  set: (key: string, data: unknown): boolean => {
    if (!LocalStorage.isAccessible()) {
      return false;
    }

    localStorage.setItem(key, JSON.stringify(data));
    return true;
  },

  get: <T = unknown>(key: string): T | undefined => {
    if (!LocalStorage.isAccessible()) {
      return undefined;
    }

    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data) as T;
    }

    return undefined;
  },

  remove: (key: string): boolean => {
    if (!LocalStorage.isAccessible()) {
      return false;
    }

    localStorage.removeItem(key);
    return true;
  },
};

export const ReconnectStorage = {
  get: (connectorId: string): boolean =>
    LocalStorage.get<boolean>(`${STORAGE_PREFIX}.RECONNECT.${connectorId}`) ?? false,

  add: (connectorId: string): boolean => LocalStorage.set(`${STORAGE_PREFIX}.RECONNECT.${connectorId}`, true),

  remove: (connectorId: string): boolean => LocalStorage.remove(`${STORAGE_PREFIX}.RECONNECT.${connectorId}`),
};
