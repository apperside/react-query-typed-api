/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult } from "react-query";
import { AppQueryOptions } from ".";
import { AppRoutes, httpGet, RestResponseType } from "..";

export function useInfiniteAppQuery<S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>
	(routeOrRouteObj: T | { scope: S, route: T },
		appQueryOptions: Partial<AppQueryOptions> = {},
		useQueryOptions: UseInfiniteQueryOptions = {})
	: UseInfiniteQueryResult<RestResponseType<S, T>> {

	const keyForUseQuery: any = [routeOrRouteObj, typeof appQueryOptions.query === "string" ? appQueryOptions.query : { ...appQueryOptions.query }];

	const { extraRoutePath, query, pathParams } = appQueryOptions
	if (extraRoutePath) {
		if (typeof extraRoutePath === "object") {
			keyForUseQuery.concat([...extraRoutePath])
		}
		else {
			keyForUseQuery.push(extraRoutePath)
		}
	}
	if (query) {
		keyForUseQuery.push(query)
	}
	if (pathParams) {
		keyForUseQuery.push(pathParams)
	}

	type RES = RestResponseType<S, T>
	return useInfiniteQuery<RES>(keyForUseQuery, (params: any) => {
		return httpGet(routeOrRouteObj, { ...appQueryOptions }) as Promise<RES>
	}, useQueryOptions as any);

}
