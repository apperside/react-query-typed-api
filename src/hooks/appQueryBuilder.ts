/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppQueryOptions } from ".";
import { AppRoutes } from "..";

export function appQueryBuilder<Scope extends keyof AppRoutes = "main", T extends keyof AppRoutes[Scope] = keyof AppRoutes[Scope]>
	(routeOrRouteObj: T | { scope: Scope, route: T },
		appQueryOptions: Partial<AppQueryOptions> = {})
	: any {

	const keyForUseQuery: any[] = [routeOrRouteObj];

	const { extraRoutePath, query, pathParams } = appQueryOptions
	if (extraRoutePath) {
		if (typeof extraRoutePath === "object") {
			keyForUseQuery.push([...extraRoutePath])
		}
		else {
			keyForUseQuery.push(extraRoutePath)
		}
	}
	if (pathParams) {
		keyForUseQuery.push(pathParams)
	}
	if (query) {
		const itemToPush = typeof query === "string" ? query : { ...query }
		keyForUseQuery.push(itemToPush)
	}
	return keyForUseQuery;

}
