import { act, cleanup } from "@testing-library/react";
import * as rq from "react-query";
import { OpenMeteoResponse } from "src/test/open-meteo";
import { expectType } from "tsd";
import { DefaultGetManyResponse } from "..";
import * as imperative from "../imperative";
import { waitForHook } from "../test/test-utils";
import { WeatherReactResponse } from "../test/weather-react";
import { useAppQuery } from "./useAppQuery";

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

describe("basic usage", () => {
  let useQueryMock: jest.SpyInstance;
  let httpGetMock: jest.SpyInstance;

  beforeAll(() => {
    jest.mock("cross-local-storage");
  });

  beforeEach(() => {
    useQueryMock = jest.spyOn(rq, "useQuery");
    httpGetMock = jest
      .spyOn(imperative, "httpGet")
      .mockImplementation(jest.fn());
    useQueryMock.mockClear();
    httpGetMock.mockClear();
  });

  afterEach(cleanup);

  test("simple query call, only endpoint name", async () => {
    const { result } = await waitForHook(() => useAppQuery("fake-object"));
    // await waitFor(() => {
    //   return true;
    // });
    expect(useQueryMock).toHaveBeenCalled();
    const queryKeyParameter = useQueryMock.mock.calls[0][0];
    expect(queryKeyParameter).toEqual(["fake-object"]);

    expect(httpGetMock).toHaveBeenCalledWith("fake-object", {});
  });

  test("query call with path param", async () => {
    const { result } = await waitForHook(() =>
      useAppQuery("fake-object/:id", { pathParams: { id: 1 } })
    );

    expect(useQueryMock).toHaveBeenCalled();
    const queryKeyParameter = useQueryMock.mock.calls[0][0];
    expect(queryKeyParameter).toEqual(["fake-object/:id", { id: 1 }]);

    expect(httpGetMock).toHaveBeenCalledWith("fake-object/:id", {
      pathParams: { id: 1 },
    });
  });

  test("query call with query object", async () => {
    const { result } = await waitForHook(() =>
      useAppQuery("fake-object", {
        query: { queryParam1: "testValue", queryParam2: 6 },
      })
    );

    expect(useQueryMock).toHaveBeenCalled();
    const queryKeyParameter = useQueryMock.mock.calls[0][0];

    expect(queryKeyParameter).toEqual([
      "fake-object",
      { queryParam1: "testValue", queryParam2: 6 },
    ]);

    expect(httpGetMock).toHaveBeenCalledWith("fake-object", {
      query: { queryParam1: "testValue", queryParam2: 6 },
    });
  });

  test("query call with path param and query object", async () => {
    const { result } = await waitForHook(() =>
      useAppQuery("fake-object/:id", {
        pathParams: { id: 1 },
        query: { queryParam1: "testValue", queryParam2: 6 },
      })
    );

    expect(useQueryMock).toHaveBeenCalled();
    const queryKeyParameter = useQueryMock.mock.calls[0][0];

    expect(queryKeyParameter).toEqual([
      "fake-object/:id",
      { id: 1 },
      { queryParam1: "testValue", queryParam2: 6 },
    ]);

    expect(httpGetMock).toHaveBeenCalledWith("fake-object/:id", {
      pathParams: { id: 1 },
      query: { queryParam1: "testValue", queryParam2: 6 },
    });
  });

  test("query call with extraRoutePath", async () => {
    const { result } = await waitForHook(() =>
      useAppQuery("fake-object/:id", {
        pathParams: { id: 1 },
        query: { queryParam1: "testValue", queryParam2: 6 },
        extraRoutePath: "extra-route-path",
      })
    );

    expect(useQueryMock).toHaveBeenCalled();
    const queryKeyParameter = useQueryMock.mock.calls[0][0];

    expect(queryKeyParameter).toEqual([
      "fake-object/:id",
      "extra-route-path",
      { id: 1 },
      { queryParam1: "testValue", queryParam2: 6 },
    ]);

    expect(httpGetMock).toHaveBeenCalledWith("fake-object/:id", {
      pathParams: { id: 1 },
      query: { queryParam1: "testValue", queryParam2: 6 },
      extraRoutePath: "extra-route-path",
    });
  });

  test("query call with extraRoutePath array", async () => {
    const { result } = await waitForHook(() =>
      useAppQuery("fake-object/:id", {
        pathParams: { id: 1 },
        query: { queryParam1: "testValue", queryParam2: 6 },
        extraRoutePath: ["extra-route-path1", "extra-route-path2"],
      })
    );

    expect(useQueryMock).toHaveBeenCalled();
    const queryKeyParameter = useQueryMock.mock.calls[0][0];

    expect(queryKeyParameter).toEqual([
      "fake-object/:id",
      ["extra-route-path1", "extra-route-path2"],
      { id: 1 },
      { queryParam1: "testValue", queryParam2: 6 },
    ]);

    expect(httpGetMock).toHaveBeenCalledWith("fake-object/:id", {
      pathParams: { id: 1 },
      query: { queryParam1: "testValue", queryParam2: 6 },
      extraRoutePath: ["extra-route-path1", "extra-route-path2"],
    });
  });

  test("typings are correct", () => {
    useQueryMock = jest.spyOn(rq, "useQuery").mockImplementation(jest.fn());
    act(() => {
      const query = useAppQuery("fake-object");
      expectType<
        rq.UseQueryResult<DefaultGetManyResponse<AFakeObject>, unknown>
      >(query);
    });

    useQueryMock.mockClear();
    act(() => {
      const query = useAppQuery("fake-object/:id");
      expectType<rq.UseQueryResult<AFakeObject, unknown>>(query);
    });
  });
});

