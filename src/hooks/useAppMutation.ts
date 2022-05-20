/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutationKey, useMutation, UseMutationOptions, UseMutationResult, useQueryClient } from "react-query";
import { AppQueryOptions } from ".";
import { ApiScope, RestApiRoute, RestPayloadType, httpPost, RestResponseType, AppRoutes } from "..";

/**
 * 
 * @param route a route from AppRoutes or an object with a scope and a route
* @param queryOptions http options for the query. Path params is needed to replace path variables
 * @param mutationOptions react-query's mutation options
 * @returns 
 */
export function useAppMutation<S extends ApiScope = "main", T extends keyof AppRoutes[S] = keyof AppRoutes[S]>(
	route: T | { scope: S, route: RestApiRoute<S> }, queryOptions: Partial<Omit<AppQueryOptions<RestPayloadType<S, T>>, "apiScope">> = {},
	mutationOptions: UseMutationOptions = {}
): UseMutationResult<RestResponseType<S, T, "mutation">, any, (RestPayloadType<S, T> & { _pathParams?: { [key: string]: any } }), any> {
	const queryClient = useQueryClient();
	const keyForUseQuery: any = [route, typeof queryOptions.query === "string" ? queryOptions.query : { ...queryOptions.query }];
	const { extraRoutePath } = queryOptions
	if (extraRoutePath) {
		if (typeof extraRoutePath === "object") {
			keyForUseQuery.concat([...extraRoutePath])
		}
		else {
			keyForUseQuery.push(extraRoutePath)
		}
	}


	/**
	 * _pathParams is used to replace the url path variables.
	 * It has been put here because by default react query allows you to add extra data to mutateFn only when you call useMutation
	 * and not when you call mutate or mutateAsync.
	 * Sometimes may be tricky to have pathParams at the moment you call useMutation, so this has been added here for conveniece.
	 * It has been prefixed with underscore here (and no in useAppMutation) to allow the case in which the final user needs to send a property called pathParams 
	 * in the request payload.
	 * If you need to send a post request with a _pathParams property, it will not work
	 */
	return useMutation<RestResponseType<S, T, "mutation">, any, (RestPayloadType<S, T> & { _pathParams?: { [key: string]: any } }), any>(keyForUseQuery as MutationKey, ({ _pathParams, ...params }: any) => {
		console.log("options", queryOptions)
		console.log("params", params, _pathParams)
		const finalRoute = (route as string).split("/")
			.map((part) => {
				if (part.startsWith(":")) {
					const finalPart = part.substring(1);
					const pathParam = _pathParams?.[finalPart] ?? queryOptions.pathParams?.[finalPart];
					if (!pathParam) {
						console.warn("you are missing a path param for route", route)
						return undefined;
					}
					return pathParam
				}
				return part;
			})
			.join("/");
		return httpPost(finalRoute as any, { payload: params, ...queryOptions }) as Promise<RestResponseType<S, T, "mutation">>

	}, {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		onSuccess: (data: any, variables: any, context: any) => {
			queryClient.invalidateQueries({ queryKey: route as any });
			mutationOptions.onSuccess?.(data, variables, context)
			// return true;
		},
		...mutationOptions,
	});


}

