---
id: "modules"
title: "react-query-typed-api"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Interfaces

- [AppRoutes](interfaces/AppRoutes.md)
- [CustomCrudRoutes](interfaces/CustomCrudRoutes.md)
- [HttpRequestOptions](interfaces/HttpRequestOptions.md)
- [MainApi](interfaces/MainApi.md)
- [NestCrudResponseTypes](interfaces/NestCrudResponseTypes.md)
- [RoutesModelMapping](interfaces/RoutesModelMapping.md)

## Type aliases

### ApiConfig

Ƭ **ApiConfig**: `Object`

Configuration object for the apiaaa

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `loggingEnabled?` | `boolean` | - |
| `servers` | { [key in keyof AppRoutes]: ApiServerConfig } | A key-value pair where the key are all the keys in [AppRoutes](interfaces/AppRoutes.md), and the value an [ApiServerConfig](modules.md#apiserverconfig-12) object |

#### Defined in

[networking/httpManager.ts:105](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/networking/httpManager.ts#L105)

___

### ApiPayloadType

Ƭ **ApiPayloadType**<`Scope`, `Route`\>: [`AppRoutes`](interfaces/AppRoutes.md)[`Scope`][`Route`] extends { `payloadType?`: infer P  } ? `P` : [`AppRoutes`](interfaces/AppRoutes.md)[`Scope`][`Route`] extends { `responseType`: infer D  } ? `D` : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends keyof [`AppRoutes`](interfaces/AppRoutes.md) |
| `Route` | extends keyof [`AppRoutes`](interfaces/AppRoutes.md)[`Scope`] |

#### Defined in

[index.ts:90](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/index.ts#L90)

___

### ApiResponseType

Ƭ **ApiResponseType**<`Scope`, `Route`, `Type`\>: `Type` extends ``"mutation"`` ? [`AppRoutes`](interfaces/AppRoutes.md)[`Scope`][`Route`] extends { `mutationResponseType`: infer M  } ? `M` : [`AppRoutes`](interfaces/AppRoutes.md)[`Scope`][`Route`] extends { `responseType`: infer D  } ? `D` : \`mutation is missing both responseType and mutationResponseType from the route ${Route} in api scope ${Scope}\` : [`AppRoutes`](interfaces/AppRoutes.md)[`Scope`][`Route`] extends { `responseType`: infer D  } ? `D` : \`endpoint definition is missing responseType from the route ${Route} in api scope ${Scope}. Click here to learn how to define endpoints https://apperside.com\`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends keyof [`AppRoutes`](interfaces/AppRoutes.md) |
| `Route` | extends keyof [`AppRoutes`](interfaces/AppRoutes.md)[`Scope`] |
| `Type` | extends ``"query"`` \| ``"mutation"`` = ``"query"`` |

#### Defined in

[index.ts:76](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/index.ts#L76)

___

### ApiRoute

Ƭ **ApiRoute**<`Scope`\>: keyof [`AppRoutes`](interfaces/AppRoutes.md)[`Scope`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends keyof [`AppRoutes`](interfaces/AppRoutes.md) = ``"main"`` |

#### Defined in

[index.ts:74](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/index.ts#L74)

___

### ApiScope

Ƭ **ApiScope**: keyof [`AppRoutes`](interfaces/AppRoutes.md)

An app can make use of more than one api, and that is where ApiScope comes into play.
By augmenting [AppRoutes](interfaces/AppRoutes.md) with as many keys as you need, you will have full type inferring
for all of your endpoints

#### Defined in

[index.ts:72](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/index.ts#L72)

___

### ApiServerConfig

Ƭ **ApiServerConfig**: `Object`

Api configuration

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiUrl` | `string` | - |
| `axiosConfig?` | `AxiosRequestConfig` | - |
| `errorHandlers?` | [`CustomErrorHandler`](modules.md#customerrorhandler-12)[] | - |
| `headers?` | { `[key: string]`: `string` \| (`options`: [`HttpRequestOptions`](interfaces/HttpRequestOptions.md)) => `string`;  } | - |
| `requestInterceptor?` | [`CustomRequestHandler`](modules.md#customrequesthandler-12) | - |
| `responseHandlers?` | [`CustomResponseHandler`](modules.md#customresponsehandler-12)[] | - |
| `timeout?` | `number` | - |
| `tokenLocalStorageKey?` | `string` | The name of the localstorage key that will be used to store and read the token. Evety request market as authenticated will put in the header the token as Bearer. TODO: Handle Multiple methods. in the meanwhile it possible to use the headers config key to build custom headers |

#### Defined in

[networking/httpManager.ts:85](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/networking/httpManager.ts#L85)

___

### AppEndpoint

Ƭ **AppEndpoint**: `Object`

This type represent the structure of one endpoint.

#### Index signature

▪ [key: `string`]: { `mutationResponseType?`: `any` ; `payloadType?`: `any` ; `responseType`: `any`  }

#### Defined in

[index.ts:25](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/index.ts#L25)

___

### AppQueryOptions

Ƭ **AppQueryOptions**<`Payload`\>: { `pathParams?`: { `[key: string]`: `any`;  }  } & `Omit`<[`HttpRequestOptions`](interfaces/HttpRequestOptions.md)<`Payload`\>, ``"url"``\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `any` |

#### Defined in

[hooks/index.ts:9](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/hooks/index.ts#L9)

___

### CrudRoutes

Ƭ **CrudRoutes**: { [key in keyof CustomCrudRoutes]: CustomCrudRoutes[key] }

#### Defined in

[crud/index.ts:145](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/crud/index.ts#L145)

___

### CustomErrorHandler

Ƭ **CustomErrorHandler**: (`error`: `any`, `config`: [`HttpRequestOptions`](interfaces/HttpRequestOptions.md)) => `any`

#### Type declaration

▸ (`error`, `config`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `any` |
| `config` | [`HttpRequestOptions`](interfaces/HttpRequestOptions.md) |

##### Returns

`any`

#### Defined in

[networking/httpManager.ts:77](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/networking/httpManager.ts#L77)

___

### CustomRequestHandler

Ƭ **CustomRequestHandler**: (`config`: `AxiosRequestConfig`) => `any` \| `Promise`<`AxiosRequestConfig`\>

#### Type declaration

▸ (`config`): `any` \| `Promise`<`AxiosRequestConfig`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `AxiosRequestConfig` |

##### Returns

`any` \| `Promise`<`AxiosRequestConfig`\>

#### Defined in

[networking/httpManager.ts:75](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/networking/httpManager.ts#L75)

___

### CustomResponseHandler

Ƭ **CustomResponseHandler**: (`value`: `AxiosResponse`) => `any`

#### Type declaration

▸ (`value`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `AxiosResponse` |

##### Returns

`any`

#### Defined in

[networking/httpManager.ts:76](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/networking/httpManager.ts#L76)

___

### DefaultDeleteManyPayload

Ƭ **DefaultDeleteManyPayload**<`T`\>: `T`

Default payload type for deleteMany request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[crud/index.ts:95](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/crud/index.ts#L95)

___

### DefaultDeleteManyResponse

Ƭ **DefaultDeleteManyResponse**<`T`\>: `T`

Default response type for deleteMany request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[crud/index.ts:100](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/crud/index.ts#L100)

___

### DefaultGetManyResponse

Ƭ **DefaultGetManyResponse**<`T`\>: `Object`

Default response type for getMany request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `count` | `number` | total rows count (useful for pagination) |
| `page` | `number` | the current page (in case of paginated result) |
| `rows` | `T`[] | The rows for the request |

#### Defined in

[crud/index.ts:47](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/crud/index.ts#L47)

___

### DefaultGetOneResponse

Ƭ **DefaultGetOneResponse**<`T`\>: `T`

Default response type for getOne request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[crud/index.ts:65](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/crud/index.ts#L65)

___

### DefaultSaveManyPayload

Ƭ **DefaultSaveManyPayload**<`T`\>: `Object`

Default payload type for saveMany request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | `T`[] | The items to save |

#### Defined in

[crud/index.ts:80](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/crud/index.ts#L80)

___

### DefaultSaveOnePayload

Ƭ **DefaultSaveOnePayload**<`T`\>: `Object`

Default payload type for saveOne request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `T` | The item to save |

#### Defined in

[crud/index.ts:70](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/crud/index.ts#L70)

___

### DefaultSaveOneResponse

Ƭ **DefaultSaveOneResponse**<`T`\>: `T`

Default response type for saveOne request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[crud/index.ts:90](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/crud/index.ts#L90)

___

### ExecuteMutationFunction

Ƭ **ExecuteMutationFunction**: <Scope, Route\>(`routeOrRouteObj`: `Route` \| { `route`: `Route` ; `scope`: `Scope`  }, `appQueryOptions?`: `Partial`<[`AppQueryOptions`](modules.md#appqueryoptions-12)<[`ApiPayloadType`](modules.md#apipayloadtype-12)<`Scope`, `Route`\>\>\>) => `Promise`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`, ``"mutation"``\>\>

#### Type declaration

▸ <`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`): `Promise`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`, ``"mutation"``\>\>

This type only needed for executeMutation because it returns mutation mapped return type

##### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends keyof [`AppRoutes`](interfaces/AppRoutes.md) = ``"main"`` |
| `Route` | extends [`ApiRoute`](modules.md#apiroute-12)<`Scope`\> = [`ApiRoute`](modules.md#apiroute-12)<`Scope`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | `Partial`<[`AppQueryOptions`](modules.md#appqueryoptions-12)<[`ApiPayloadType`](modules.md#apipayloadtype-12)<`Scope`, `Route`\>\>\> |

##### Returns

`Promise`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`, ``"mutation"``\>\>

#### Defined in

[hooks/useAppQueryClient.ts:58](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/hooks/useAppQueryClient.ts#L58)

___

### FunctionWithMappedReturnType

Ƭ **FunctionWithMappedReturnType**: <Scope, Route\>(`routeOrRouteObj`: `Route` \| { `route`: `Route` ; `scope`: `Scope`  }, `appQueryOptions?`: `Partial`<[`AppQueryOptions`](modules.md#appqueryoptions-12)\>) => `Promise`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`\>\>

#### Type declaration

▸ <`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`): `Promise`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`\>\>

This type is like the previous one but it returns the type mapped by the route

##### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends keyof [`AppRoutes`](interfaces/AppRoutes.md) = ``"main"`` |
| `Route` | extends [`ApiRoute`](modules.md#apiroute-12)<`Scope`\> = [`ApiRoute`](modules.md#apiroute-12)<`Scope`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | `Partial`<[`AppQueryOptions`](modules.md#appqueryoptions-12)\> |

##### Returns

`Promise`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`\>\>

#### Defined in

[hooks/useAppQueryClient.ts:33](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/hooks/useAppQueryClient.ts#L33)

___

### FunctionWithTypedRouteAndOptions

Ƭ **FunctionWithTypedRouteAndOptions**<`ReturnType`\>: <Scope, Route\>(`routeOrRouteObj`: `Route` \| { `route`: `Route` ; `scope`: `Scope`  }, `appQueryOptions?`: `Partial`<[`AppQueryOptions`](modules.md#appqueryoptions-12)\>) => `ReturnType`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ReturnType` | `any` |

#### Type declaration

▸ <`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`): `ReturnType`

The function type used by most of the functions

##### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends keyof [`AppRoutes`](interfaces/AppRoutes.md) = ``"main"`` |
| `Route` | extends [`ApiRoute`](modules.md#apiroute-12)<`Scope`\> = [`ApiRoute`](modules.md#apiroute-12)<`Scope`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | `Partial`<[`AppQueryOptions`](modules.md#appqueryoptions-12)\> |

##### Returns

`ReturnType`

#### Defined in

[hooks/useAppQueryClient.ts:27](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/hooks/useAppQueryClient.ts#L27)

___

### HttpMethod

Ƭ **HttpMethod**: ``"GET"`` \| ``"POST"`` \| ``"PUT"`` \| ``"PATCH"`` \| ``"DELETE"``

#### Defined in

[networking/httpManager.ts:16](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/networking/httpManager.ts#L16)

___

### NestJsxModelRoute

Ƭ **NestJsxModelRoute**<`T`, `BasePath`\>: [`RoutesForModel`](modules.md#routesformodel-12)<`T`, `BasePath`, [`NestCrudResponseTypes`](interfaces/NestCrudResponseTypes.md)<[`RoutesModelMapping`](interfaces/RoutesModelMapping.md)[`T`]\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof [`RoutesModelMapping`](interfaces/RoutesModelMapping.md) |
| `BasePath` | extends `string` \| `unknown` = `unknown` |

#### Defined in

[crud/index.ts:168](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/crud/index.ts#L168)

___

### NestModelRoute

Ƭ **NestModelRoute**<`T`, `BasePath`\>: [`NestJsxModelRoute`](modules.md#nestjsxmodelroute-12)<`T`, `BasePath`\>

**`deprecated`**
use [NestJsxModelRoute](modules.md#nestjsxmodelroute-12) instead

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof [`RoutesModelMapping`](interfaces/RoutesModelMapping.md) |
| `BasePath` | extends `string` \| `unknown` = `unknown` |

#### Defined in

[crud/index.ts:174](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/crud/index.ts#L174)

___

### NetworkingConfig

Ƭ **NetworkingConfig**: [`ApiConfig`](modules.md#apiconfig-12)

**`deprecated`** use [ApiConfig](modules.md#apiconfig-12) instead

#### Defined in

[networking/httpManager.ts:118](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/networking/httpManager.ts#L118)

___

### RoutesForModel

Ƭ **RoutesForModel**<`CrudModel`, `BasePath`, `ActionTypesMapping`\>: { [key in AllRoutes<CrudModel, BasePath\>]: key extends \`${string}/bulk\` ? Object : key extends \`${string}/:id\` ? Object : key extends \`${string}/bulk-delete/:ids\` ? Object : key extends \`${string}\` ? Object : RoutesModelMapping[CrudModel] }

This interface is used to add a set of crud endpoints for a given model.
For more information about CRUD endpoints, see the [dedicated section](/docs/usage/crud) in the docs

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `CrudModel` | extends keyof [`RoutesModelMapping`](interfaces/RoutesModelMapping.md) | one of the keys in [RoutesModelMapping](interfaces/RoutesModelMapping.md) |
| `BasePath` | extends `string` \| `unknown` = `unknown` | this parameter is used to manipulate the endpoint url.<br/> The value you will put here will be added after the api base url you provided in the [initApi](/docs/api/modules#initapi) function call and before the resource name. For example, if you base api url is http://localhost:8080/api and your resource name is `resource1`, and you pass `custom-path` to this type param, the final endpoint will be http://localhost:8080/api/custom-path/resource1 |
| `ActionTypesMapping` | extends `CrudActionsDataMapping` = { `getManyResponse?`: [`DefaultGetManyResponse`](modules.md#defaultgetmanyresponse-12)<[`RoutesModelMapping`](interfaces/RoutesModelMapping.md)[`CrudModel`]\> ; `getOneResponse?`: [`DefaultGetOneResponse`](modules.md#defaultgetoneresponse-12)<[`RoutesModelMapping`](interfaces/RoutesModelMapping.md)[`CrudModel`]\> ; `saveManyPayload?`: [`DefaultSaveManyPayload`](modules.md#defaultsavemanypayload-12)<[`RoutesModelMapping`](interfaces/RoutesModelMapping.md)[`CrudModel`]\> ; `saveManyResponse?`: [`DefaultGetManyResponse`](modules.md#defaultgetmanyresponse-12)<[`RoutesModelMapping`](interfaces/RoutesModelMapping.md)[`CrudModel`]\> ; `saveOnePayload?`: [`DefaultSaveOnePayload`](modules.md#defaultsaveonepayload-12)<[`RoutesModelMapping`](interfaces/RoutesModelMapping.md)[`CrudModel`]\> ; `saveOneResponse?`: [`DefaultGetOneResponse`](modules.md#defaultgetoneresponse-12)<[`RoutesModelMapping`](interfaces/RoutesModelMapping.md)[`CrudModel`]\>  } | this parameter is used to manipulate the type of the payloads and responses for the crud endpoints. See the [dedicated section](/docs/usage/crud#data-types-customization) for more information. |

#### Defined in

[crud/index.ts:114](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/crud/index.ts#L114)

___

### SetMutationDefaultsFunction

Ƭ **SetMutationDefaultsFunction**: <Scope, Route\>(`routeOrRouteObj`: `Route` \| { `route`: `Route` ; `scope`: `Scope`  }, `appQueryOptions?`: `Partial`<[`AppQueryOptions`](modules.md#appqueryoptions-12)\>, `mutationObserverOptions?`: `MutationObserverOptions`<`any`, `any`, `any`, `any`\>) => `void`

#### Type declaration

▸ <`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`, `mutationObserverOptions?`): `void`

This type is is only needed for setMutationDefaults because it needs mutationObserverOptions

##### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends keyof [`AppRoutes`](interfaces/AppRoutes.md) = ``"main"`` |
| `Route` | extends [`ApiRoute`](modules.md#apiroute-12)<`Scope`\> = [`ApiRoute`](modules.md#apiroute-12)<`Scope`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | `Partial`<[`AppQueryOptions`](modules.md#appqueryoptions-12)\> |
| `mutationObserverOptions?` | `MutationObserverOptions`<`any`, `any`, `any`, `any`\> |

##### Returns

`void`

#### Defined in

[hooks/useAppQueryClient.ts:45](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/hooks/useAppQueryClient.ts#L45)

___

### SetQueryDataFunction

Ƭ **SetQueryDataFunction**: <Scope, Route\>(`routeOrRouteObj`: `Route` \| { `route`: `Route` ; `scope`: `Scope`  }, `updater`: `Updater`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`\>, [`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`\>\>, `appQueryOptions?`: `Partial`<[`AppQueryOptions`](modules.md#appqueryoptions-12)\>) => [`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`\>

#### Type declaration

▸ <`Scope`, `Route`\>(`routeOrRouteObj`, `updater`, `appQueryOptions?`): [`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`\>

This type only needed for setQueryData because it needs the updater param

##### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends keyof [`AppRoutes`](interfaces/AppRoutes.md) = ``"main"`` |
| `Route` | extends [`ApiRoute`](modules.md#apiroute-12)<`Scope`\> = [`ApiRoute`](modules.md#apiroute-12)<`Scope`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `updater` | `Updater`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`\>, [`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`\>\> |
| `appQueryOptions?` | `Partial`<[`AppQueryOptions`](modules.md#appqueryoptions-12)\> |

##### Returns

[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`\>

#### Defined in

[hooks/useAppQueryClient.ts:51](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/hooks/useAppQueryClient.ts#L51)

___

### SetQueryDefaultsFunction

Ƭ **SetQueryDefaultsFunction**: <Scope, Route\>(`routeOrRouteObj`: `Route` \| { `route`: `Route` ; `scope`: `Scope`  }, `appQueryOptions?`: `Partial`<[`AppQueryOptions`](modules.md#appqueryoptions-12)\>, `queryObserverOptions?`: `QueryObserverOptions`<`any`, `any`, `any`, `any`\>) => `void`

#### Type declaration

▸ <`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`, `queryObserverOptions?`): `void`

This type is is only needed for setQueryDefaults because it needs queryObserverOptions

##### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends keyof [`AppRoutes`](interfaces/AppRoutes.md) = ``"main"`` |
| `Route` | extends [`ApiRoute`](modules.md#apiroute-12)<`Scope`\> = [`ApiRoute`](modules.md#apiroute-12)<`Scope`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | `Partial`<[`AppQueryOptions`](modules.md#appqueryoptions-12)\> |
| `queryObserverOptions?` | `QueryObserverOptions`<`any`, `any`, `any`, `any`\> |

##### Returns

`void`

#### Defined in

[hooks/useAppQueryClient.ts:39](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/hooks/useAppQueryClient.ts#L39)

## Variables

### appQueryBuilder

• `Const` **appQueryBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `nestJsx` | (`queryOptions`: `Omit`<`CreateQueryParams`, ``"join"``\> & { `join?`: `string`[]  }) => `RequestQueryBuilder` |

#### Defined in

[helpers/appQueryBuilder.ts:34](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/helpers/appQueryBuilder.ts#L34)

___

### appQueryUtils

• `Const` **appQueryUtils**: `Object`

**`deprecated`**
Use appQueryBuilder instead

#### Type declaration

| Name | Type |
| :------ | :------ |
| `buildQuery` | (`queryOptions`: `Omit`<`CreateQueryParams`, ``"join"``\> & { `join?`: `string`[]  }) => `RequestQueryBuilder` |

#### Defined in

[helpers/appQueryUtils.ts:15](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/helpers/appQueryUtils.ts#L15)

## Functions

### AppQuery

▸ **AppQuery**<`Scope`, `T`\>(`props`): `JSX.Element`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` |
| `T` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](interfaces/AppRoutes.md)[`Scope`] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `AppQueryProps`<`Scope`, `T`\> |

#### Returns

`JSX.Element`

#### Defined in

[components/AppQuery.ts:10](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/components/AppQuery.ts#L10)

___

### httpDelete

▸ **httpDelete**<`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`): `Promise`<{ `result`: `boolean`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](interfaces/AppRoutes.md)[`Scope`] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | [`AppQueryOptions`](modules.md#appqueryoptions-12)<[`ApiPayloadType`](modules.md#apipayloadtype-12)<`Scope`, `Route`\>\> |

#### Returns

`Promise`<{ `result`: `boolean`  }\>

#### Defined in

[imperative/index.ts:55](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/imperative/index.ts#L55)

___

### httpGet

▸ **httpGet**<`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`): `Promise`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`\>\>

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` | the api scope |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](interfaces/AppRoutes.md)[`Scope`] | One route in the scope |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } | A string or an object containig  a key of [AppRoutes](interfaces/AppRoutes.md) containing the parameter. |
| `appQueryOptions?` | [`AppQueryOptions`](modules.md#appqueryoptions-12)<`any`\> |  |

#### Returns

`Promise`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`\>\>

#### Defined in

[imperative/index.ts:27](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/imperative/index.ts#L27)

___

### httpPatch

▸ **httpPatch**<`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`): `Promise`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`, ``"mutation"``\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](interfaces/AppRoutes.md)[`Scope`] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | [`AppQueryOptions`](modules.md#appqueryoptions-12)<[`ApiPayloadType`](modules.md#apipayloadtype-12)<`Scope`, `Route`\>\> |

#### Returns

`Promise`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`, ``"mutation"``\>\>

#### Defined in

[imperative/index.ts:48](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/imperative/index.ts#L48)

___

### httpPost

▸ **httpPost**<`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`): `Promise`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`, ``"mutation"``\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](interfaces/AppRoutes.md)[`Scope`] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | [`AppQueryOptions`](modules.md#appqueryoptions-12)<[`ApiPayloadType`](modules.md#apipayloadtype-12)<`Scope`, `Route`\>\> |

#### Returns

`Promise`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`, ``"mutation"``\>\>

#### Defined in

[imperative/index.ts:34](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/imperative/index.ts#L34)

___

### httpPut

▸ **httpPut**<`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`): `Promise`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`, ``"mutation"``\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](interfaces/AppRoutes.md)[`Scope`] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | [`AppQueryOptions`](modules.md#appqueryoptions-12)<[`ApiPayloadType`](modules.md#apipayloadtype-12)<`Scope`, `Route`\>\> |

#### Returns

`Promise`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`, ``"mutation"``\>\>

#### Defined in

[imperative/index.ts:41](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/imperative/index.ts#L41)

___

### httpRequest

▸ **httpRequest**(`options`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`HttpRequestOptions`](interfaces/HttpRequestOptions.md)<`any`\> |

#### Returns

`Promise`<`any`\>

#### Defined in

[networking/httpManager.ts:178](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/networking/httpManager.ts#L178)

___

### initApi

▸ **initApi**(`config`): `void`

This function must be called as soon as possible in you application lifecycle,
in any case it must be called before any api request.
See how to use it in the [usage section](/docs/usage/basic-usage)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ApiConfig`](modules.md#apiconfig-12) |

#### Returns

`void`

#### Defined in

[networking/httpManager.ts:137](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/networking/httpManager.ts#L137)

___

### initNetworking

▸ **initNetworking**(`config`): `void`

**`deprecated`**
use  [initApi](modules.md#initapi-12) instead

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ApiConfig`](modules.md#apiconfig-12) |

#### Returns

`void`

#### Defined in

[networking/httpManager.ts:176](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/networking/httpManager.ts#L176)

___

### useAppMutation

▸ **useAppMutation**<`Scope`, `Route`\>(`route`, `queryOptions?`, `mutationOptions?`): `UseMutationResult`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`, ``"mutation"``\>, `any`, [`ApiPayloadType`](modules.md#apipayloadtype-12)<`Scope`, `Route`\> & { `_pathParams?`: { `[key: string]`: `any`;  }  }, `any`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](interfaces/AppRoutes.md)[`Scope`] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `route` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } | a route from AppRoutes or an object with a scope and a route |
| `queryOptions` | `Partial`<`Omit`<[`AppQueryOptions`](modules.md#appqueryoptions-12)<[`ApiPayloadType`](modules.md#apipayloadtype-12)<`Scope`, `Route`\>\>, ``"apiScope"``\>\> | http options for the query. Path params is needed to replace path variables |
| `mutationOptions` | `UseMutationOptions`<`unknown`, `unknown`, `void`, `unknown`\> | react-query's mutation options |

#### Returns

`UseMutationResult`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`, ``"mutation"``\>, `any`, [`ApiPayloadType`](modules.md#apipayloadtype-12)<`Scope`, `Route`\> & { `_pathParams?`: { `[key: string]`: `any`;  }  }, `any`\>

#### Defined in

[hooks/useAppMutation.ts:13](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/hooks/useAppMutation.ts#L13)

___

### useAppQuery

▸ **useAppQuery**<`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`, `useQueryOptions?`): `UseQueryResult`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`\>\>

Alias for array

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` | One of the keys of [AppRoutes](interfaces/AppRoutes.md) |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](interfaces/AppRoutes.md)[`Scope`] | - |

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions` | `Partial`<`Omit`<[`AppQueryOptions`](modules.md#appqueryoptions-12)<`any`\>, ``"payload"`` \| ``"apiScope"``\>\> |
| `useQueryOptions` | `UseQueryOptions`<`unknown`, `unknown`, `unknown`, `QueryKey`\> |

#### Returns

`UseQueryResult`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`\>\>

#### Defined in

[hooks/useAppQuery.ts:13](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/hooks/useAppQuery.ts#L13)

___

### useAppQueryClient

▸ **useAppQueryClient**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `cancelQueries` | [`FunctionWithTypedRouteAndOptions`](modules.md#functionwithtypedrouteandoptions-12)<`Promise`<`void`\>\> |
| `executeMutation` | [`ExecuteMutationFunction`](modules.md#executemutationfunction-12) |
| `fetchQuery` | [`FunctionWithMappedReturnType`](modules.md#functionwithmappedreturntype-12) |
| `getMutationDefaults` | [`FunctionWithTypedRouteAndOptions`](modules.md#functionwithtypedrouteandoptions-12)<`undefined` \| `MutationObserverOptions`<`any`, `any`, `any`, `any`\>\> |
| `getQueryData` | [`FunctionWithMappedReturnType`](modules.md#functionwithmappedreturntype-12) |
| `getQueryDefaults` | [`FunctionWithTypedRouteAndOptions`](modules.md#functionwithtypedrouteandoptions-12)<`undefined` \| `QueryObserverOptions`<`any`, `any`, `any`, `any`, `any`\>\> |
| `invalidateAppQueries` | [`FunctionWithTypedRouteAndOptions`](modules.md#functionwithtypedrouteandoptions-12)<`Promise`<`void`\>\> |
| `invalidateQueries` | [`FunctionWithTypedRouteAndOptions`](modules.md#functionwithtypedrouteandoptions-12)<`Promise`<`void`\>\> |
| `isFetching` | [`FunctionWithTypedRouteAndOptions`](modules.md#functionwithtypedrouteandoptions-12)<`number`\> |
| `isMutating` | [`FunctionWithTypedRouteAndOptions`](modules.md#functionwithtypedrouteandoptions-12)<`number`\> |
| `prefetchQuery` | [`FunctionWithTypedRouteAndOptions`](modules.md#functionwithtypedrouteandoptions-12)<`Promise`<`void`\>\> |
| `refetchAppQueries` | [`FunctionWithTypedRouteAndOptions`](modules.md#functionwithtypedrouteandoptions-12)<`Promise`<`void`\>\> |
| `refetchQueries` | [`FunctionWithTypedRouteAndOptions`](modules.md#functionwithtypedrouteandoptions-12)<`Promise`<`void`\>\> |
| `removeQueries` | [`FunctionWithTypedRouteAndOptions`](modules.md#functionwithtypedrouteandoptions-12)<`void`\> |
| `resetQueries` | [`FunctionWithTypedRouteAndOptions`](modules.md#functionwithtypedrouteandoptions-12)<`Promise`<`void`\>\> |
| `setDefaultOptions` | [`FunctionWithTypedRouteAndOptions`](modules.md#functionwithtypedrouteandoptions-12)<`void`\> |
| `setMutationDefaults` | [`SetMutationDefaultsFunction`](modules.md#setmutationdefaultsfunction-12) |
| `setQueryData` | [`SetQueryDataFunction`](modules.md#setquerydatafunction-12) |
| `setQueryDefaults` | [`SetQueryDefaultsFunction`](modules.md#setquerydefaultsfunction-12) |

#### Defined in

[hooks/useAppQueryClient.ts:61](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/hooks/useAppQueryClient.ts#L61)

___

### useInfiniteAppQuery

▸ **useInfiniteAppQuery**<`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`, `useQueryOptions?`): `UseInfiniteQueryResult`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](interfaces/AppRoutes.md)[`Scope`] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions` | `Partial`<[`AppQueryOptions`](modules.md#appqueryoptions-12)<`any`\>\> |
| `useQueryOptions` | `UseInfiniteQueryOptions`<`unknown`, `unknown`, `unknown`, `unknown`, `QueryKey`\> |

#### Returns

`UseInfiniteQueryResult`<[`ApiResponseType`](modules.md#apiresponsetype-12)<`Scope`, `Route`\>\>

#### Defined in

[hooks/useInfiniteAppQuery.ts:7](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/hooks/useInfiniteAppQuery.ts#L7)
