/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppRoutes, RestApiDeleteResponse, RestPayloadType, RestResponseType } from ".";
import { AppQueryOptions } from "..";
import apiUtils from "./apiUtils";
import { httpRequest } from "./httpManager";

const getRoute = (routeOrRouteObj: any | { scope: any, route: any }, restOptions?: AppQueryOptions): string => {
	const _route = (routeOrRouteObj as any)?.route ?? routeOrRouteObj
	return (_route as string)?.split("/")
		.map((part) => {
			if (restOptions && part.startsWith(":")) {
				return restOptions.pathParams?.[part.substr(1)]
			}
			return part;
		})
		.join("/");

}

export function httpGet<S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(
	routeOrRouteObj: T | { scope: S, route: T },
	restOptions?: AppQueryOptions
): Promise<RestResponseType<S, T>> {
	const _route = getRoute(routeOrRouteObj, restOptions);
	const url = apiUtils.buildUrl(_route as any, restOptions)
	return httpRequest({
		method: "GET",
		url,
		apiScope: (routeOrRouteObj as any).scope ?? "main",
		...restOptions
	});
}
/**
 * @deprecated use httpGet instead
 */
export const restGet = httpGet;

export function httpPost<S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(
	routeOrRouteObj: T | { scope: S, route: T },
	restOptions?: AppQueryOptions<RestPayloadType<S, T>>
): Promise<RestResponseType<S, T, "mutation">> {
	const _route = getRoute(routeOrRouteObj, restOptions);
	const url = apiUtils.buildUrl(_route as any, restOptions)
	return httpRequest({
		method: "POST",
		url,
		apiScope: (routeOrRouteObj as any).scope ?? "main",
		...restOptions
	});
}
/**
 * @deprecated use httpPost instead
 */
export const restPost = httpPost;


export function httpPut<S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(
	routeOrRouteObj: T | { scope: S, route: T },
	restOptions?: AppQueryOptions<RestPayloadType<S, T>>
): Promise<RestResponseType<S, T, "mutation">> {
	const _route = getRoute(routeOrRouteObj, restOptions);
	const url = apiUtils.buildUrl(_route as any, restOptions)
	return httpRequest({
		method: "PUT",
		url,
		apiScope: (routeOrRouteObj as any).scope ?? "main",
		...restOptions
	});
}
/**
 * @deprecated use httpPut instead
 */
export const restPut = httpPut;


export function httpPatch<S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(
	routeOrRouteObj: T | { scope: S, route: T },
	restOptions?: AppQueryOptions<RestPayloadType<S, T>>
): Promise<RestResponseType<S, T, "mutation">> {
	const _route = getRoute(routeOrRouteObj, restOptions);
	const url = apiUtils.buildUrl(_route as any, restOptions)
	return httpRequest({
		method: "PATCH",
		url,
		apiScope: (routeOrRouteObj as any).scope ?? "main",
		...restOptions
	});
}
/**
 * @deprecated use httpPatch instead
 */
export const restPatch = httpPatch;


export function httpDelete<S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(
	routeOrRouteObj: T | { scope: S, route: T },
	restOptions?: AppQueryOptions<RestPayloadType<S, T>>
): Promise<RestApiDeleteResponse> {
	const _route = getRoute(routeOrRouteObj, restOptions);
	const url = apiUtils.buildUrl(_route as any, restOptions)
	return httpRequest({
		method: "DELETE",
		url,
		apiScope: (routeOrRouteObj as any).scope ?? "main",
		...restOptions
	});
}
/**
 * @deprecated use httpDelete instead
 */
export const restDelete = httpDelete;
