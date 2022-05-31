/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutationKey, useMutation, UseMutationOptions, UseMutationResult, useQueryClient } from "react-query";
import { AppQueryOptions } from ".";
import { AppRoutes, ApiPayloadType, ApiResponseType, ApiRoute } from "..";
import { httpPost } from "../imperative";
import { appQueryBuilder } from "./appQueryBuilder";
/**
 * 
 * @param routeOrRouteObj a route from AppRoutes or an object with a scope and a route
* @param appQueryOptions http options for the query. Path params is needed to replace path variables
 * @param mutationOptions react-query's mutation options
 * @returns 
 */
export function useAppMutation<Scope extends keyof AppRoutes = "main", Route extends ApiRoute<Scope> = ApiRoute<Scope>>
	(routeOrRouteObj: Route | { scope: Scope, route: Route }, appQueryOptions: Partial<Omit<AppQueryOptions<ApiPayloadType<Scope, Route>>, "apiScope">> = {},
		mutationOptions: UseMutationOptions = {}
	): UseMutationResult<ApiResponseType<Scope, Route, "mutation">, any, (ApiPayloadType<Scope, Route> & { _pathParams?: { [key: string]: any } }), any> {

	const queryClient = useQueryClient();
	const keyForUseQuery = appQueryBuilder(routeOrRouteObj, appQueryOptions);// any = [route, typeof queryOptions.query === "string" ? queryOptions.query : { ...queryOptions.query }];


	/**
	 * _pathParams is used to replace the url path variables.
	 * It has been put here because by default react query allows you to add extra data to mutateFn only when you call useMutation
	 * and not when you call mutate or mutateAsync.
	 * Sometimes may be tricky to have pathParams at the moment you call useMutation, so this has been added here for conveniece.
	 * It has been prefixed with underscore here (and no in useAppMutation) to allow the case in which the final user needs to send a property called pathParams 
	 * in the request payload.
	 * If you need to send a post request with a _pathParams property, it will not work
	 */
	return useMutation<ApiResponseType<Scope, Route, "mutation">, any, (ApiPayloadType<Scope, Route> & { _pathParams?: { [key: string]: any } }), any>(keyForUseQuery as MutationKey, ({ _pathParams, ...params }: any) => {
		console.log("options", appQueryOptions)
		console.log("params", params, _pathParams)
		// const finalRoute = (routeOrRouteObj as string).split("/")
		// 	.map((part) => {
		// 		if (part.startsWith(":")) {
		// 			const finalPart = part.substring(1);
		// 			const pathParam = _pathParams?.[finalPart] ?? appQueryOptions.pathParams?.[finalPart];
		// 			if (!pathParam) {
		// 				console.warn("you are missing a path param for route", routeOrRouteObj)
		// 				return undefined;
		// 			}
		// 			return pathParam
		// 		}
		// 		return part;
		// 	})
		// 	.join("/");
		// const { pathParams, ...restOfAppQueryOptions } = appQueryOptions;
		return httpPost(routeOrRouteObj as any, { payload: params, ...appQueryOptions, pathParams: _pathParams ?? appQueryOptions.pathParams }) as Promise<ApiResponseType<Scope, Route, "mutation">>

	}, {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		onSuccess: (data: any, variables: any, context: any) => {
			queryClient.invalidateQueries({ queryKey: routeOrRouteObj as any });
			mutationOptions.onSuccess?.(data, variables, context)
			// return true;
		},
		...mutationOptions,
	});


}

