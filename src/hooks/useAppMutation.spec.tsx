/* eslint-disable testing-library/no-node-access */
import { act, cleanup, render } from "@testing-library/react";
import * as rq from "react-query";
import { OpenMeteoResponse } from "src/test/open-meteo";
import { waitForHook } from "../test/test-utils";
import { WeatherReactResponse } from "../test/weather-react";
import { expectType } from "tsd";
import { DefaultSaveOnePayload, useAppMutation, useAppQuery } from "..";
import * as imperative from "../imperative";

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
  let useMutationMock: jest.SpyInstance;
  let httpPostMock: jest.SpyInstance;

  beforeAll(() => {
    jest.mock("cross-local-storage");
  });

  beforeEach(() => {
    useMutationMock = jest.spyOn(rq, "useMutation");
    httpPostMock = jest
      .spyOn(imperative, "httpPost")
      .mockImplementation(jest.fn());
    useMutationMock.mockClear();
    httpPostMock.mockClear();
    // jest.spyOn(rq, "useQueryClient").mockImplementation(jest.fn());
  });

  afterEach(cleanup);
  test("simple query call, only endpoint name", async () => {
    const {
      result: { current: hook },
    } = await waitForHook(() => useAppMutation("fake-object"));

    expect(useMutationMock).toHaveBeenCalled();
    const queryKeyParameter = useMutationMock.mock.calls[0][0];
    expect(queryKeyParameter).toEqual(["fake-object"]);

    await act(async () => {
      const payload = { item: { fakeObjectField: "value" } };
      await hook.mutateAsync(payload);
      expect(httpPostMock).toHaveBeenCalledWith("fake-object", { payload });
    });
    // const query = useAppMutation("fake-object");
    // expectType<
    //   rq.UseMutationResult<AFakeObject, any, DefaultSaveOnePayload<AFakeObject>>
    // >(query);
  });

  test("with path variables", async () => {
    const {
      result: { current: hook },
    } = await waitForHook(() =>
      useAppMutation("fake-object/:id", { pathParams: { id: 1 } })
    );

    expect(useMutationMock).toHaveBeenCalled();
    const queryKeyParameter = useMutationMock.mock.calls[0][0];
    expect(queryKeyParameter).toEqual(["fake-object/:id", { id: 1 }]);

    await act(async () => {
      const payload = { item: { fakeObjectField: "value" } };
      await hook.mutateAsync(payload);
      expect(httpPostMock).toHaveBeenCalledWith("fake-object/:id", {
        payload,
        pathParams: { id: 1 },
      });
    });
  });

  test("query call with only query object", async () => {
    const {
      result: { current: hook },
    } = await waitForHook(() =>
      useAppMutation("fake-object", {
        query: { queryParam1: "testValue", queryParam2: 6 },
      })
    );

    expect(useMutationMock).toHaveBeenCalled();
    const queryKeyParameter = useMutationMock.mock.calls[0][0];

    expect(queryKeyParameter).toEqual([
      "fake-object",
      { queryParam1: "testValue", queryParam2: 6 },
    ]);

    await act(async () => {
      const payload = { item: { fakeObjectField: "value" } };
      await hook.mutateAsync({ ...payload });
      expect(httpPostMock).toHaveBeenCalledWith("fake-object", {
        payload,
        query: { queryParam1: "testValue", queryParam2: 6 },
      });
    });
  });

  test("query call with path param and query object", async () => {
    const {
      result: { current: hook },
    } = await waitForHook(() =>
      useAppMutation("fake-object/:id", {
        pathParams: { id: 1 },
        query: { queryParam1: "testValue", queryParam2: 6 },
      })
    );

    expect(useMutationMock).toHaveBeenCalled();
    const queryKeyParameter = useMutationMock.mock.calls[0][0];

    expect(queryKeyParameter).toEqual([
      "fake-object/:id",
      { id: 1 },
      { queryParam1: "testValue", queryParam2: 6 },
    ]);

    await act(async () => {
      const payload = { item: { fakeObjectField: "value" } };
      await hook.mutateAsync({ ...payload });
      expect(httpPostMock).toHaveBeenCalledWith("fake-object/:id", {
        payload,
        pathParams: { id: 1 },
        query: { queryParam1: "testValue", queryParam2: 6 },
      });
    });
  });

  test("query call with extraRoutePath", async () => {
    const {
      result: { current: hook },
    } = await waitForHook(() =>
      useAppMutation("fake-object/:id", {
        pathParams: { id: 1 },
        query: { queryParam1: "testValue", queryParam2: 6 },
        extraRoutePath: "extra-route-path",
      })
    );

    expect(useMutationMock).toHaveBeenCalled();
    const queryKeyParameter = useMutationMock.mock.calls[0][0];
    console.log("query parameter", queryKeyParameter);
    expect(queryKeyParameter).toEqual([
      "fake-object/:id",
      "extra-route-path",
      { id: 1 },
      { queryParam1: "testValue", queryParam2: 6 },
    ]);

    await act(async () => {
      const payload = { item: { fakeObjectField: "value" } };
      await hook.mutateAsync({ ...payload });
      expect(httpPostMock).toHaveBeenCalledWith("fake-object/:id", {
        payload,
        pathParams: { id: 1 },
        query: { queryParam1: "testValue", queryParam2: 6 },
        extraRoutePath: "extra-route-path",
      });
    });
  });

  test("query call with extraRoutePath array", async () => {
    const {
      result: { current: hook },
    } = await waitForHook(() =>
      useAppMutation("fake-object/:id", {
        pathParams: { id: 1 },
        query: { queryParam1: "testValue", queryParam2: 6 },
        extraRoutePath: ["extra-route-path1", "extra-route-path2"],
      })
    );
    expect(useMutationMock).toHaveBeenCalled();
    const queryKeyParameter = useMutationMock.mock.calls[0][0];

    expect(queryKeyParameter).toEqual([
      "fake-object/:id",
      ["extra-route-path1", "extra-route-path2"],
      { id: 1 },
      { queryParam1: "testValue", queryParam2: 6 },
    ]);

    await act(async () => {
      const payload = { item: { fakeObjectField: "value" } };
      await hook.mutateAsync({ ...payload });
      expect(httpPostMock).toHaveBeenCalledWith("fake-object/:id", {
        payload,
        pathParams: { id: 1 },
        query: { queryParam1: "testValue", queryParam2: 6 },
        extraRoutePath: ["extra-route-path1", "extra-route-path2"],
      });
    });
  });

  test("typings are correct", async () => {
    type MutationResulType<Res, Payload> = rq.UseMutationResult<
      Res,
      any,
      Payload & {
        _pathParams?:
          | {
              [key: string]: any;
            }
          | undefined;
      },
      any
    >;

    {
      const {
        result: { current: hook },
      } = await waitForHook(() => useAppMutation("fake-object"));

      expectType<
        MutationResulType<AFakeObject, DefaultSaveOnePayload<AFakeObject>>
      >(hook);
    }

    {
      const {
        result: { current: hook },
      } = await waitForHook(() => useAppMutation("fake-object/:id"));

      expectType<
        MutationResulType<AFakeObject, DefaultSaveOnePayload<AFakeObject>>
      >(hook);
    }
  });
});

