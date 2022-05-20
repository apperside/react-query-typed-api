/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppRoutes, RestApiDeleteResponse, RestPayloadType, RestResponseType } from "..";
import { AppQueryOptions } from "..";
import apiUtils from "../helpers/apiUtils";
import { HttpMethod, httpRequest } from "./httpManager";

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

export function httpGet<S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(
	routeOrRouteObj: T | { scope: S, route: T },
	appQueryOptions?: AppQueryOptions
): Promise<RestResponseType<S, T>> {
	return performRequest("GET", routeOrRouteObj as any, appQueryOptions);
}

export function httpPost<S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(
	routeOrRouteObj: T | { scope: S, route: T },
	appQueryOptions?: AppQueryOptions<RestPayloadType<S, T>>
): Promise<RestResponseType<S, T, "mutation">> {
	return performRequest("POST", routeOrRouteObj as any, appQueryOptions)
}

export function httpPut<S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(
	routeOrRouteObj: T | { scope: S, route: T },
	appQueryOptions?: AppQueryOptions<RestPayloadType<S, T>>
): Promise<RestResponseType<S, T, "mutation">> {
	return performRequest("PUT", routeOrRouteObj as any, appQueryOptions);
}

export function httpPatch<S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(
	routeOrRouteObj: T | { scope: S, route: T },
	appQueryOptions?: AppQueryOptions<RestPayloadType<S, T>>
): Promise<RestResponseType<S, T, "mutation">> {
	return performRequest("PATCH", routeOrRouteObj as any, appQueryOptions);
}

export function httpDelete<S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(
	routeOrRouteObj: T | { scope: S, route: T },
	appQueryOptions?: AppQueryOptions<RestPayloadType<S, T>>
): Promise<RestApiDeleteResponse> {
	return performRequest("DELETE", routeOrRouteObj as any, appQueryOptions);
}
