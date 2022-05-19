import { useCallback, useEffect } from "react";
import {
  httpGet,
  useAppMutation,
  useAppQuery,
  useAppQueryClient,
} from "react-query-typed-api";
import "./App.css";
import logo from "./logo.svg";

function App() {
  /**
   * returns UseQueryResult<GetManyResponse<AFakeObject> | undefined, unknown>
   */
  const queryExample1 = useAppQuery("fake-object");

  /**
   * takes in input AFakeObject and returns AFakeObject
   */
  const muationExample1 = useAppMutation("fake-object");

  /**
   * returns UseQueryResult<GetManyResponse<FakeEventObject> | undefined, unknown>
   */
  const customCrudQuery = useAppQuery("custom-nest-crud/events");
  // returns UseQueryResult<GetManyResponse<FakeEventObject> | undefined, unknown>

  /**
   * returns UseQueryResult<CustomGetManyResponse<"bookings">, unknown>
   * because for this endpoint, we have a custom response type for getMany function
   */
  const anotherCustomCrudQuery = useAppQuery("custom-crud/bookings");

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={onDemandQuery}>ON DEMAND QUERY</button>
        <button onClick={onDemandMutation}>ON DEMAND MUTATION</button>
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
      </header>
    </div>
  );
}

export default App;

