/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { AppQueryOptions } from ".";
import { AppRoutes } from "..";
import { appQueryKeyBuilder } from "./appQueryKeyBuilder";

export function useQueryKeyBuilder<
  Scope extends keyof AppRoutes = "main",
  T extends keyof AppRoutes[Scope] = keyof AppRoutes[Scope]
>(
  routeOrRouteObj: T | { scope: Scope; route: T },
  appQueryOptions: Partial<AppQueryOptions> = {},
  useQueryOptions: UseQueryOptions | UseMutationOptions = {}
): any {
  const result = useMemo(() => {
    if ((useQueryOptions as any).queryKey) {
      return (useQueryOptions as any).queryKey;
    } else if ((useQueryOptions as any).mutationKey) {
      return (useQueryOptions as any).mutationKey;
    }
    return appQueryKeyBuilder(routeOrRouteObj, appQueryOptions);
  }, [appQueryOptions, routeOrRouteObj, useQueryOptions]);

  return result;
}
