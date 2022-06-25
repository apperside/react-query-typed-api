import { RoutesForModel, NestJsxModelRoute } from "react-query-typed-api";
import { OpenMeteoResponse } from './open-meteo';
import { WeatherReactResponse } from "./weather-react";


type AFakeObject = { fakeObjectField: string }
type FakeEventObject = { eventField: string }
type FakeBookingObject = { bookingField: string }



export interface CustomGetManyResponse<T> {
	items: T[];
	itemCount: number;
	pages: number;
}
declare module "react-query-typed-api" {

	export enum AppTasks {
		"my-task"
	}

	export interface RoutesModelMapping {
		"fake-object": AFakeObject;
		events: FakeEventObject
		bookings: FakeBookingObject
	}

	/**
	 * Augment this interface to add al crud endpoints
	 * you can customize everything you need
	 */
	export interface CustomCrudRoutes extends
		/**
		 * this will generate the following endpoints
		 * 
		 * /fake-object
		 * /fake-object/:id
		 * /fake-object/bulk
		 *  
		 * and has a default set of responses:
		 * 
		 * getMany?: GetManyResponse<T>;
		 * getOne?: GetOneResponse<T>;
		 * saveOnePayload?: SaveOnePayload<T>;
		 * saveOneResponse?: GetOneResponse<T>;
		 * saveManyPayload?: SaveManyPayload<T>;
		 * saveManyResponse?: GetManyResponse<T>;
		 * 
		 */
		RoutesForModel<"fake-object">,


		/**
		 * this will generate the following endpoints
		 * 
		 * /custom-crud/events
		 * /custom-crud/events/:id
		 * /custom-crud/events/bulk
		 *  
		 * and has the default responses except for the getMany:
		 * 
		 */
		RoutesForModel<"bookings", "custom-crud", { getManyResponse: CustomGetManyResponse<FakeBookingObject> }>,
		/**
		 * this will generate the following endpoints
		 * 
		 * /custom-nest-crud/events
		 * /custom-nest-crud/events/:id
		 * /custom-nest-crud/events/bulk
		 *  
		 * and has the response compatible with https://github.com/andreyyoshua/nestjsx-crud:
		 * 
		 *  getMany: {
		 *		rows: T[];
		 *		count: number;
		 *		total: number;
		 *		page: number;
		 *		pageCount: number;
		 *	};
		 *	getOne: T;
		 *	saveOnePayload: T;
		 *	saveOneResponse: T;
		 *	saveManyPayload: {
		 *		bulk: T[];
		 *	};
		 *	saveManyResponse: T[];
		 *	deleteManyPayload: any;
		*/
		NestJsxModelRoute<"events", "custom-nest-crud"> {

	}

	/**
	 * Augment this interface to add al custom endpoints
	 */
	export interface MainApi {
		"prova": { prova: WeatherReactResponse }
		"forecast/coords/:coordinates": { responseType: WeatherReactResponse }
		"another-custom-route": { responseType: { customResponseField: string }, payloadType: { field1: string, field2: number } }
		"another-custom-route/:id": { responseType: { customResponseField: string }, payloadType: { field1: string, field2: number } }
	}

	export enum AppModels {
		"mymodel"
	}
	/**
	 * Augment this interface to as many groups of api you need.
	 * A group of api is a set of endpoints that share the same apiUrl (which you set with initNetworking function)
	 */
	export interface AppRoutes {
		openmeteo: {
			"forecast": { responseType: OpenMeteoResponse }
		}
	}
}
