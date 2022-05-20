/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppQueryOptions } from ".";
import { AppRoutes } from "..";

export function appQueryBuilder<S extends keyof AppRoutes = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>
	(routeOrRouteObj: T | { scope: S, route: T },
		appQueryOptions: Partial<AppQueryOptions> = {})
	: any {

	const keyForUseQuery: any[] = [routeOrRouteObj];

	if (appQueryOptions.query) {
		const itemToPush = typeof appQueryOptions.query === "string" ? appQueryOptions.query : { ...appQueryOptions.query }
		keyForUseQuery.push(itemToPush)
	}


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

	return keyForUseQuery;

}
