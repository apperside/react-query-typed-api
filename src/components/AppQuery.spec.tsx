import { cleanup, render } from "@testing-library/react";
import * as rq from "react-query";
import AppQuery from "./AppQuery";

describe("AppQueryComponent", () => {
  let useQueryMock: jest.SpyInstance;

  beforeAll(() => {
    jest.mock("cross-local-storage");
  });

  beforeEach(() => {
    useQueryMock = jest.spyOn(rq, "useQuery").mockImplementation(jest.fn());

    useQueryMock.mockClear();
  });

  afterEach(cleanup);

  test("simple get", () => {
    render(
      <AppQuery routeOrRouteObj="fake-object">
        {(query) => {
          return <div />;
        }}
      </AppQuery>
    );

    expect(useQueryMock).toHaveBeenCalled();
    const queryKeyParameter = useQueryMock.mock.calls[0][0];
    expect(queryKeyParameter).toEqual(["fake-object"]);
  });

  test("get with path params", () => {
    render(
      <AppQuery
        routeOrRouteObj="fake-object/:id"
        appQueryOptions={{ pathParams: { id: 1 } }}>
        {(query) => {
          return <div />;
        }}
      </AppQuery>
    );

    expect(useQueryMock).toHaveBeenCalled();
    const queryKeyParameter = useQueryMock.mock.calls[0][0];
    expect(queryKeyParameter).toEqual(["fake-object/:id", { id: 1 }]);
  });
});

