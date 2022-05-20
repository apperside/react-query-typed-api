/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";
import urljoin from "url-join";
import { ApiScope } from "..";
import localStorage from "cross-local-storage";
declare module "cross-local-storage" {
	/**
  
	  * Augment this interface to add al custom endpoints
  
	  */

	export interface LocalStorageKeys {
		token: string
	}
}
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";


export type BaseHttpRequestOptions<Payload = any> = {
	query?: string | { [key: string]: string };
	headers?: { [key: string]: string };
	method?: HttpMethod;
	isProtected?: boolean;
	extraRoutePath?: string | string[] | (string | number)[]
	cancelToken?: CancelTokenSource
	payload?: Payload
	// url: string;
	apiScope?: ApiScope;
}

export type HttpRequestOptions<P = any> = {
	url: string
} & BaseHttpRequestOptions<P>


export type CustomRequestHandler = (config: AxiosRequestConfig) => any | Promise<AxiosRequestConfig>
export type CustomResponseHandler = (value: AxiosResponse) => any
export type CustomErrorHandler = (error: any, config: HttpRequestOptions) => any


let apiConfig: NetworkingConfig

type AppServerConfig = {
	/**
	 * The name of the localstorage key that will be used to store and read the token.
	 * Evety request market as authenticated will put in the header the token as Bearer.
	 * TODO: Handle Multiple methods. in the meanwhile it possible to use the headers config key
	 * to build custom headers
	 */
	tokenLocalStorageKey?: string // default "token"
	apiUrl: string
	timeout?: number
	headers?: { [key: string]: (string | ((options: HttpRequestOptions) => string)) }
	requestInterceptor?: CustomRequestHandler;
	responseHandlers?: CustomResponseHandler[];
	errorHandlers?: CustomErrorHandler[];
	axiosConfig?: AxiosRequestConfig
}
type NetworkingConfig = {
	servers: {
		[key in ApiScope]: AppServerConfig
	}
	loggingEnabled?: boolean
}

// let _localStorage: ILocalStorage

const axiosLogginInterceptor = (config?: AxiosRequestConfig) => {
	if (apiConfig.loggingEnabled) {
		console.log(`performing http ${config?.method} to ${config?.url} with options and token ${config?.headers?.["Authorization"]} `, JSON.stringify(config?.data), config);
	}
	return config;
}

//@ts-ignore
const axiosInstances: { [key in keyof ApiScope]: AxiosInstance } = {};

export function initNetworking(config: NetworkingConfig) {
	apiConfig = config;
	Object.keys(config.servers).forEach((key) => {
		const serverConfig = config.servers[key] as AppServerConfig;
		const axiosInstance = axios.create({
			timeout: serverConfig.timeout ?? 30000,
			headers: { "Content-Type": "application/json" },
			...serverConfig.axiosConfig
		});

		/**
		 * In this initialization phase we add onlu the interceptor for the request
		 * because it comes handy to have the full config object.
		 * However, due to axios's api design, it limits to only 1 the request interceptor.
		 * 
		 * For response and error handling instead, we manually fire all the the interceptors
		 * provided in the config object directly on the axios response (see httpRequest method)
		 */
		axiosInstance.interceptors.request.use(
			(config) => {
				axiosLogginInterceptor(config)
				if (serverConfig.requestInterceptor) {
					return serverConfig.requestInterceptor(config)
				}
				return config
			},
			error => {
				return Promise.reject(error);
			}
		);

		axiosInstances[key] = axiosInstance;
	})
}


export async function httpRequest(options: HttpRequestOptions) {
	const {
		apiScope = "main",
		isProtected = true,
		...requestOptions
	} = options;
	const { method, url: requestUrl, payload } = requestOptions;
	const { headers = {} } = requestOptions;

	// headers = { ...headers, ...apiConfig.servers[apiScope].headers }
	const headersConfig = apiConfig.servers[apiScope].headers ?? {};
	for await (const [key, value] of Object.entries(headersConfig)) {
		if (typeof value === "function") {
			headers[key] = await value(options);
		}
		else {
			headers[key] = value;
		}
	}

	// whenever the url we are passing is a full url so we can also call arbitrary enpoints if needed
	const isFullUrl = requestUrl.toLowerCase().startsWith("http") || requestUrl.toLowerCase().startsWith("https");
	const authHeader = headers["Authorization"];
	if (typeof window !== "undefined" && isProtected && !authHeader) {
		const token = await localStorage.getItem((apiConfig.servers[apiScope].tokenLocalStorageKey ?? "token") as any)
		if (token) {
			headers["Authorization"] = `Bearer ${token}`;
		}
	}
	const serverInfo = apiConfig.servers[apiScope];
	let finalUrl = requestUrl;
	if (!isFullUrl) {
		finalUrl = serverInfo.apiUrl;
		finalUrl = urljoin(finalUrl, requestUrl);
		console.log("final url is", finalUrl);
	}

	try {
		// console.log("performin request", axiosInstance, axiosInstances[apiScope]);
		const result = await (axiosInstances[apiScope] as AxiosInstance).request({
			url: finalUrl,
			headers: headers,
			data: payload,
			method,
			cancelToken: requestOptions?.cancelToken?.token

		});

		/**
		 * We could use interceptors to handle this, but interceptor api only allows 1 interceptor.
		 * In this way the final user can provide multiple interceptors eventually responsible for something different
		 */
		if (apiConfig.loggingEnabled) {
			console.log(`request result for http ${method} to ${finalUrl}`, JSON.stringify(result.data));
		}
		(apiConfig.servers[apiScope] as AppServerConfig).responseHandlers?.forEach((fn) => {
			try {
				fn(result);
			} catch (err) {
				console.warn("error in handler", fn);
			}
		});
		return result.data;
	} catch (error: any) {
		console.error(`error in http request to ${finalUrl}`, {
			message: error.message,
			status: error.response?.status,
			data: error.response?.data,
			headers: error.response?.headers,
			stack: error.stack
		});
		/**
		 * We could use interceptors to handle this, but interceptor api only allows 1 interceptor.
		 * In this way the final user can provide multiple interceptors eventually responsible for something different
		 */
		apiConfig.servers[apiScope].errorHandlers?.forEach((fn) => {
			try {
				fn(error, { ...requestOptions, apiScope });
			} catch (err) {
				console.warn("error in handler", fn);
			}
		});
		throw error;
	}
}
