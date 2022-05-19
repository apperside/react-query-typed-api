/**
 * Wrap local storage implementation in order to:
 * - provide a better interface (typed key-value pair for multiget-multiset instead of array of array)
 * - easily allow to switch to any kind of local storage implementation
 */

let AsyncStorage = undefined;
try {
	AsyncStorage = require('@react-native-community/async-storage').default;
} catch (err: any) {
	console.warn('AsyncStorage not found');
}
export interface ILocalStorage {
	setItem: (key: LocalStorageKeys, data: string) => void | Promise<unknown>;
	getItem: (key: LocalStorageKeys) => Promise<string | null>;
	setBoolean: (
		key: LocalStorageKeys,
		data: boolean,
	) => Promise<boolean | void>;
	getBoolean: (key: LocalStorageKeys) => Promise<boolean>;
	multiSet: (data: LocalStorageKeyValuePair) => Promise<void>;
	multiGet: (
		...keys: LocalStorageKeys[]
	) => Promise<LocalStorageKeyValuePair>;
	multiRemove: (...keys: LocalStorageKeys[]) => Promise<void>;
	removeItem: (key: LocalStorageKeys) => Promise<void>;
	clear: () => void;
}

const _localStorage =
	typeof localStorage !== 'undefined' ? localStorage : AsyncStorage;
export type LocalStorageKeys =
	| 'token'

type LocalStorageKeyValuePair = { [key in Partial<LocalStorageKeys>]?: string };
export const localStorageHelper: ILocalStorage = {
	setItem: async (key: LocalStorageKeys, data: string) => {
		if (data !== undefined && data != null) {
			return await _localStorage.setItem(key, data);
		}
		console.warn(`trying to insert ${data} for key ${key}`);
		return new Promise(resolve => resolve(false));
	},
	getItem: async (key: LocalStorageKeys) => {
		return await _localStorage.getItem(key);
	},
	setBoolean: async (key: LocalStorageKeys, data: boolean) => {
		console.warn(`trying to insert boolean ${data} for key ${key}`);
		if (data !== undefined && data != null) {
			return await _localStorage.setItem(key, String(data));
		}
		return false;
	},
	getBoolean: async (key: LocalStorageKeys) => {
		return Boolean((await _localStorage.getItem(key)) == 'true');
	},

	multiSet: async (data: LocalStorageKeyValuePair) => {
		Object.entries(data)
			.filter(entry => {
				console.log(`trying to insert ${entry[1]} for key ${entry[0]}`);
				return entry[1] !== undefined && entry[1] !== null;
			})
			.map(entry => {
				entry[1] = String(entry[1]);
				return entry;
			}) as string[][];
		Object.keys(data).forEach(key =>
			_localStorage.setItem(key, (data as any)[key]),
		);
	},
	multiGet: async (
		...keys: LocalStorageKeys[]
	): Promise<LocalStorageKeyValuePair> => {
		return new Promise(resolve => {
			const result = {};
			keys.forEach(key => {
				(result as any)[key] = _localStorage.getItem(key);
			});
			resolve(result);
		});
	},
	multiRemove: async (...keys: LocalStorageKeys[]): Promise<void> => {
		console.warn('removing multiple keys from local storage ', keys);
		return new Promise(resolve => {
			keys.forEach(key => {
				_localStorage.removeItem(key);
			});
			resolve();
		});
	},
	removeItem: async (key: LocalStorageKeys): Promise<void> => {
		console.warn('removing key from local storage ' + key);
		return new Promise(resolve => {
			_localStorage.removeItem(key);
			resolve();
		});
	},
	clear: async () => _localStorage.clear(),
};
