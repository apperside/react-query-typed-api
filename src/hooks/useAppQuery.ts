/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { AppQueryOptions } from ".";
import { ApiResponseType, ApiRoute, AppRoutes } from "..";
import { httpGet } from "../imperative";
import { useQueryKeyBuilder } from "./useQueryKeyBuilder";

/**
 * Alias for array
 *
 * @typeParam Scope - One of the keys of {@link AppRoutes}
 */
export function useAppQuery<
  Scope extends keyof AppRoutes = "main",
  Route extends ApiRoute<Scope> = ApiRoute<Scope>
>(
  routeOrRouteObj: Route | { scope: Scope; route: Route },
  appQueryOptions: Partial<Omit<AppQueryOptions, "payload" | "apiScope">> = {},
  useQueryOptions: UseQueryOptions = {}
): UseQueryResult<ApiResponseType<Scope, Route>> {
  const keyForUseQuery = useQueryKeyBuilder(
    routeOrRouteObj,
    appQueryOptions,
    useQueryOptions
  );

  type RES = ApiResponseType<Scope, Route>;
  return useQuery<RES>(
    keyForUseQuery,
    (params: any) => {
      return httpGet(routeOrRouteObj, { ...appQueryOptions }) as Promise<RES>;
    },
    useQueryOptions as any
  );
}
