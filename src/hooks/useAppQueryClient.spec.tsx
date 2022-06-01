/* eslint-disable testing-library/no-node-access */
import { cleanup } from "@testing-library/react";
import * as rq from "react-query";
import { OpenMeteoResponse } from "src/test/open-meteo";
import { useAppQueryClient } from "..";
import { waitForHook } from "../test/test-utils";
import { WeatherReactResponse } from "../test/weather-react";

type AFakeObject = { fakeObjectField: string };
type FakeEventObject = { eventField: string };
type FakeBookingObject = { bookingField: string };

export interface CustomGetManyResponse<T> {
  items: T[];
  itemCount: number;
  pages: number;
}

declare module "../index" {
  export interface AppRoutes {
    openmeteo: {
      forecast: { responseType: OpenMeteoResponse };
    };
  }

  /**
   * Augment this interface to add al custom endpoints
   */
  export interface MainApi {
    prova: { prova: WeatherReactResponse };
    "forecast/coords/:coordinates": { responseType: WeatherReactResponse };
    "another-custom-route": {
      responseType: { customResponseField: string };
      payloadType: { field1: string; field2: number };
    };
    "another-custom-route/:id": {
      responseType: { customResponseField: string };
      payloadType: { field1: string; field2: number };
    };
  }
}
declare module "../crud" {
  export interface RoutesModelMapping {
    "fake-object": AFakeObject;
    events: FakeEventObject;
    bookings: FakeBookingObject;
  }

  /**
   * Augment this interface to add al crud endpoints
   * you can customize everything you need
   */
  export interface CustomCrudRoutes
    extends RoutesForModel<"fake-object">,
      RoutesForModel<
        "bookings",
        "custom-crud",
        { getManyResponse: CustomGetManyResponse<FakeBookingObject> }
      >,
      NestJsxModelRoute<"events", "custom-nest-crud"> {}
}

describe("useAppQueryClient", () => {
  let queryClientMock: jest.SpyInstance;
  const mockedQueryClient = {
    invalidateQueries: jest.fn(),
    refetchQueries: jest.fn(),
    isFetching: jest.fn(),
    isMutating: jest.fn(),
    getQueryData: jest.fn(),
    getQueryState: jest.fn(),
    setQueryData: jest.fn(),
    removeQueries: jest.fn(),
    resetQueries: jest.fn(),
    cancelQueries: jest.fn(),
    fetchQuery: jest.fn(),
    prefetchQuery: jest.fn(),
    executeMutation: jest.fn(),
    setDefaultOptions: jest.fn(),
    setQueryDefaults: jest.fn(),
    getQueryDefaults: jest.fn(),
    setMutationDefaults: jest.fn(),
    getMutationDefaults: jest.fn(),
  };

  beforeAll(() => {
    jest.mock("cross-local-storage");
    queryClientMock = jest
      .spyOn(rq, "useQueryClient")
      .mockImplementation(() => {
        return mockedQueryClient as any;
      });
  });

  afterEach(cleanup);
  test("simple query call, only endpoint name", async () => {
    const {
      result: { current: hook },
    } = await waitForHook(() => useAppQueryClient());
    expect(queryClientMock).toHaveBeenCalled();

    hook.invalidateQueries("fake-object");
    hook.refetchQueries("fake-object");
    hook.isFetching("fake-object");
    hook.isMutating("fake-object");
    hook.getQueryData("fake-object");
    hook.setQueryData("fake-object", { count: 1, rows: [], page: 1 });
    hook.removeQueries("fake-object");
    hook.resetQueries("fake-object");
    hook.cancelQueries("fake-object");
    hook.fetchQuery("fake-object");
    hook.prefetchQuery("fake-object");
    hook.executeMutation("fake-object");
    hook.getQueryState("fake-object");
    hook.setQueryDefaults("fake-object");
    hook.getQueryDefaults("fake-object");
    hook.setMutationDefaults("fake-object");
    hook.getMutationDefaults("fake-object");
    expect(mockedQueryClient.invalidateQueries).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.refetchQueries).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.isFetching).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.isMutating).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.getQueryData).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.setQueryData).toHaveBeenLastCalledWith(
      ["fake-object"],
      { count: 1, rows: [], page: 1 }
    );
    expect(mockedQueryClient.removeQueries).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.resetQueries).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.cancelQueries).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.fetchQuery).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.prefetchQuery).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.executeMutation).toHaveBeenLastCalledWith({
      mutationKey: ["fake-object"],
    });
    expect(mockedQueryClient.getQueryState).toHaveBeenLastCalledWith(
      ["fake-object"],
      undefined
    );
    expect(mockedQueryClient.setQueryDefaults).toHaveBeenLastCalledWith(
      ["fake-object"],
      {}
    );
    expect(mockedQueryClient.getQueryDefaults).toHaveBeenLastCalledWith([
      "fake-object",
    ]);
    expect(mockedQueryClient.setMutationDefaults).toHaveBeenLastCalledWith(
      ["fake-object"],
      {}
    );
    expect(mockedQueryClient.getMutationDefaults).toHaveBeenLastCalledWith([
      "fake-object",
    ]);

    hook.invalidateQueries("fake-object/:id", { pathParams: { id: 1 } });
    expect(mockedQueryClient.invalidateQueries).toHaveBeenLastCalledWith([
      "fake-object/:id",
      { id: 1 },
    ]);

    hook.invalidateQueries("fake-object", {
      query: { queryParam1: "testValue", queryParam2: 6 },
    });
    expect(mockedQueryClient.invalidateQueries).toHaveBeenLastCalledWith([
      "fake-object",
      { queryParam1: "testValue", queryParam2: 6 },
    ]);

    hook.invalidateQueries("fake-object/:id", {
      pathParams: { id: 1 },
      query: { queryParam1: "testValue", queryParam2: 6 },
    });
    expect(mockedQueryClient.invalidateQueries).toHaveBeenLastCalledWith([
      "fake-object/:id",
      { id: 1 },
      { queryParam1: "testValue", queryParam2: 6 },
    ]);

    hook.invalidateQueries(
      { scope: "openmeteo", route: "forecast" },
      {
        pathParams: { id: 1 },
        query: { queryParam1: "testValue", queryParam2: 6 },
      }
    );
    expect(mockedQueryClient.invalidateQueries).toHaveBeenLastCalledWith([
      { scope: "openmeteo", route: "forecast" },
      { id: 1 },
      { queryParam1: "testValue", queryParam2: 6 },
    ]);
  });
});

