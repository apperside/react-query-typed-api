/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Wrap local storage implementation in order to:
 * - provide a better interface (typed key-value pair for multiget-multiset instead of array of array)
 * - easily allow to switch to any kind of local storage implementation
 */

export interface ILocalStorage {
  setItem: (key: LocalStorageKeys, data: string) => void | Promise<unknown>;
  getItem: (key: LocalStorageKeys) => string | null;
  setBoolean: (key: LocalStorageKeys, data: boolean) => false | void;
  getBoolean: (key: LocalStorageKeys) => boolean;
  multiSet: (data: LocalStorageKeyValuePair) => void;
  multiGet: (...keys: LocalStorageKeys[]) => Promise<LocalStorageKeyValuePair>;
  multiRemove: (...keys: LocalStorageKeys[]) => Promise<void>;
  removeItem: (key: LocalStorageKeys) => Promise<void>;
  clear: () => void;
}

export type LocalStorageKeys =
  | "userId"
  | "userToken";

type LocalStorageKeyValuePair = { [key in Partial<LocalStorageKeys>]?: string };
export const localStorageHelper: ILocalStorage = {
  setItem: (key: LocalStorageKeys, data: string) => {
    if (data !== undefined && data != null) {
      return localStorage.setItem(key, data);
    }
    console.warn(`trying to insert ${data} for key ${key}`);
    return new Promise((resolve) => resolve(false));
  },
  getItem: (key: LocalStorageKeys) => {
    return localStorage.getItem(key);
  },
  setBoolean: (key: LocalStorageKeys, data: boolean) => {
    console.warn(`trying to insert boolean ${data} for key ${key}`);
    if (data !== undefined && data != null) {
      return localStorage.setItem(key, String(data));
    }
    return false;
  },
  getBoolean: (key: LocalStorageKeys) => {
    return Boolean(localStorage.getItem(key) == "true");
  },

  multiSet: (data: LocalStorageKeyValuePair) => {
    Object.entries(data)
      .filter((entry) => {
        console.log(`trying to insert ${entry[1]} for key ${entry[0]}`);
        return entry[1] !== undefined && entry[1] !== null;
      })
      .map(entry => {
        entry[1] = String(entry[1]);
        return entry;
      }) as string[][];
    Object.keys(data).forEach((key) => localStorage.setItem(key, (data as any)[key]));
  },
  multiGet: (
    ...keys: LocalStorageKeys[]
  ): Promise<LocalStorageKeyValuePair> => {
    return new Promise((resolve) => {
      const result = {};
      keys.forEach((key) => {
        (result as any)[key] = localStorage.getItem(key);
      });
      resolve(result);
    });
  },
  multiRemove: (...keys: LocalStorageKeys[]): Promise<void> => {
    console.warn("removing multiple keys from local storage ", keys);
    return new Promise((resolve) => {
      keys.forEach((key) => {
        localStorage.removeItem(key);
      });
      resolve();
    });
  },
  removeItem: (key: LocalStorageKeys): Promise<void> => {
    console.warn("removing key from local storage " + key);
    return new Promise((resolve) => {
      localStorage.removeItem(key);
      resolve();
    });
  },
  clear: () => localStorage.clear()
};
