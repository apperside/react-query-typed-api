import { UseQueryResult, UseQueryOptions } from "react-query"
import { AppRoutes, ApiResponseType, AppQueryOptions, useAppQuery } from ".."

type AppQueryProps<Scope extends keyof AppRoutes = "main", T extends keyof AppRoutes[Scope] = keyof AppRoutes[Scope]> = {
	children: (query: UseQueryResult<ApiResponseType<Scope, T>>) => JSX.Element | null
	routeOrRouteObj: T | { scope: Scope, route: T },
	appQueryOptions?: Partial<Omit<AppQueryOptions, "payload" | "apiScope">>,
	useQueryOptions?: UseQueryOptions
}
export function AppQuery<Scope extends keyof AppRoutes = "main", T extends keyof AppRoutes[Scope] = keyof AppRoutes[Scope]>(props: AppQueryProps<Scope, T>): JSX.Element | null {

	const query = useAppQuery(props.routeOrRouteObj, props.appQueryOptions, props.useQueryOptions)
	return props.children(query)
}

export default AppQuery;