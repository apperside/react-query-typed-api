import { MutationObserverOptions, QueryObserverOptions, useQueryClient } from "react-query";
import { Updater } from "react-query/types/core/utils";
import { AppQueryOptions } from ".";
import { AppRoutes, RestPayloadType, RestResponseType } from "../networking";
import { appQueryBuilder } from "./appQueryBuilder";


/**
 * WHY THIS UGLY TYPES ARE HERE
 * This types are here because if we wrote the generic types inline with the function, rollup (but also tsc) was replacing 
 * 
 * S extends keyof AppRoutes = "main"
 * 
 * with 
 * 
 * S extends "main" = "main"
 * 
 * because AppRoutes in this lib has only the "main" key, but that interface is to be augmented so it wasn't suitable.
 * 
 * Bu
 */


/**
 * The function type used by most of the functions
 */
type FunctionWithTypedRouteAndOptions<ReturnType = any> = <S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(routeOrRouteObj: T | { scope: S, route: T },
	appQueryOptions?: Partial<AppQueryOptions>) => ReturnType;

/**
 * This type is like the previous one but it returns the type mapped by the route
 */
type FunctionWithMappedReturnType = <S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(routeOrRouteObj: T | { scope: S, route: T },
	appQueryOptions?: Partial<AppQueryOptions>) => Promise<RestResponseType<S, T>>;

/**
* This type is is only needed for setQueryDefaults because it needs queryObserverOptions
*/
type SetQueryDefaultsFunction = <S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(routeOrRouteObj: T | { scope: S, route: T },
	appQueryOptions?: Partial<AppQueryOptions>, queryObserverOptions?: QueryObserverOptions<any, any, any, any>) => void

/**
* This type is is only needed for setMutationDefaults because it needs mutationObserverOptions
*/
type SetMutationDefaultsFunction = <S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(routeOrRouteObj: T | { scope: S, route: T },
	appQueryOptions?: Partial<AppQueryOptions>, mutationObserverOptions?: MutationObserverOptions<any, any, any, any>) => void

/**
 * This type only needed for setQueryData because it needs the updater param
 */
type SetQueryDataFunction = <S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(
	routeOrRouteObj: T | { scope: S, route: T },
	updater: Updater<RestResponseType<S, T>, RestResponseType<S, T>>, appQueryOptions?: Partial<AppQueryOptions>,) => RestResponseType<S, T>

/**
* This type only needed for executeMutation because it returns mutation mapped return type
*/
type ExecuteMutationFunction = <S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(routeOrRouteObj: T | { scope: S, route: T },
	appQueryOptions?: Partial<AppQueryOptions<RestPayloadType<S, T>>>) => Promise<RestResponseType<S, T, "mutation">>;

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
	// 	return queryClient.getQueriesData<RestResponseType<S, T>>(keyForUseQuery)
	// }
	const setQueryData: SetQueryDataFunction = (routeOrRouteObj, updater, appQueryOptions = {}) => {
		const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);
		return queryClient.setQueryData(keyForUseQuery, updater as any)
	}
	// function setQueriesData <S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(routeOrRouteObj: T | { scope: S, route: T },
	// 	updater?: Updater<RestResponseType<S, T>, RestResponseType<S, T>>,
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
