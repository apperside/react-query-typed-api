import { CrudRoutes } from "./crud";


export * from "./crud";
export * from "./helpers";
export * from "./hooks";
export * from "./imperative";
export * from "./networking";
export * from "./components";


export interface MainApi extends CrudRoutes {
	/**
	 * TO BE AUGMENTED
	 */
}

/**
 * This type represent the structure of one endpoint.
 */
export type AppEndpoint = {
	[key: string]: {
		/**
		 * The type of the response
		 */
		responseType: any,
		/**
		 * The type of the payload
		 */
		payloadType?: any
		/**
		 * The type of the response when you call mutation instead of query
		 */
		mutationResponseType?: any
	}
}

/**
 * The interface representing all of your api endpoints.
 * It must be a key value pair where the key is an identifier for a specific api and the value and object of type
 * {@link AppEndpoint }
 */
export interface AppRoutes {
	/**
	 * The default {@link ApiScope}. Augment this interface to add more scopes, see the [usage section](/docs/usage/basic-usage) for more information. for more info
	 * @example
	* Here's a simple example:
	* ```typescript
	* declare module "react-query-typed-api" {
	* 
	* 
	* export interface AppRoutes {
	* 	my-other-api: {
	* 		"my-other-endpoint": { responseType: MyOtherResponse }
	* 	}
	* }
	* ```
	 */
	main: MainApi
	//to be augmented
}

/**
 * An app can make use of more than one api, and that is where ApiScope comes into play.
 * By augmenting {@link AppRoutes} with as many keys as you need, you will have full type inferring 
 * for all of your endpoints
 */
export type ApiScope = keyof AppRoutes;



export type ApiResponseType<Scope extends keyof AppRoutes, Route extends keyof AppRoutes[Scope], Type extends "query" | "mutation" = "query"> =
	Type extends "mutation" ?
	AppRoutes[Scope][Route] extends { mutationResponseType: infer M } ?
	M
	:
	AppRoutes[Scope][Route] extends { responseType: infer D } ?
	D
	//@ts-ignore
	: `mutation is missing both responseType and mutationResponseType from the route ${Route} in api scope ${Scope}`
	: AppRoutes[Scope][Route] extends { responseType: infer D } ?
	D
	//@ts-ignore
	: `endpoint definition is missing responseType from the route ${Route} in api scope ${Scope}. Click here to learn how to define endpoints https://apperside.com`;

export type ApiPayloadType<Scope extends keyof AppRoutes, Route extends keyof AppRoutes[Scope]> =
	AppRoutes[Scope][Route] extends { payloadType?: infer P } ?
	P
	: AppRoutes[Scope][Route] extends { responseType: infer D } ?
	D :
	never;


