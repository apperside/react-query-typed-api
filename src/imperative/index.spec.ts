/* eslint-disable testing-library/no-node-access */
import { cleanup } from "@testing-library/react";
import { httpGet, httpPost, initApi } from "..";
import { httpDelete, httpPatch, httpPut } from "./";

const requestMethodMock = jest.fn().mockReturnValue({ result: "ok" });
const axiosInstanceMock = {
  request: requestMethodMock,
  interceptors: {
    request: {
      use: jest.fn(),
    },
  },
};

jest.mock("axios", () => {
  return {
    create: () => {
      return axiosInstanceMock;
    },
  };
});

const BASE_API_URL_1 = "http://localhost:3000/api1";
const BASE_API_URL_2 = "http://localhost:3000/api2";
describe("imperative usage", () => {
  beforeAll(() => {
    initApi({
      servers: {
        main: {
          apiUrl: BASE_API_URL_1,
          // requestInterceptor: (config) => {
          //   console.log("main api request interceptor", config);
          //   return config;
          // },
          // responseHandlers: [
          //   (response) => {
          // 	console.log("main api first response handler", response);
          //   },
          //   (response) => {
          // 	console.log("main api second response handler", response);
          //   },
          // ],
        },
        anotherApiScope: {
          apiUrl: () => BASE_API_URL_2,
          // requestInterceptor: (config) => {
          //   console.log("openmeteo api request interceptor", config);
          //   return config;
          // },
          // responseHandlers: [
          //   (response) => {
          // 	console.log("openmeteo api first response handler", response);
          //   },
          //   (response) => {
          // 	console.log("openmeteo api second response handler", response);
          //   },
          // ],
        },
      },
    });
  });

  afterEach(cleanup);

  test("test GET", async () => {
    // simple get
    await httpGet("fake-object");
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_1}/fake-object`,
      headers: {},
      data: undefined,
      timeout: 30000,
      method: "GET",
      cancelToken: undefined,
    });

    await httpGet("fake-object", { timeout: 60000 });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_1}/fake-object`,
      headers: {},
      data: undefined,
      timeout: 60000,
      method: "GET",
      cancelToken: undefined,
    });

    // get with path params
    await httpGet("fake-object/:id", { pathParams: { id: 1 } });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_1}/fake-object/1`,
      headers: {},
      timeout: 30000,
      data: undefined,
      method: "GET",
      cancelToken: undefined,
    });

    // get with path params and query params
    await httpGet("fake-object/:id", {
      pathParams: { id: 1 },
      query: { queryParam1: 1, queryParam2: "test" },
    });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_1}/fake-object/1?queryParam1=1&queryParam2=test`,
      headers: {},
      timeout: 30000,
      data: undefined,
      method: "GET",
      cancelToken: undefined,
    });

    // custom api scope
    await httpGet({ scope: "anotherApiScope", route: "another-api-endpiont" });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_2}/another-api-endpiont`,
      headers: {},
      timeout: 30000,
      data: undefined,
      method: "GET",
      cancelToken: undefined,
    });
  });

  test("test POST", async () => {
    // simple get
    const payload = { item: { myField: "value" } };

    await httpPost("fake-object", { payload });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_1}/fake-object`,
      headers: {},
      timeout: 30000,
      data: payload,
      method: "POST",
      cancelToken: undefined,
    });
    // get with path params
    await httpPost("fake-object/:id", { pathParams: { id: 1 }, payload });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_1}/fake-object/1`,
      headers: {},
      timeout: 30000,
      data: payload,
      method: "POST",
      cancelToken: undefined,
    });

    // get with path params and query params
    await httpPost("fake-object/:id", {
      payload,
      pathParams: { id: 1 },
      query: { queryParam1: 1, queryParam2: "test" },
    });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_1}/fake-object/1?queryParam1=1&queryParam2=test`,
      headers: {},
      timeout: 30000,
      data: payload,
      method: "POST",
      cancelToken: undefined,
    });

    // custom api scope
    await httpPost({ scope: "anotherApiScope", route: "another-api-endpiont" });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_2}/another-api-endpiont`,
      headers: {},
      timeout: 30000,
      data: undefined,
      method: "POST",
      cancelToken: undefined,
    });
  });

  test("test PUT", async () => {
    // simple get
    const payload = { item: { myField: "value" } };

    await httpPut("fake-object", { payload });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_1}/fake-object`,
      headers: {},
      timeout: 30000,
      data: payload,
      method: "PUT",
      cancelToken: undefined,
    });
    // get with path params
    await httpPut("fake-object/:id", { pathParams: { id: 1 }, payload });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_1}/fake-object/1`,
      headers: {},
      timeout: 30000,
      data: payload,
      method: "PUT",
      cancelToken: undefined,
    });

    // get with path params and query params
    await httpPut("fake-object/:id", {
      payload,
      pathParams: { id: 1 },
      query: { queryParam1: 1, queryParam2: "test" },
    });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_1}/fake-object/1?queryParam1=1&queryParam2=test`,
      headers: {},
      timeout: 30000,
      data: payload,
      method: "PUT",
      cancelToken: undefined,
    });

    // custom api scope
    await httpPut({ scope: "anotherApiScope", route: "another-api-endpiont" });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_2}/another-api-endpiont`,
      headers: {},
      timeout: 30000,
      data: undefined,
      method: "PUT",
      cancelToken: undefined,
    });
  });

  test("test PATCH", async () => {
    // simple get
    const payload = { item: { myField: "value" } };

    await httpPatch("fake-object", { payload });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_1}/fake-object`,
      headers: {},
      timeout: 30000,
      data: payload,
      method: "PATCH",
      cancelToken: undefined,
    });
    // get with path params
    await httpPatch("fake-object/:id", { pathParams: { id: 1 }, payload });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_1}/fake-object/1`,
      headers: {},
      timeout: 30000,
      data: payload,
      method: "PATCH",
      cancelToken: undefined,
    });

    // get with path params and query params
    await httpPatch("fake-object/:id", {
      payload,
      pathParams: { id: 1 },
      query: { queryParam1: 1, queryParam2: "test" },
    });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_1}/fake-object/1?queryParam1=1&queryParam2=test`,
      headers: {},
      timeout: 30000,
      data: payload,
      method: "PATCH",
      cancelToken: undefined,
    });

    // custom api scope
    await httpPatch({
      scope: "anotherApiScope",
      route: "another-api-endpiont",
    });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_2}/another-api-endpiont`,
      headers: {},
      timeout: 30000,
      data: undefined,
      method: "PATCH",
      cancelToken: undefined,
    });
  });

  test("test DELETE", async () => {
    // simple get
    const payload = { item: { myField: "value" } };

    await httpDelete("fake-object", { payload });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_1}/fake-object`,
      headers: {},
      timeout: 30000,
      data: payload,
      method: "DELETE",
      cancelToken: undefined,
    });
    // get with path params
    await httpDelete("fake-object/:id", { pathParams: { id: 1 }, payload });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_1}/fake-object/1`,
      headers: {},
      timeout: 30000,
      data: payload,
      method: "DELETE",
      cancelToken: undefined,
    });

    // get with path params and query params
    await httpDelete("fake-object/:id", {
      payload,
      pathParams: { id: 1 },
      query: { queryParam1: 1, queryParam2: "test" },
    });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_1}/fake-object/1?queryParam1=1&queryParam2=test`,
      headers: {},
      timeout: 30000,
      data: payload,
      method: "DELETE",
      cancelToken: undefined,
    });

    // custom api scope
    await httpDelete({
      scope: "anotherApiScope",
      route: "another-api-endpiont",
    });
    expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
      url: `${BASE_API_URL_2}/another-api-endpiont`,
      headers: {},
      timeout: 30000,
      data: undefined,
      method: "DELETE",
      cancelToken: undefined,
    });
  });
});
