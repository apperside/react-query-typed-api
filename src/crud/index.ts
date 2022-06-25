

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


/**
 * This is the type which defines the payloads and responses for the CRUD actions.
 */
type CrudActionsDataMapping = {
	getManyResponse?: unknown
	getOneResponse?: unknown
	saveOnePayload?: unknown
	saveOneResponse?: unknown
	saveManyPayload?: unknown
	saveManyResponse?: unknown
	deleteManyResponse?: unknown
	deleteManyPayload?: unknown
}

/**
 * Default response type for getMany request
 */
export type DefaultGetManyResponse<T> = {
	/**
	 * The rows for the request
	 */
	rows: T[];
	/**
	 * total rows count (useful for pagination)
	 */
	count: number
	/**
	 * the current page (in case of paginated result)
	 */
	page: number
}

/**
 * Default response type for getOne request
 */
export type DefaultGetOneResponse<T> = T

/**
 * Default payload type for saveOne request
 */
export type DefaultSaveOnePayload<T> = {
	/**
	 * The item to save
	 */
	item: T
}

/**
 * Default payload type for saveMany request
 */
export type DefaultSaveManyPayload<T> = {
	/**
	 * The items to save
	 */
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

/**
 * This interface is used to add a set of crud endpoints for a given model.
 * For more information about CRUD endpoints, see the [dedicated section](/docs/usage/crud) in the docs
 * @typeParam CrudModel one of the keys in {@link RoutesModelMapping}
 * @typeParam BasePath this parameter is used to manipulate the endpoint url.<br/>
 * The value you will put here will be added after the 
 * api base url you provided in the [initApi](/docs/api/modules#initapi) function call and before the resource name.
 * For example, if you base api url is http://localhost:8080/api and your resource name is `resource1`, and you pass
 * `custom-path` to this type param, the final endpoint will be http://localhost:8080/api/custom-path/resource1 
 * @typeParam ActionTypesMapping this parameter is used to manipulate the type of the payloads and responses for the crud endpoints.
 * See the [dedicated section](/docs/usage/crud#data-types-customization) for more information.
 */
export type RoutesForModel<CrudModel extends keyof RoutesModelMapping, BasePath extends string | unknown = unknown, ActionTypesMapping extends CrudActionsDataMapping = {
	getManyResponse: DefaultGetManyResponse<RoutesModelMapping[CrudModel]>;
	getOneResponse: DefaultGetOneResponse<RoutesModelMapping[CrudModel]>;
	saveOnePayload: DefaultSaveOnePayload<RoutesModelMapping[CrudModel]>;
	saveOneResponse: DefaultGetOneResponse<RoutesModelMapping[CrudModel]>;
	saveManyPayload: DefaultSaveManyPayload<RoutesModelMapping[CrudModel]>;
	saveManyResponse: DefaultGetManyResponse<RoutesModelMapping[CrudModel]>;
}> = {
		[key in AllRoutes<CrudModel, BasePath>]: key extends `${string}/bulk` ? {
			responseType: ActionTypesMapping["saveManyResponse"] extends Record<string, any> ? ActionTypesMapping["saveManyResponse"] : DefaultGetManyResponse<RoutesModelMapping[CrudModel]>;
			payloadType: ActionTypesMapping["saveManyPayload"] extends Record<string, any> ? ActionTypesMapping["saveManyPayload"] : DefaultSaveManyPayload<RoutesModelMapping[CrudModel]>;
		} : key extends `${string}/:id` ? {
			responseType: ActionTypesMapping["getOneResponse"] extends Record<string, any> ? ActionTypesMapping["getOneResponse"] : DefaultGetOneResponse<RoutesModelMapping[CrudModel]>;
			payloadType: ActionTypesMapping["saveOnePayload"] extends Record<string, any> ? ActionTypesMapping["saveOnePayload"] : DefaultSaveOnePayload<RoutesModelMapping[CrudModel]>;
		} : key extends `${string}/bulk-delete/:ids` ? {
			responseType: ActionTypesMapping["deleteManyResponse"] extends Record<string, any> ? ActionTypesMapping["deleteManyResponse"] : DefaultDeleteManyResponse<RoutesModelMapping[CrudModel]>;
			payloadType: ActionTypesMapping["deleteManyPayload"] extends Record<string, any> ? ActionTypesMapping["deleteManyPayload"] : DefaultDeleteManyPayload<RoutesModelMapping[CrudModel]>;
		} : key extends `${string}` ? {
			responseType: ActionTypesMapping["getManyResponse"] extends Record<string, any> ? ActionTypesMapping["getManyResponse"] : DefaultGetManyResponse<RoutesModelMapping[CrudModel]>;
			payloadType: ActionTypesMapping["saveOnePayload"] extends Record<string, any> ? ActionTypesMapping["saveOnePayload"] : DefaultSaveOnePayload<RoutesModelMapping[CrudModel]>;
			mutationResponseType: ActionTypesMapping["saveOneResponse"] extends Record<string, any> ? ActionTypesMapping["saveOneResponse"] : DefaultSaveOneResponse<RoutesModelMapping[CrudModel]>;
		} : RoutesModelMapping[CrudModel];
	};


/**
 * This interface needs to be augmented, for more info on how to do it se the [dedicated section](/docs/usage/crud#usage)
 */
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