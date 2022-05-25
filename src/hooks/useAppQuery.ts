/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { AppQueryOptions } from ".";
import { AppRoutes, ApiResponseType } from "..";
import { appQueryBuilder } from "./appQueryBuilder";
import { httpGet } from "../imperative"

/**
 * Alias for array
 *
 * @typeParam Scope - One of the keys of {@link AppRoutes}
 */
export function useAppQuery<Scope extends keyof AppRoutes = "main", T extends keyof AppRoutes[Scope] = keyof AppRoutes[Scope]>
	(routeOrRouteObj: T | { scope: Scope, route: T },
		appQueryOptions: Partial<Omit<AppQueryOptions, "payload" | "apiScope">> = {},
		useQueryOptions: UseQueryOptions = {})
	: UseQueryResult<ApiResponseType<Scope, T>> {

	const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);

	type RES = ApiResponseType<Scope, T>
	return useQuery<RES>(keyForUseQuery, (params: any) => {
		return httpGet(routeOrRouteObj, { ...appQueryOptions }) as Promise<RES>
	}, useQueryOptions as any);

}
