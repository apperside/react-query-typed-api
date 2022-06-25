
type MyObject = { myField: string };
type FakeEventObject = { eventField: string };
type FakeBookingObject = { bookingField: string };
type AnotherApiResponse = { anotherApiField: string }
export interface CustomGetManyResponse<T> {
	items: T[];
	itemCount: number;
	pages: number;
}

declare module "../index" {
	export interface AppRoutes {
		anotherApiScope: {
			"another-api-endpiont": { responseType: OpenMeteoResponse };
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
		"fake-object": MyObject;
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