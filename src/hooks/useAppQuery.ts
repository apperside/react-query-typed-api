/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { AppQueryOptions } from ".";
import { AppRoutes, httpGet, RestResponseType } from "../networking";
import { appQueryBuilder } from "./appQueryBuilder";

export function useAppQuery<S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>
	(routeOrRouteObj: T | { scope: S, route: T },
		appQueryOptions: Partial<AppQueryOptions> = {},
		useQueryOptions: UseQueryOptions = {})
	: UseQueryResult<RestResponseType<S, T>> {

	const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);

	type RES = RestResponseType<S, T>
	return useQuery<RES>(keyForUseQuery, (params: any) => {
		return httpGet(routeOrRouteObj, { ...appQueryOptions }) as Promise<RES>
	}, useQueryOptions as any);

}
