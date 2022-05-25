/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult } from "react-query";
import { AppQueryOptions } from ".";
import { AppRoutes, ApiResponseType, ApiRoute } from "..";
import { httpGet } from "../imperative"

export function useInfiniteAppQuery<Scope extends keyof AppRoutes = "main", Route extends ApiRoute<Scope> = ApiRoute<Scope>>
	(routeOrRouteObj: Route | { scope: Scope, route: Route },
		appQueryOptions: Partial<AppQueryOptions> = {},
		useQueryOptions: UseInfiniteQueryOptions = {})
	: UseInfiniteQueryResult<ApiResponseType<Scope, Route>> {

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

	type RES = ApiResponseType<Scope, Route>
	return useInfiniteQuery<RES>(keyForUseQuery, (params: any) => {
		return httpGet(routeOrRouteObj, { ...appQueryOptions }) as Promise<RES>
	}, useQueryOptions as any);

}
