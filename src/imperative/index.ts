/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppRoutes, ApiPayloadType, ApiResponseType } from "..";
import { AppQueryOptions } from "..";
import apiUtils from "../helpers/apiUtils";
import { HttpMethod, httpRequest } from "../networking/httpManager";

function performRequest(method: HttpMethod, routeOrRouteObj: string | { scope: string, route: string }, appQueryOptions?: AppQueryOptions) {
	const _route = apiUtils.replacePathVariables(routeOrRouteObj, appQueryOptions);
	const url = apiUtils.buildUrl(_route as any, appQueryOptions)
	return httpRequest({
		method,
		url,
		apiScope: (routeOrRouteObj as any).scope ?? "main",
		...appQueryOptions
	});
}

/**
 * 
 * @param routeOrRouteObj A string or an object containig  a key of {@link AppRoutes} containing the parameter. 
 * @param appQueryOptions 
 * @returns 
 */
export function httpGet<Scope extends keyof AppRoutes = "main", Route extends keyof AppRoutes[Scope] = keyof AppRoutes[Scope]>(
	routeOrRouteObj: Route | { scope: Scope, route: Route },
	appQueryOptions?: AppQueryOptions
): Promise<ApiResponseType<Scope, Route>> {
	return performRequest("GET", routeOrRouteObj as any, appQueryOptions);
}

export function httpPost<Scope extends keyof AppRoutes = "main", Route extends keyof AppRoutes[Scope] = keyof AppRoutes[Scope]>(
	routeOrRouteObj: Route | { scope: Scope, route: Route },
	appQueryOptions?: AppQueryOptions<ApiPayloadType<Scope, Route>>
): Promise<ApiResponseType<Scope, Route, "mutation">> {
	return performRequest("POST", routeOrRouteObj as any, appQueryOptions)
}

export function httpPut<Scope extends keyof AppRoutes = "main", Route extends keyof AppRoutes[Scope] = keyof AppRoutes[Scope]>(
	routeOrRouteObj: Route | { scope: Scope, route: Route },
	appQueryOptions?: AppQueryOptions<ApiPayloadType<Scope, Route>>
): Promise<ApiResponseType<Scope, Route, "mutation">> {
	return performRequest("PUT", routeOrRouteObj as any, appQueryOptions);
}

export function httpPatch<Scope extends keyof AppRoutes = "main", Route extends keyof AppRoutes[Scope] = keyof AppRoutes[Scope]>(
	routeOrRouteObj: Route | { scope: Scope, route: Route },
	appQueryOptions?: AppQueryOptions<ApiPayloadType<Scope, Route>>
): Promise<ApiResponseType<Scope, Route, "mutation">> {
	return performRequest("PATCH", routeOrRouteObj as any, appQueryOptions);
}

export function httpDelete<Scope extends keyof AppRoutes = "main", Route extends keyof AppRoutes[Scope] = keyof AppRoutes[Scope]>(
	routeOrRouteObj: Route | { scope: Scope, route: Route },
	appQueryOptions?: AppQueryOptions<ApiPayloadType<Scope, Route>>
): Promise<{ result: boolean }> {
	return performRequest("DELETE", routeOrRouteObj as any, appQueryOptions);
}
