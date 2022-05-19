/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
export * from "./httpManager";
export * from "./restManager";

type BasePath<T extends string | unknown = unknown> = `${T extends string ? T : ""}${T extends string ? "/" : ""}`
type AllRoutes<S extends string, Prefix extends string | unknown = unknown> =
	`${BasePath<Prefix>}${S}` |
	`${BasePath<Prefix>}${S}/:id` |
	`${BasePath<Prefix>}${S}/bulk-delete/:ids` |
	`${BasePath<Prefix>}${S}/bulk`

export interface GetManyResponse<T> {
	rows: T[];
	count: number
	page: number
}

export type GetOneResponse<T> = T

export interface SaveOnePayload<T> {
	item: T
}
export interface SaveManyPayload<T> {
	items: T[];
}

export type SaveOneResponse<T> = T;
export type DeleteManyPayload<T> = T
export type DeleteManyResponse<T> = T
export interface RoutesModelMapping {

	//to be augmented, put here all the mappings between your routes and models
}
type ResponseTypes<T> = {
	getMany?: any
	getOne?: any
	saveOnePayload?: any
	saveOneResponse?: any
	saveManyPayload?: any
	saveManyResponse?: any
	deleteManyResponse?: any
	deleteManyPayload?: any
}

export type ModelRoutes<T extends keyof RoutesModelMapping, BasePath extends string | unknown = unknown,
	R extends ResponseTypes<T> = {
		getMany?: GetManyResponse<RoutesModelMapping[T]>
		getOne?: GetOneResponse<RoutesModelMapping[T]>
		saveOnePayload?: SaveOnePayload<RoutesModelMapping[T]>
		saveOneResponse?: GetOneResponse<RoutesModelMapping[T]>
		saveManyPayload?: SaveManyPayload<RoutesModelMapping[T]>
		saveManyResponse?: GetManyResponse<RoutesModelMapping[T]>
	}, Type extends "query" | "mutation" = "query"> = {
		[key in AllRoutes<T, BasePath>]: key extends `${string}/bulk` ? {
			responseType: R["saveManyResponse"] extends undefined ? GetManyResponse<RoutesModelMapping[T]> : R["saveManyResponse"]
			payloadType: R["saveManyPayload"] extends undefined ? SaveManyPayload<RoutesModelMapping[T]> : R["saveManyPayload"]
		} : key extends `${string}/:id` ? {
			responseType: R["getOne"] extends undefined ? GetOneResponse<RoutesModelMapping[T]> : R["getOne"]
			payloadType: R["saveOnePayload"] extends undefined ? SaveOnePayload<RoutesModelMapping[T]> : R["saveOnePayload"]
		} : key extends `${string}/bulk-delete/:ids` ? {
			responseType: R["deleteManyResponse"] extends undefined ? DeleteManyResponse<RoutesModelMapping[T]> : R["deleteManyResponse"]
			payloadType: R["deleteManyPayload"] extends undefined ? DeleteManyPayload<RoutesModelMapping[T]> : R["deleteManyPayload"]
		} : key extends `${string}` ? {
			responseType: R["getMany"] extends undefined ? GetManyResponse<RoutesModelMapping[T]> : R["getMany"]
			payloadType: R["saveOnePayload"] extends undefined ? SaveOnePayload<RoutesModelMapping[T]> : R["saveOnePayload"];
			mutationResponseType: R["saveOneResponse"] extends undefined ? SaveOneResponse<RoutesModelMapping[T]> : R["saveOneResponse"];
		} : RoutesModelMapping[T];
	};



export interface CustomCrudRoutes {
	//to be augmented
}

export type CrudRoutes = {
	// eslint-disable-next-line max-len
	[key in keyof CustomCrudRoutes]: CustomCrudRoutes[key]
	// key extends `${string}/bulk` ?
	// { responseType: { data: never }, payloadType: { data: ModelsDef[key][] } } :
	// key extends `${string}/:id` ?
	// { responseType: { data: ModelsDef[key] }, payloadType: ModelsDef[key] } :
	// key extends `${string}` ?
	// { responseType: { data: ModelsDef[key][] }, payloadType: never } :
	// unknown
}

export interface MainApi extends CrudRoutes {
	/**
	 * TO BE AUGMENTED
	 */
}

type Prova = { responseType: { result: boolean }, payloadType: { result: any } }
type Type1 = Prova extends { responseType: any } ? "YES" : "NO"

// interface IApiConfig { [key: string]: { [key: string]: { responseType: any, payloadType?: any } } }
export interface AppRoutes {
	main: MainApi
	//to be augmented
}

export type ApiScope = keyof AppRoutes;

export type RestApiRoute<S extends ApiScope = "main"> = keyof AppRoutes[S]

export type RestResponseType<S extends keyof AppRoutes, T extends keyof AppRoutes[S], Type extends "query" | "mutation" = "query"> =
	Type extends "mutation" ?
	AppRoutes[S][T] extends { mutationResponseType: infer M } ?
	M
	:
	AppRoutes[S][T] extends { responseType: infer D } ?
	D
	//@ts-ignore
	: `mutation is missing both responseType and mutationResponseType from ${T} in api scope ${S}`
	: AppRoutes[S][T] extends { responseType: infer D } ?
	D
	//@ts-ignore
	: `query is missing responseType from ${T} in api scope ${S}`;

// export type MyResponseType<S extends keyof RoutesMapping, T extends keyof RoutesMapping[S]> = RoutesMapping[S][T]["responseType"]
export type RestPayloadType<S extends keyof AppRoutes, T extends keyof AppRoutes[S]> =
	AppRoutes[S][T] extends { payloadType?: infer P } ?
	P
	: AppRoutes[S][T] extends { responseType: infer D } ?
	D :
	never;


/**
 * Change accordingly to the the server response shape
 */
export type RestApiGetResponse<T = any> = {
	count: number
	rows: T[];
}

/**
 * Change accordingly to the the server response shape
 */
export type RestApiPostResponse<T = any> = T;
// {
//   result: boolean
//   data: T
// }

/**
 * Change accordingly to the the server response shape
 */
export type RestApiDeleteResponse = {
	result: boolean
}




/**
 * INTEGRATION WITH THIRD PARTY LIBRARIES
 */


export interface NestCrudResponseTypes<T> {
	getMany: { rows: T[], count: number, total: number, page: number, pageCount: number },
	getOne: T,
	saveOnePayload: T,
	saveOneResponse: T,
	saveManyPayload: { bulk: T[] },
	saveManyResponse: T[],
	deleteManyPayload: any,
	RestApiDeeResponse: any
}

export type NestModelRoute<T extends keyof RoutesModelMapping, BasePath extends string | unknown = unknown> = ModelRoutes<T, BasePath, NestCrudResponseTypes<RoutesModelMapping[T]>>	