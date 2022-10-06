/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { AppQueryOptions } from ".";
import { AppRoutes } from "..";
import { appQueryKeyBuilder } from "./appQueryKeyBuilder";

export function useQueryKeyBuilder<
  Scope extends keyof AppRoutes = "main",
  T extends keyof AppRoutes[Scope] = keyof AppRoutes[Scope]
>(
  routeOrRouteObj: T | { scope: Scope; route: T },
  appQueryOptions: Partial<AppQueryOptions> = {}
): any {
  const result = useMemo(() => {
    return appQueryKeyBuilder(routeOrRouteObj, appQueryOptions);
  }, [appQueryOptions, routeOrRouteObj]);

  return result;
}
