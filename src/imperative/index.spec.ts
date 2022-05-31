/* eslint-disable testing-library/no-node-access */
import { act, cleanup, render } from "@testing-library/react";
import * as rq from "react-query";
import { OpenMeteoResponse } from "src/test/open-meteo";
import { waitForHook } from "../test/test-utils";
import { WeatherReactResponse } from "../test/weather-react";
import { expectType } from "tsd";
import { DefaultSaveOnePayload, httpGet, httpPost, initApi, useAppMutation, useAppQuery } from "..";
import * as imperative from "../imperative";
import * as axios from "axios";
import { exportedForTesting, httpDelete, httpPatch, httpPut } from "./"
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
		NestJsxModelRoute<"events", "custom-nest-crud"> { }
}

const requestMethodMock = jest.fn().mockReturnValue({ result: "ok" });
const axiosInstanceMock = {
	request: requestMethodMock,
	interceptors: {
		request: {
			use: jest.fn()
		}
	}
}

jest.mock('axios', () => {
	return {
		create: () => {
			return axiosInstanceMock
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
					apiUrl: BASE_API_URL_1
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
				openmeteo: {
					apiUrl: BASE_API_URL_2
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
		await httpGet("fake-object")
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_1}/fake-object`,
			headers: {},
			data: undefined,
			method: "GET",
			cancelToken: undefined
		})

		// get with path params
		await httpGet("fake-object/:id", { pathParams: { id: 1 } })
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_1}/fake-object/1`,
			headers: {},
			data: undefined,
			method: "GET",
			cancelToken: undefined
		})

		// get with path params and query params
		await httpGet("fake-object/:id", { pathParams: { id: 1 }, query: { queryParam1: 1, queryParam2: "test" } })
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_1}/fake-object/1?queryParam1=1&queryParam2=test`,
			headers: {},
			data: undefined,
			method: "GET",
			cancelToken: undefined
		})

		// custom api scope
		await httpGet({ scope: "openmeteo", route: "forecast" })
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_2}/forecast`,
			headers: {},
			data: undefined,
			method: "GET",
			cancelToken: undefined
		})

	});

	test("test POST", async () => {

		// simple get
		const payload = { item: { fakeObjectField: "value" } };

		await httpPost("fake-object", { payload })
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_1}/fake-object`,
			headers: {},
			data: payload,
			method: "POST",
			cancelToken: undefined
		})
		// get with path params
		await httpPost("fake-object/:id", { pathParams: { id: 1 }, payload })
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_1}/fake-object/1`,
			headers: {},
			data: payload,
			method: "POST",
			cancelToken: undefined
		})

		// get with path params and query params
		await httpPost("fake-object/:id", { payload, pathParams: { id: 1 }, query: { queryParam1: 1, queryParam2: "test" } })
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_1}/fake-object/1?queryParam1=1&queryParam2=test`,
			headers: {},
			data: payload,
			method: "POST",
			cancelToken: undefined
		})

		// custom api scope
		await httpPost({ scope: "openmeteo", route: "forecast" })
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_2}/forecast`,
			headers: {},
			data: undefined,
			method: "POST",
			cancelToken: undefined
		})

	});

	test("test PUT", async () => {

		// simple get
		const payload = { item: { fakeObjectField: "value" } };

		await httpPut("fake-object", { payload })
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_1}/fake-object`,
			headers: {},
			data: payload,
			method: "PUT",
			cancelToken: undefined
		})
		// get with path params
		await httpPut("fake-object/:id", { pathParams: { id: 1 }, payload })
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_1}/fake-object/1`,
			headers: {},
			data: payload,
			method: "PUT",
			cancelToken: undefined
		})

		// get with path params and query params
		await httpPut("fake-object/:id", { payload, pathParams: { id: 1 }, query: { queryParam1: 1, queryParam2: "test" } })
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_1}/fake-object/1?queryParam1=1&queryParam2=test`,
			headers: {},
			data: payload,
			method: "PUT",
			cancelToken: undefined
		})

		// custom api scope
		await httpPut({ scope: "openmeteo", route: "forecast" })
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_2}/forecast`,
			headers: {},
			data: undefined,
			method: "PUT",
			cancelToken: undefined
		})

	});

	test("test PATCH", async () => {

		// simple get
		const payload = { item: { fakeObjectField: "value" } };

		await httpPatch("fake-object", { payload })
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_1}/fake-object`,
			headers: {},
			data: payload,
			method: "PATCH",
			cancelToken: undefined
		})
		// get with path params
		await httpPatch("fake-object/:id", { pathParams: { id: 1 }, payload })
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_1}/fake-object/1`,
			headers: {},
			data: payload,
			method: "PATCH",
			cancelToken: undefined
		})

		// get with path params and query params
		await httpPatch("fake-object/:id", { payload, pathParams: { id: 1 }, query: { queryParam1: 1, queryParam2: "test" } })
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_1}/fake-object/1?queryParam1=1&queryParam2=test`,
			headers: {},
			data: payload,
			method: "PATCH",
			cancelToken: undefined
		})

		// custom api scope
		await httpPatch({ scope: "openmeteo", route: "forecast" })
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_2}/forecast`,
			headers: {},
			data: undefined,
			method: "PATCH",
			cancelToken: undefined
		})

	});

	test("test DELETE", async () => {

		// simple get
		const payload = { item: { fakeObjectField: "value" } };

		await httpDelete("fake-object", { payload })
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_1}/fake-object`,
			headers: {},
			data: payload,
			method: "DELETE",
			cancelToken: undefined
		})
		// get with path params
		await httpDelete("fake-object/:id", { pathParams: { id: 1 }, payload })
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_1}/fake-object/1`,
			headers: {},
			data: payload,
			method: "DELETE",
			cancelToken: undefined
		})

		// get with path params and query params
		await httpDelete("fake-object/:id", { payload, pathParams: { id: 1 }, query: { queryParam1: 1, queryParam2: "test" } })
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_1}/fake-object/1?queryParam1=1&queryParam2=test`,
			headers: {},
			data: payload,
			method: "DELETE",
			cancelToken: undefined
		})

		// custom api scope
		await httpDelete({ scope: "openmeteo", route: "forecast" })
		expect(axiosInstanceMock.request).toHaveBeenLastCalledWith({
			url: `${BASE_API_URL_2}/forecast`,
			headers: {},
			data: undefined,
			method: "DELETE",
			cancelToken: undefined
		})

	});


});

