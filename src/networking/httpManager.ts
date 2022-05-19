/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";
import urljoin from "url-join";
import { ApiScope } from ".";
import { ILocalStorage } from './../helpers/localStorageHelper';

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


export type CustomRequestHandler = (config: AxiosRequestConfig) => any | Promise<any>
export type CustomResponseHandler = (value: AxiosResponse) => any
export type CustomErrorHandler = (error: any, config: HttpRequestOptions) => any


//@ts-ignore
// const axiosInstances: { [key in keyof ApiScope]: AxiosInstance } = {};
const axiosInstance = axios.create({
	// baseURL: BASE_SERVER_URL,
	timeout: 30000,
	headers: { "Content-Type": "application/json" }
});

let apiConfig: NetworkingConfig

type NetworkingConfig = {
	localStorage?: ILocalStorage
	servers: {
		[key in ApiScope]: {
			tokenLocalStorageKey?: string // default "token"
			apiUrl: string
			headers?: { [key: string]: (string | ((options: HttpRequestOptions) => string)) }
			requestHandlers?: CustomRequestHandler[];
			responseHandlers?: CustomResponseHandler[];
			errorHandlers?: CustomErrorHandler[];
			axiosConfig?: AxiosRequestConfig
		}
	},
	loggingEnabled?: boolean
}

let _localStorage: ILocalStorage

export const initNetworking = (config: NetworkingConfig) => {
	apiConfig = config;
	_localStorage = (config.localStorage ?? typeof localStorage !== "undefined" ? localStorage : undefined) as any
	Object.keys(config.servers).forEach((key) => {
		// const serverConfig = config.servers[key];
		// const axiosInstance = axios.create({
		//   // baseURL: BASE_SERVER_URL,
		//   timeout: 30000,
		//   headers: { "Content-Type": "application/json" },
		//   // ...(serverConfig.axiosConfig ?? {})
		// });

		// axiosInstance.interceptors.request.use(
		//   axiosLogginInterceptor,
		//   error => {
		//     // Do something with request error
		//     return Promise.reject(error);
		//   }
		// );

		// axiosInstances[key] = axiosInstance;
	})
};

const axiosLogginInterceptor = (config?: AxiosRequestConfig) => {
	if (apiConfig.loggingEnabled) {
		console.log(`performing http ${config?.method} to ${config?.url} with options and token ${config?.headers?.["Authorization"]} `, JSON.stringify(config?.data), config);
	}
}
// simple request handler to log the requests with full config object
// axiosInstance.interceptors.request.use(
//   axiosLogginInterceptor,
//   error => {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );


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
			headers[key] = value
		}
	}

	// whenever the url we are passing is a full url so we can also call arbitrary enpoints if needed
	const isFullUrl = requestUrl.toLowerCase().startsWith("http") || requestUrl.toLowerCase().startsWith("https");
	const authHeader = headers["Authorization"];
	if (typeof window !== "undefined" && isProtected && !authHeader) {
		const token = await _localStorage.getItem((apiConfig.servers[apiScope].tokenLocalStorageKey ?? "token") as any)
		if (token) {
			headers["Authorization"] = `Bearer ${token}`;
		}
	}
	const serverInfo = apiConfig.servers[apiScope];
	let finalUrl = requestUrl;
	if (!isFullUrl) {
		finalUrl = serverInfo.apiUrl;// `${serverInfo.protocol}://${serverInfo.serverAddress}:${serverInfo.port}`;
		// if (serverInfo.baseUrl) {
		//   finalUrl = urljoin(finalUrl, serverInfo.baseUrl);
		// }
		console.log("joining ", finalUrl, requestUrl);
		finalUrl = urljoin(finalUrl, requestUrl);
		console.log("final url is", finalUrl);
	}

	try {
		console.log("req");
		const result = await axiosInstance.request({
			url: finalUrl,
			headers: headers,
			data: payload,
			method,
			cancelToken: requestOptions?.cancelToken?.token

		});
		if (apiConfig.loggingEnabled) {
			console.log(`request result for http ${method} to ${finalUrl}`, JSON.stringify(result.data));
		}
		apiConfig.servers[apiScope].responseHandlers?.forEach((fn) => {
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
