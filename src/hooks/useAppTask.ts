import { useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";
import { AppTasks } from "..";
import { useEvent } from "./useEvent";

export type AppTask<Input extends any[], Output = any> = {
  status: "error" | "idle" | "loading" | "success";
  isIdle: boolean;
  data: Output;
  isLoading: boolean;
  execute: (...params: Input) => Promise<Output>;
  error: unknown;
};

/**
 * This hook is similar to useOperation, but it is used to fire and track regular async functions (not thunks).
 * It can be used like useQuery, taking in consideration that the query key will be formed by
 * - the task name or options.name if present
 * - anything passed to options.operationKey
 *
 */
export function useAppTask<
  TaskKey extends keyof typeof AppTasks,
  A extends any[],
  T
>(taskKey: TaskKey | [TaskKey, ...any], fn?: (...args: A) => T): AppTask<A, T> {
  const queryClient = useQueryClient();

  const operationName = useMemo(() => {
    if (typeof taskKey === "string") {
      return taskKey;
    }
    return taskKey[0];
  }, [taskKey]);

  const performTask = useEvent(async (data: any) => {
    //@ts-ignore
    return await fn(...data);
  });

  const queryKey = useMemo(() => {
    return taskKey;
  }, [taskKey]);

  const query = useQuery(
    queryKey,
    async (vars) => {
      try {
        console.log("usetask data new is", vars);
        return await performTask(vars["meta"]);
      } catch (err) {
        console.warn(
          "operation execution error " + operationName,
          err,
          JSON.stringify(err)
        );
        throw err;
      }
    },
    {
      staleTime: 0,
      enabled: false,
      notifyOnChangeProps: "tracked",
      retry: false,
    }
  );

  const execute = useEvent(
    async (...params: Parameters<(...args: A) => T>): Promise<T> => {
      try {
        // @ts-ignore
        return (await queryClient.fetchQuery({
          queryKey,
          queryFn: async (vars) => {
            try {
              console.log("usetask internal data is", vars);
              const result = await performTask(params);
              console.log("task done");
              return result;
            } catch (err) {
              console.warn(
                "operation execution error " + operationName,
                err,
                JSON.stringify(err)
              );
              throw err;
            }
          },
          staleTime: 0,
          retry: false,
          cacheTime: 0,
          meta: params,
        })) as Promise<T>;
      } catch (err: any) {
        console.warn(
          "operation execution error " + operationName,
          err,
          JSON.stringify(err)
        );
        throw err;
      }
    }
  );

  const status = query.status;

  return {
    status: status,
    isIdle: status === "idle",
    data: query.data as any as T,
    isLoading: status === "loading" || query.isFetching,
    execute,
    error: query.error,
  };
}
