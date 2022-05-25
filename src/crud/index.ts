

type BasePath<T extends string | unknown = unknown> = `${T extends string ? T : ""}${T extends string ? "/" : ""}`
type AllRoutes<S extends string, Prefix extends string | unknown = unknown> =
	`${BasePath<Prefix>}${S}` |
	`${BasePath<Prefix>}${S}/:id` |
	`${BasePath<Prefix>}${S}/bulk-delete/:ids` |
	`${BasePath<Prefix>}${S}/bulk`



/**
 * This interface allows you to define all your CRUD resources and the name to use to those resources in the api urls.
 * This interface need to be augmented with key-value pairs where the key is the name of the resource and the value is the
 * type of the resource.
 * @example
 * ```typescript
 * 	type MyType1={field1:string}
 * 	type MyType2={field2:number}
 * 
 *	export interface RoutesModelMapping {
 *		myroute1: MyType1
 *		myroute2: MyType2	
 *	}
 * ```
 * 
 */
export interface RoutesModelMapping {

	//to be augmented, put here all the mappings between your routes and models
}

type CrudActionsDataMapping = {
	getManyResponse?: any
	getOneResponse?: any
	saveOnePayload?: any
	saveOneResponse?: any
	saveManyPayload?: any
	saveManyResponse?: any
	deleteManyResponse?: any
	deleteManyPayload?: any
}

/**
 * Default response type for getMany request
 */
export interface DefaultGetManyResponse<T> {
	rows: T[];
	count: number
	page: number
}

/**
 * Default response type for getOne request
 */
export type DefaultGetOneResponse<T> = T

/**
 * Default payload type for saveOne request
 */
export interface DefaultSaveOnePayload<T> {
	item: T
}

/**
 * Default payload type for saveMany request
 */
export interface DefaultSaveManyPayload<T> {
	items: T[];
}

/**
 * Default response type for saveOne request
 */
export type DefaultSaveOneResponse<T> = T;

/**
 * Default payload type for deleteMany request
 */
export type DefaultDeleteManyPayload<T> = T

/**
 * Default response type for deleteMany request
 */
export type DefaultDeleteManyResponse<T> = T


export type RoutesForModel<CrudModel extends keyof RoutesModelMapping, BasePath extends string | unknown = unknown,
	R extends CrudActionsDataMapping = {
		getManyResponse?: DefaultGetManyResponse<RoutesModelMapping[CrudModel]>
		getOneResponse?: DefaultGetOneResponse<RoutesModelMapping[CrudModel]>
		saveOnePayload?: DefaultSaveOnePayload<RoutesModelMapping[CrudModel]>
		saveOneResponse?: DefaultGetOneResponse<RoutesModelMapping[CrudModel]>
		saveManyPayload?: DefaultSaveManyPayload<RoutesModelMapping[CrudModel]>
		saveManyResponse?: DefaultGetManyResponse<RoutesModelMapping[CrudModel]>
	}> = {
		[key in AllRoutes<CrudModel, BasePath>]: key extends `${string}/bulk` ? {
			responseType: R["saveManyResponse"] extends undefined ? DefaultGetManyResponse<RoutesModelMapping[CrudModel]> : R["saveManyResponse"]
			payloadType: R["saveManyPayload"] extends undefined ? DefaultSaveManyPayload<RoutesModelMapping[CrudModel]> : R["saveManyPayload"]
		} : key extends `${string}/:id` ? {
			responseType: R["getOneResponse"] extends undefined ? DefaultGetOneResponse<RoutesModelMapping[CrudModel]> : R["getOneResponse"]
			payloadType: R["saveOnePayload"] extends undefined ? DefaultSaveOnePayload<RoutesModelMapping[CrudModel]> : R["saveOnePayload"]
		} : key extends `${string}/bulk-delete/:ids` ? {
			responseType: R["deleteManyResponse"] extends undefined ? DefaultDeleteManyResponse<RoutesModelMapping[CrudModel]> : R["deleteManyResponse"]
			payloadType: R["deleteManyPayload"] extends undefined ? DefaultDeleteManyPayload<RoutesModelMapping[CrudModel]> : R["deleteManyPayload"]
		} : key extends `${string}` ? {
			responseType: R["getManyResponse"] extends undefined ? DefaultGetManyResponse<RoutesModelMapping[CrudModel]> : R["getManyResponse"]
			payloadType: R["saveOnePayload"] extends undefined ? DefaultSaveOnePayload<RoutesModelMapping[CrudModel]> : R["saveOnePayload"];
			mutationResponseType: R["saveOneResponse"] extends undefined ? DefaultSaveOneResponse<RoutesModelMapping[CrudModel]> : R["saveOneResponse"];
		} : RoutesModelMapping[CrudModel];
	};



export interface CustomCrudRoutes {
	//to be augmented
}

export type CrudRoutes = {
	[key in keyof CustomCrudRoutes]: CustomCrudRoutes[key]
}


/**
 * INTEGRATION WITH THIRD PARTY LIBRARIES
 */
interface III {
	prova: string
}
type AAA = { [key in keyof CrudActionsDataMapping]: any }
export interface NestCrudResponseTypes<T> {
	getManyResponse: { rows: T[], count: number, total: number, page: number, pageCount: number },
	getOneResponse: T,
	saveOnePayload: T,
	saveOneResponse: T,
	saveManyPayload: { bulk: T[] },
	saveManyResponse: T[],
	deleteManyPayload: any,
	RestApiDeeResponse: any
}

export type NestJsxModelRoute<T extends keyof RoutesModelMapping, BasePath extends string | unknown = unknown> = RoutesForModel<T, BasePath, NestCrudResponseTypes<RoutesModelMapping[T]>>

/**
 * @deprecated
 * use {@link NestJsxModelRoute} instead
 */
export type NestModelRoute<T extends keyof RoutesModelMapping, BasePath extends string | unknown = unknown> = NestJsxModelRoute<T, BasePath>