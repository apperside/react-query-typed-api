import { MutationObserverOptions, QueryObserverOptions, useQueryClient } from "react-query";
import { Updater } from "react-query/types/core/utils";
import { AppQueryOptions } from ".";
import { AppRoutes, ApiPayloadType, ApiResponseType } from "..";
import { appQueryBuilder } from "./appQueryBuilder";


/**
 * WHY THIS UGLY TYPES ARE HERE
 * This types are here because if we wrote the generic types inline with the function, rollup (but also tsc) was replacing 
 * 
 * Scope extends keyof AppRoutes = "main"
 * 
 * with 
 * 
 * Scope extends "main" = "main"
 * 
 * because AppRoutes in this lib has only the "main" key, but that interface is to be augmented so it wasn't suitable.
 * 
 * Bu
 */


/**
 * The function type used by most of the functions
 */
export type FunctionWithTypedRouteAndOptions<ReturnType = any> = <Scope extends keyof AppRoutes = "main", Route extends keyof AppRoutes[Scope] = keyof AppRoutes[Scope]>(routeOrRouteObj: Route | { scope: Scope, route: Route },
	appQueryOptions?: Partial<AppQueryOptions>) => ReturnType;

/**
 * This type is like the previous one but it returns the type mapped by the route
 */
export type FunctionWithMappedReturnType = <Scope extends keyof AppRoutes = "main", Route extends keyof AppRoutes[Scope] = keyof AppRoutes[Scope]>(routeOrRouteObj: Route | { scope: Scope, route: Route },
	appQueryOptions?: Partial<AppQueryOptions>) => Promise<ApiResponseType<Scope, Route>>;

/**
* This type is is only needed for setQueryDefaults because it needs queryObserverOptions
*/
export type SetQueryDefaultsFunction = <Scope extends keyof AppRoutes = "main", Route extends keyof AppRoutes[Scope] = keyof AppRoutes[Scope]>(routeOrRouteObj: Route | { scope: Scope, route: Route },
	appQueryOptions?: Partial<AppQueryOptions>, queryObserverOptions?: QueryObserverOptions<any, any, any, any>) => void

/**
* This type is is only needed for setMutationDefaults because it needs mutationObserverOptions
*/
export type SetMutationDefaultsFunction = <Scope extends keyof AppRoutes = "main", Route extends keyof AppRoutes[Scope] = keyof AppRoutes[Scope]>(routeOrRouteObj: Route | { scope: Scope, route: Route },
	appQueryOptions?: Partial<AppQueryOptions>, mutationObserverOptions?: MutationObserverOptions<any, any, any, any>) => void

/**
 * This type only needed for setQueryData because it needs the updater param
 */
export type SetQueryDataFunction = <Scope extends keyof AppRoutes = "main", Route extends keyof AppRoutes[Scope] = keyof AppRoutes[Scope]>(
	routeOrRouteObj: Route | { scope: Scope, route: Route },
	updater: Updater<ApiResponseType<Scope, Route>, ApiResponseType<Scope, Route>>, appQueryOptions?: Partial<AppQueryOptions>,) => ApiResponseType<Scope, Route>

/**
* This type only needed for executeMutation because it returns mutation mapped return type
*/
export type ExecuteMutationFunction = <Scope extends keyof AppRoutes = "main", Route extends keyof AppRoutes[Scope] = keyof AppRoutes[Scope]>(routeOrRouteObj: Route | { scope: Scope, route: Route },
	appQueryOptions?: Partial<AppQueryOptions<ApiPayloadType<Scope, Route>>>) => Promise<ApiResponseType<Scope, Route, "mutation">>;

export function useAppQueryClient() {

	const queryClient = useQueryClient();

	const invalidateAppQueries: FunctionWithTypedRouteAndOptions<Promise<void>> = (routeOrRouteObj, appQueryOptions) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.invalidateQueries(keyForUseQuery)
	}

	const refetchAppQueries: FunctionWithTypedRouteAndOptions<Promise<void>> = (routeOrRouteObj, appQueryOptions) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.refetchQueries(keyForUseQuery)
	}

	const isFetching: FunctionWithTypedRouteAndOptions<number> = (routeOrRouteObj, appQueryOptions) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.isFetching(keyForUseQuery)
	}
	const isMutating: FunctionWithTypedRouteAndOptions<number> = (routeOrRouteObj, appQueryOptions) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.isMutating(keyForUseQuery)
	}
	const getQueryData: FunctionWithMappedReturnType = (routeOrRouteObj, appQueryOptions) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.getQueryData<any>(keyForUseQuery)
	}
	// function getQueriesData <S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(routeOrRouteObj: T | { scope: S, route: T },
	// 	appQueryOptions?: Partial<AppQueryOptions> = {}) {
	// 	const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
	// 	return queryClient.getQueriesData<ApiResponseType<S, T>>(keyForUseQuery)
	// }
	const setQueryData: SetQueryDataFunction = (routeOrRouteObj, updater, appQueryOptions = {}) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.setQueryData(keyForUseQuery, updater as any)
	}
	// function setQueriesData <S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(routeOrRouteObj: T | { scope: S, route: T },
	// 	updater?: Updater<ApiResponseType<S, T>, ApiResponseType<S, T>>,
	// 	appQueryOptions?: Partial<AppQueryOptions> = {}) {
	// 	const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
	// 	return queryClient.setQueriesData(keyForUseQuery, updater as any)
	// }
	// function getQueryState <S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(routeOrRouteObj: T | { scope: S, route: T },
	// 	appQueryOptions?: Partial<AppQueryOptions> = {}) {
	// 	const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
	// 	return queryClient.getQueryState(keyForUseQuery)
	// }
	const removeQueries: FunctionWithTypedRouteAndOptions<void> = (routeOrRouteObj, appQueryOptions) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.removeQueries(keyForUseQuery)
	}
	const resetQueries: FunctionWithTypedRouteAndOptions<Promise<void>> = (routeOrRouteObj, appQueryOptions) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.resetQueries(keyForUseQuery)
	}
	const cancelQueries: FunctionWithTypedRouteAndOptions<Promise<void>> = (routeOrRouteObj, appQueryOptions) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.cancelQueries(keyForUseQuery)
	}
	const invalidateQueries: FunctionWithTypedRouteAndOptions<Promise<void>> = (routeOrRouteObj, appQueryOptions) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.invalidateQueries(keyForUseQuery)
	}
	const refetchQueries: FunctionWithTypedRouteAndOptions<Promise<void>> = (routeOrRouteObj, appQueryOptions) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.refetchQueries(keyForUseQuery)
	}
	const fetchQuery: FunctionWithMappedReturnType = (routeOrRouteObj, appQueryOptions) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.fetchQuery(keyForUseQuery)
	}
	const prefetchQuery: FunctionWithTypedRouteAndOptions<Promise<void>> = (routeOrRouteObj, appQueryOptions) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.prefetchQuery(keyForUseQuery)
	}
	const executeMutation: ExecuteMutationFunction = (routeOrRouteObj, appQueryOptions) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.executeMutation(keyForUseQuery)
	}

	const setDefaultOptions: FunctionWithTypedRouteAndOptions<void> = (routeOrRouteObj, appQueryOptions) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.setDefaultOptions(keyForUseQuery)
	}
	const setQueryDefaults: SetQueryDefaultsFunction = (routeOrRouteObj, appQueryOptions, queryObserverOptions = {}) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.setQueryDefaults(keyForUseQuery, queryObserverOptions)
	}
	const getQueryDefaults: FunctionWithTypedRouteAndOptions<QueryObserverOptions<any, any, any, any, any> | undefined> = (routeOrRouteObj, appQueryOptions) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.getQueryDefaults(keyForUseQuery)
	}
	const setMutationDefaults: SetMutationDefaultsFunction = (routeOrRouteObj, appQueryOptions = {}, mutationObserverOptions = {}) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.setMutationDefaults(keyForUseQuery, mutationObserverOptions)
	}
	const getMutationDefaults: FunctionWithTypedRouteAndOptions<MutationObserverOptions<any, any, any, any> | undefined> = (routeOrRouteObj, appQueryOptions) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.getMutationDefaults(keyForUseQuery)
	}

	return {
		invalidateAppQueries,
		refetchAppQueries,
		isFetching,
		isMutating,
		getQueryData,
		// getQueriesData,
		setQueryData,
		// setQueriesData,
		// getQueryState,
		removeQueries,
		resetQueries,
		cancelQueries,
		invalidateQueries,
		refetchQueries,
		fetchQuery,
		prefetchQuery,
		executeMutation,
		setDefaultOptions,
		setQueryDefaults,
		getQueryDefaults,
		setMutationDefaults,
		getMutationDefaults
	}

}
