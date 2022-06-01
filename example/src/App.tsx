import { useCallback, useEffect } from "react";
import { useQueryClient } from "react-query";

import {
  httpGet,
  useAppMutation,
  useAppQuery,
  useAppQueryClient,
  AppQuery,
  useAppTask,
} from "react-query-typed-api";
import "./App.css";
import logo from "./logo.svg";

function App() {
  const queryClient = useQueryClient();
  /**
   * returns UseQueryResult<GetManyResponse<AFakeObject> | undefined, unknown>
   */
  const queryExample1 = useAppQuery("fake-object");
  const prova = useAppQuery("prova");

  /**
   * takes in input AFakeObject and returns AFakeObject
   */
  const muationExample1 = useAppMutation("fake-object");

  /**
   * returns UseQueryRe	sult<GetManyResponse<FakeEventObject> | undefined, unknown>
   */
  const customCrudQuery = useAppQuery("custom-nest-crud/events");
  //   const anotherCustomCrudQuery = useAppQuery("custom-crud/bookings/:id");
  /**
   * returns UseQueryResult<CustomGetManyResponse<"bookings">, unknown>
   * because for this endpoint, we have a custom response type for getMany function
   */
  const anotherCustomCrudQuery1 = useAppQuery("custom-crud/bookings/:id");
  const aaaa = anotherCustomCrudQuery1.data;

  const anotherCustomCrudQuery = useAppQuery("custom-crud/bookings");
  const aaa = anotherCustomCrudQuery.data?.items;

  /**
   * example query with path variables
   */
  const metaweatherQuery = useAppQuery("forecast/coords/:coordinates", {
    pathParams: { coordinates: "40,-73" },
  });

  /**
   * Example with custom scope
   */
  const openMeteoQuery = useAppQuery(
    { scope: "openmeteo", route: "forecast" },
    {
      query: {
        latitude: "52.52",
        longitude: "13.41",
        hourly: "temperature_2m",
      },
    }
  );

  const mutation = useAppMutation("another-custom-route/:id", {
    pathParams: { id: 1 },
  });

  const onDemandMutation = useCallback(() => {
    mutation.mutateAsync({
      field1: "test",
      field2: 1,
      /**
       * _pathParams is used to replace the url path variables and it will not be forwarded in the request payload.
       *
       * It has been put here because by default react query allows you to add extra data to mutateFn only when you call useMutation
       * and not when you call mutate or mutateAsync.
       * Sometimes may be tricky to have pathParams at the moment you call useMutation, so this has been added here for conveniece.
       * It has been prefixed with underscore here (and no in useAppMutation) to allow the case in which the final user needs to send a property called pathParams
       * in the request payload.
       * If you need to send a post request with a _pathParams property, it will not work
       */
      _pathParams: { id: 1 },
    });
  }, [mutation]);

  const appQueryClent = useAppQueryClient();
  const data = appQueryClent.getQueryData(
    {
      scope: "openmeteo",
      route: "forecast",
    },
    {
      query: {
        latitude: "52.52",
        longitude: "13.41",
        hourly: "temperature_2m",
      },
    }
  );

  useEffect(() => {
    data && console.log("data is", JSON.stringify(data));
  }, [data]);

  const onDemandQuery = useCallback(async () => {
    const data = await httpGet(
      { scope: "openmeteo", route: "forecast" },
      {
        query: {
          latitude: "52.52",
          longitude: "13.41",
          hourly: "temperature_2m",
        },
      }
    );
    alert(JSON.stringify(data));
  }, []);

  const myTask = useCallback(async (prova: string) => {
    const promise = new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
    return await promise;
  }, []);

  const task = useAppTask("my-task", myTask);

  const performTask = useCallback(() => {
    task.execute("test").then((result) => {
      alert("result");
    });
  }, [task]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={onDemandQuery}>ON DEMAND QUERY</button>
        <button onClick={onDemandMutation}>ON DEMAND MUTATION</button>
        {task.isLoading && <div>Loading...</div>}
        {!task.isLoading && <button onClick={performTask}>EXECUTE TASK</button>}
        <p>Metaweather response</p>
        <div>
          {metaweatherQuery.isLoading && <div>Loading...</div>}
          {metaweatherQuery.isError && (
            <div>Error: {(metaweatherQuery.error as any).message}</div>
          )}
          {metaweatherQuery.data && (
            <div>{JSON.stringify(metaweatherQuery.data)}</div>
          )}
        </div>

        <p>Openmeteo response</p>
        <div>
          {openMeteoQuery.isLoading && <div>Loading...</div>}
          {openMeteoQuery.isError && (
            <div>Error: {(openMeteoQuery.error as any).message}</div>
          )}
          {openMeteoQuery.data && (
            <div>{JSON.stringify(openMeteoQuery.data)}</div>
          )}
        </div>

        <p>Openmeteo response with AppQuery component</p>
        <AppQuery
          routeOrRouteObj={{ scope: "openmeteo", route: "forecast" }}
          appQueryOptions={{
            query: {
              latitude: "52.52",
              longitude: "13.41",
              hourly: "temperature_2m",
            },
          }}>
          {(query) => {
            return <div>{JSON.stringify(query.data)}</div>;
          }}
        </AppQuery>
      </header>
    </div>
  );
}

export default App;

