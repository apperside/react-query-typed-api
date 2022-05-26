/* eslint-disable testing-library/no-node-access */
import { render } from "@testing-library/react";
import * as rq from "react-query";
import { OpenMeteoResponse } from "src/test/open-meteo";
import { WeatherReactResponse } from "src/test/weather-react";
import { expectType } from "tsd";
import { DefaultGetManyResponse } from "..";
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
  test("simple query call, only endpoint name", () => {
    jest.mock("cross-local-storage");
    const fn = jest.spyOn(rq, "useQuery").mockImplementation(jest.fn());
    const Comp = () => {
      const query = useAppQuery("fake-object");

      return <div />;
    };

    render(<Comp />);
    expect(fn).toHaveBeenCalled();
    const queryKeyParameter = fn.mock.calls[0][0];
    expect(queryKeyParameter).toEqual(["fake-object"]);
    const query = useAppQuery("fake-object");
    expectType<rq.UseQueryResult<DefaultGetManyResponse<AFakeObject>, unknown>>(
      query
    );
  });

  test("query call with path param", () => {
    jest.mock("cross-local-storage");
    const fn = jest.spyOn(rq, "useQuery").mockImplementation(jest.fn());
    fn.mockClear();

    const Comp = () => {
      const query = useAppQuery("fake-object/:id", { pathParams: { id: 1 } });

      return <div />;
    };

    render(<Comp />);
    expect(fn).toHaveBeenCalled();
    const queryKeyParameter = fn.mock.calls[0][0];
    expect(queryKeyParameter).toEqual(["fake-object/:id", { id: 1 }]);
    const query = useAppQuery("fake-object/:id");
    expectType<rq.UseQueryResult<AFakeObject, unknown>>(query);
  });

  test("query call with query object", () => {
    jest.mock("cross-local-storage");
    const fn = jest.spyOn(rq, "useQuery").mockImplementation(jest.fn());
    fn.mockClear();

    const Comp = () => {
      const query = useAppQuery("fake-object/:id", {
        query: { queryParam1: "testValue", queryParam2: 6 },
      });

      return <div />;
    };

    render(<Comp />);
    expect(fn).toHaveBeenCalled();
    const queryKeyParameter = fn.mock.calls[0][0];

    expect(queryKeyParameter).toEqual([
      "fake-object/:id",
      { queryParam1: "testValue", queryParam2: 6 },
    ]);
    const query = useAppQuery("fake-object/:id");
    expectType<rq.UseQueryResult<AFakeObject, unknown>>(query);
  });

  test("query call with path param and query object", () => {
    jest.mock("cross-local-storage");
    const fn = jest.spyOn(rq, "useQuery").mockImplementation(jest.fn());
    fn.mockClear();

    const Comp = () => {
      const query = useAppQuery("fake-object/:id", {
        pathParams: { id: 1 },
        query: { queryParam1: "testValue", queryParam2: 6 },
      });

      return <div />;
    };

    render(<Comp />);
    expect(fn).toHaveBeenCalled();
    const queryKeyParameter = fn.mock.calls[0][0];
    console.log("query parameter", queryKeyParameter);
    expect(queryKeyParameter).toEqual([
      "fake-object/:id",
      { id: 1 },
      { queryParam1: "testValue", queryParam2: 6 },
    ]);
    const query = useAppQuery("fake-object/:id");
    expectType<rq.UseQueryResult<AFakeObject, unknown>>(query);
  });

  test("query call with extraRoutePath", () => {
    jest.mock("cross-local-storage");
    const fn = jest.spyOn(rq, "useQuery").mockImplementation(jest.fn());
    fn.mockClear();

    const Comp = () => {
      const query = useAppQuery("fake-object/:id", {
        pathParams: { id: 1 },
        query: { queryParam1: "testValue", queryParam2: 6 },
        extraRoutePath: "extra-route-path",
      });

      return <div />;
    };

    render(<Comp />);
    expect(fn).toHaveBeenCalled();
    const queryKeyParameter = fn.mock.calls[0][0];
    console.log("query parameter", queryKeyParameter);
    expect(queryKeyParameter).toEqual([
      "fake-object/:id",
      "extra-route-path",
      { id: 1 },
      { queryParam1: "testValue", queryParam2: 6 },
    ]);

    fn.mockClear();
    const query = useAppQuery("fake-object/:id");
    expectType<rq.UseQueryResult<AFakeObject, unknown>>(query);
  });

  test("query call with extraRoutePath array", () => {
    jest.mock("cross-local-storage");
    const fn = jest.spyOn(rq, "useQuery").mockImplementation(jest.fn());
    fn.mockClear();

    const Comp = () => {
      const query = useAppQuery("fake-object/:id", {
        pathParams: { id: 1 },
        query: { queryParam1: "testValue", queryParam2: 6 },
        extraRoutePath: ["extra-route-path1", "extra-route-path2"],
      });

      return <div />;
    };

    render(<Comp />);
    expect(fn).toHaveBeenCalled();
    const queryKeyParameter = fn.mock.calls[0][0];

    expect(queryKeyParameter).toEqual([
      "fake-object/:id",
      ["extra-route-path1", "extra-route-path2"],
      { id: 1 },
      { queryParam1: "testValue", queryParam2: 6 },
    ]);

    fn.mockClear();
    const query = useAppQuery("fake-object/:id");
    expectType<rq.UseQueryResult<AFakeObject, unknown>>(query);
  });
});

