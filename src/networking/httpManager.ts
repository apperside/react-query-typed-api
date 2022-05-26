import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";
import urljoin from "url-join";
import { ApiScope, AppRoutes } from "..";
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



/**
 * The options for an HTTP request
 * @param Payload the type for the payload, default is any
 */
export interface HttpRequestOptions<Payload = any> {
	/**
	 * The request url
	 */
	url: string
	/**
	 * The query string.
	 * It can be:
	 * - a plain string: in this case it must be a valid query string
	 * - a key value pair: in this case the query string will be built using the keys and their stringified values
	 */
	query?: string | { [key: string]: string | number | boolean };
	/**
	 * The headers for the request.
	 * It must be a key-value pair with with the values being a string or a number (which will be stringified )
	 */
	headers?: { [key: string]: string | number }
	/**
	 * The HTTP method
	 */
	method?: HttpMethod;
	/**
	 * If it is true, the library will put a bearer token in the `Authorization` header which will be read from the localstorage's
	 * token value. The name of the key to search for in the local storage can be customized with the {@link ApiConfig} object  in the 
	 * {@link initApi} function
	 */
	isProtected?: boolean;
	/**
	 * A string that will be added after the base api url 
	 * (passed in the [initialization options](#initialization) and before the endpoint url. 
	 * For example if the apiUrl is http://localhost:8080/api and your endpoint is `/my-endpoint`, 
	 * if you pass for example `"custom-path"` to this propery, 
	 * the final endpoint will be http://localhost:8080/api/custom-path/my-endpoint.
	 * The value can also be an array, in this case the url will be built joining the array values with a slash
	 */
	extraRoutePath?: string | number | string[] | (string | number)[]
	/**
	 * An [Axios's cancel token](https://axios-http.com/docs/cancellation) to cancel pending requests if needed
	 */
	cancelToken?: CancelTokenSource
	/**
	 * The payload for the request 
	 */
	payload?: Payload
	/**
	 * The {@link ApiScope} for the request.
	 * Based on this value a specific network configuration will be picked up based con the configuration object passed to {@link initApi}
	 */
	apiScope?: ApiScope;
}


export type CustomRequestHandler = (config: AxiosRequestConfig) => any | Promise<AxiosRequestConfig>
export type CustomResponseHandler = (value: AxiosResponse) => any
export type CustomErrorHandler = (error: any, config: HttpRequestOptions) => any


let apiConfig: ApiConfig

/**
 * Api configuration
 */
export type ApiServerConfig = {
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

/**
 * Configuration object for the apiaaa
 */
export type ApiConfig = {
	/**
	 * A key-value pair where the key are all the keys in {@link AppRoutes}, and the value
	 * an {@link ApiServerConfig} object
	 */
	servers: {
		[key in keyof AppRoutes]: ApiServerConfig
	}
	loggingEnabled?: boolean
}
/**
 * @deprecated use {@link ApiConfig} instead
 */
export type NetworkingConfig = ApiConfig

// let _localStorage: ILocalStorage

const axiosLogginInterceptor = (config?: AxiosRequestConfig) => {
	if (apiConfig.loggingEnabled) {
		console.log(`performing http ${config?.method} to ${config?.url} with options and token ${config?.headers?.["Authorization"]} `, JSON.stringify(config?.data), config);
	}
	return config;
}

//@ts-ignore
const axiosInstances: { [key in keyof ApiScope]: AxiosInstance } = {};

/**
 * This function must be called as soon as possible in you application lifecycle,
 * in any case it must be called before any api request.
 * See how to use it in the [usage section](/docs/usage/basic-usage)
 */
export function initApi(config: ApiConfig) {
	apiConfig = config;
	Object.keys(config.servers).forEach((key) => {
		const serverConfig = config.servers[key] as ApiServerConfig;
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

/**
 * @deprecated
 * use  {@link initApi} instead
 */
export const initNetworking = initApi;

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
		(apiConfig.servers[apiScope] as ApiServerConfig).responseHandlers?.forEach((fn) => {
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
