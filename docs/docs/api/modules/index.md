---
id: "index"
title: "Module: index"
sidebar_label: "index"
sidebar_position: 0
custom_edit_url: null
---

## Interfaces

- [AppRoutes](../interfaces/.AppRoutes)
- [HttpRequestOptions](../interfaces/.HttpRequestOptions)
- [MainApi](../interfaces/.MainApi)

## References

### CrudRoutes

Re-exports [CrudRoutes](crud.md#crudroutes-4)

___

### CustomCrudRoutes

Re-exports [CustomCrudRoutes](../interfaces/crud.CustomCrudRoutes.md)

___

### DefaultDeleteManyPayload

Re-exports [DefaultDeleteManyPayload](crud.md#defaultdeletemanypayload-4)

___

### DefaultDeleteManyResponse

Re-exports [DefaultDeleteManyResponse](crud.md#defaultdeletemanyresponse-4)

___

### DefaultGetManyResponse

Re-exports [DefaultGetManyResponse](../interfaces/crud.DefaultGetManyResponse.md)

___

### DefaultGetOneResponse

Re-exports [DefaultGetOneResponse](crud.md#defaultgetoneresponse-4)

___

### DefaultSaveManyPayload

Re-exports [DefaultSaveManyPayload](../interfaces/crud.DefaultSaveManyPayload.md)

___

### DefaultSaveOnePayload

Re-exports [DefaultSaveOnePayload](../interfaces/crud.DefaultSaveOnePayload.md)

___

### DefaultSaveOneResponse

Re-exports [DefaultSaveOneResponse](crud.md#defaultsaveoneresponse-4)

___

### NestCrudResponseTypes

Re-exports [NestCrudResponseTypes](../interfaces/crud.NestCrudResponseTypes.md)

___

### NestJsxModelRoute

Re-exports [NestJsxModelRoute](crud.md#nestjsxmodelroute-4)

___

### NestModelRoute

Re-exports [NestModelRoute](crud.md#nestmodelroute-4)

___

### RoutesForModel

Re-exports [RoutesForModel](crud.md#routesformodel-4)

___

### RoutesModelMapping

Re-exports [RoutesModelMapping](../interfaces/crud.RoutesModelMapping.md)

___

### httpDelete

Re-exports [httpDelete](imperative.md#httpdelete-4)

___

### httpGet

Re-exports [httpGet](imperative.md#httpget-4)

___

### httpPatch

Re-exports [httpPatch](imperative.md#httppatch-4)

___

### httpPost

Re-exports [httpPost](imperative.md#httppost-4)

___

### httpPut

Re-exports [httpPut](imperative.md#httpput-4)

## Type aliases

### ApiConfig

Ƭ **ApiConfig**: `Object`

Configuration object for the apiaaa

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `loggingEnabled?` | `boolean` | - |
| `servers` | { [key in keyof AppRoutes]: ApiServerConfig } | A key-value pair where the key are all the keys in [AppRoutes](../interfaces/.AppRoutes), and the value an [ApiServerConfig](#apiserverconfig-4) object |

#### Defined in

[networking/httpManager.ts:105](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/networking/httpManager.ts#L105)

___

### ApiPayloadType

Ƭ **ApiPayloadType**<`Scope`, `Route`\>: [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`][`Route`] extends { `payloadType?`: infer P  } ? `P` : [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`][`Route`] extends { `responseType`: infer D  } ? `D` : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends keyof [`AppRoutes`](../interfaces/.AppRoutes) |
| `Route` | extends keyof [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`] |

#### Defined in

[index.ts:90](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/index.ts#L90)

___

### ApiResponseType

Ƭ **ApiResponseType**<`Scope`, `Route`, `Type`\>: `Type` extends ``"mutation"`` ? [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`][`Route`] extends { `mutationResponseType`: infer M  } ? `M` : [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`][`Route`] extends { `responseType`: infer D  } ? `D` : \`mutation is missing both responseType and mutationResponseType from the route ${Route} in api scope ${Scope}\` : [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`][`Route`] extends { `responseType`: infer D  } ? `D` : \`endpoint definition is missing responseType from the route ${Route} in api scope ${Scope}. Click here to learn how to define endpoints https://apperside.com\`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends keyof [`AppRoutes`](../interfaces/.AppRoutes) |
| `Route` | extends keyof [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`] |
| `Type` | extends ``"query"`` \| ``"mutation"`` = ``"query"`` |

#### Defined in

[index.ts:76](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/index.ts#L76)

___

### ApiRoute

Ƭ **ApiRoute**<`Scope`\>: keyof [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends keyof [`AppRoutes`](../interfaces/.AppRoutes) = ``"main"`` |

#### Defined in

[index.ts:74](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/index.ts#L74)

___

### ApiScope

Ƭ **ApiScope**: keyof [`AppRoutes`](../interfaces/.AppRoutes)

An app can make use of more than one api, and that is where ApiScope comes into play.
By augmenting [AppRoutes](../interfaces/.AppRoutes) with as many keys as you need, you will have full type inferring
for all of your endpoints

#### Defined in

[index.ts:72](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/index.ts#L72)

___

### ApiServerConfig

Ƭ **ApiServerConfig**: `Object`

Api configuration

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiUrl` | `string` | - |
| `axiosConfig?` | `AxiosRequestConfig` | - |
| `errorHandlers?` | [`CustomErrorHandler`](#customerrorhandler-4)[] | - |
| `headers?` | { `[key: string]`: `string` \| (`options`: [`HttpRequestOptions`](../interfaces/.HttpRequestOptions)) => `string`;  } | - |
| `requestInterceptor?` | [`CustomRequestHandler`](#customrequesthandler-4) | - |
| `responseHandlers?` | [`CustomResponseHandler`](#customresponsehandler-4)[] | - |
| `timeout?` | `number` | - |
| `tokenLocalStorageKey?` | `string` | The name of the localstorage key that will be used to store and read the token. Evety request market as authenticated will put in the header the token as Bearer. TODO: Handle Multiple methods. in the meanwhile it possible to use the headers config key to build custom headers |

#### Defined in

[networking/httpManager.ts:85](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/networking/httpManager.ts#L85)

___

### AppEndpoint

Ƭ **AppEndpoint**: `Object`

This type represent the structure of one endpoint.

#### Index signature

▪ [key: `string`]: { `mutationResponseType?`: `any` ; `payloadType?`: `any` ; `responseType`: `any`  }

#### Defined in

[index.ts:25](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/index.ts#L25)

___

### AppQueryOptions

Ƭ **AppQueryOptions**<`Payload`\>: { `pathParams?`: { `[key: string]`: `any`;  }  } & `Omit`<[`HttpRequestOptions`](../interfaces/.HttpRequestOptions)<`Payload`\>, ``"url"``\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `any` |

#### Defined in

[hooks/index.ts:9](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/hooks/index.ts#L9)

___

### CustomErrorHandler

Ƭ **CustomErrorHandler**: (`error`: `any`, `config`: [`HttpRequestOptions`](../interfaces/.HttpRequestOptions)) => `any`

#### Type declaration

▸ (`error`, `config`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `any` |
| `config` | [`HttpRequestOptions`](../interfaces/.HttpRequestOptions) |

##### Returns

`any`

#### Defined in

[networking/httpManager.ts:77](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/networking/httpManager.ts#L77)

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

[networking/httpManager.ts:75](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/networking/httpManager.ts#L75)

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

[networking/httpManager.ts:76](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/networking/httpManager.ts#L76)

___

### ExecuteMutationFunction

Ƭ **ExecuteMutationFunction**: <Scope, Route\>(`routeOrRouteObj`: `Route` \| { `route`: `Route` ; `scope`: `Scope`  }, `appQueryOptions?`: `Partial`<[`AppQueryOptions`](#appqueryoptions-4)<[`ApiPayloadType`](#apipayloadtype-4)<`Scope`, `Route`\>\>\>) => `Promise`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`, ``"mutation"``\>\>

#### Type declaration

▸ <`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`): `Promise`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`, ``"mutation"``\>\>

This type only needed for executeMutation because it returns mutation mapped return type

##### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends keyof [`AppRoutes`](../interfaces/.AppRoutes) = ``"main"`` |
| `Route` | extends [`ApiRoute`](#apiroute-4)<`Scope`\> = [`ApiRoute`](#apiroute-4)<`Scope`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | `Partial`<[`AppQueryOptions`](#appqueryoptions-4)<[`ApiPayloadType`](#apipayloadtype-4)<`Scope`, `Route`\>\>\> |

##### Returns

`Promise`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`, ``"mutation"``\>\>

#### Defined in

[hooks/useAppQueryClient.ts:58](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/hooks/useAppQueryClient.ts#L58)

___

### FunctionWithMappedReturnType

Ƭ **FunctionWithMappedReturnType**: <Scope, Route\>(`routeOrRouteObj`: `Route` \| { `route`: `Route` ; `scope`: `Scope`  }, `appQueryOptions?`: `Partial`<[`AppQueryOptions`](#appqueryoptions-4)\>) => `Promise`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`\>\>

#### Type declaration

▸ <`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`): `Promise`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`\>\>

This type is like the previous one but it returns the type mapped by the route

##### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends keyof [`AppRoutes`](../interfaces/.AppRoutes) = ``"main"`` |
| `Route` | extends [`ApiRoute`](#apiroute-4)<`Scope`\> = [`ApiRoute`](#apiroute-4)<`Scope`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | `Partial`<[`AppQueryOptions`](#appqueryoptions-4)\> |

##### Returns

`Promise`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`\>\>

#### Defined in

[hooks/useAppQueryClient.ts:33](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/hooks/useAppQueryClient.ts#L33)

___

### FunctionWithTypedRouteAndOptions

Ƭ **FunctionWithTypedRouteAndOptions**<`ReturnType`\>: <Scope, Route\>(`routeOrRouteObj`: `Route` \| { `route`: `Route` ; `scope`: `Scope`  }, `appQueryOptions?`: `Partial`<[`AppQueryOptions`](#appqueryoptions-4)\>) => `ReturnType`

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
| `Scope` | extends keyof [`AppRoutes`](../interfaces/.AppRoutes) = ``"main"`` |
| `Route` | extends [`ApiRoute`](#apiroute-4)<`Scope`\> = [`ApiRoute`](#apiroute-4)<`Scope`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | `Partial`<[`AppQueryOptions`](#appqueryoptions-4)\> |

##### Returns

`ReturnType`

#### Defined in

[hooks/useAppQueryClient.ts:27](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/hooks/useAppQueryClient.ts#L27)

___

### HttpMethod

Ƭ **HttpMethod**: ``"GET"`` \| ``"POST"`` \| ``"PUT"`` \| ``"PATCH"`` \| ``"DELETE"``

#### Defined in

[networking/httpManager.ts:16](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/networking/httpManager.ts#L16)

___

### NetworkingConfig

Ƭ **NetworkingConfig**: [`ApiConfig`](#apiconfig-4)

**`deprecated`** use [ApiConfig](#apiconfig-4) instead

#### Defined in

[networking/httpManager.ts:118](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/networking/httpManager.ts#L118)

___

### SetMutationDefaultsFunction

Ƭ **SetMutationDefaultsFunction**: <Scope, Route\>(`routeOrRouteObj`: `Route` \| { `route`: `Route` ; `scope`: `Scope`  }, `appQueryOptions?`: `Partial`<[`AppQueryOptions`](#appqueryoptions-4)\>, `mutationObserverOptions?`: `MutationObserverOptions`<`any`, `any`, `any`, `any`\>) => `void`

#### Type declaration

▸ <`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`, `mutationObserverOptions?`): `void`

This type is is only needed for setMutationDefaults because it needs mutationObserverOptions

##### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends keyof [`AppRoutes`](../interfaces/.AppRoutes) = ``"main"`` |
| `Route` | extends [`ApiRoute`](#apiroute-4)<`Scope`\> = [`ApiRoute`](#apiroute-4)<`Scope`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | `Partial`<[`AppQueryOptions`](#appqueryoptions-4)\> |
| `mutationObserverOptions?` | `MutationObserverOptions`<`any`, `any`, `any`, `any`\> |

##### Returns

`void`

#### Defined in

[hooks/useAppQueryClient.ts:45](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/hooks/useAppQueryClient.ts#L45)

___

### SetQueryDataFunction

Ƭ **SetQueryDataFunction**: <Scope, Route\>(`routeOrRouteObj`: `Route` \| { `route`: `Route` ; `scope`: `Scope`  }, `updater`: `Updater`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`\>, [`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`\>\>, `appQueryOptions?`: `Partial`<[`AppQueryOptions`](#appqueryoptions-4)\>) => [`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`\>

#### Type declaration

▸ <`Scope`, `Route`\>(`routeOrRouteObj`, `updater`, `appQueryOptions?`): [`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`\>

This type only needed for setQueryData because it needs the updater param

##### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends keyof [`AppRoutes`](../interfaces/.AppRoutes) = ``"main"`` |
| `Route` | extends [`ApiRoute`](#apiroute-4)<`Scope`\> = [`ApiRoute`](#apiroute-4)<`Scope`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `updater` | `Updater`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`\>, [`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`\>\> |
| `appQueryOptions?` | `Partial`<[`AppQueryOptions`](#appqueryoptions-4)\> |

##### Returns

[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`\>

#### Defined in

[hooks/useAppQueryClient.ts:51](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/hooks/useAppQueryClient.ts#L51)

___

### SetQueryDefaultsFunction

Ƭ **SetQueryDefaultsFunction**: <Scope, Route\>(`routeOrRouteObj`: `Route` \| { `route`: `Route` ; `scope`: `Scope`  }, `appQueryOptions?`: `Partial`<[`AppQueryOptions`](#appqueryoptions-4)\>, `queryObserverOptions?`: `QueryObserverOptions`<`any`, `any`, `any`, `any`\>) => `void`

#### Type declaration

▸ <`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`, `queryObserverOptions?`): `void`

This type is is only needed for setQueryDefaults because it needs queryObserverOptions

##### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends keyof [`AppRoutes`](../interfaces/.AppRoutes) = ``"main"`` |
| `Route` | extends [`ApiRoute`](#apiroute-4)<`Scope`\> = [`ApiRoute`](#apiroute-4)<`Scope`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | `Partial`<[`AppQueryOptions`](#appqueryoptions-4)\> |
| `queryObserverOptions?` | `QueryObserverOptions`<`any`, `any`, `any`, `any`\> |

##### Returns

`void`

#### Defined in

[hooks/useAppQueryClient.ts:39](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/hooks/useAppQueryClient.ts#L39)

## Variables

### appQueryBuilder

• `Const` **appQueryBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `nestJsx` | (`queryOptions`: `Omit`<`CreateQueryParams`, ``"join"``\> & { `join?`: `string`[]  }) => `RequestQueryBuilder` |

#### Defined in

[helpers/appQueryBuilder.ts:34](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/helpers/appQueryBuilder.ts#L34)

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

[helpers/appQueryUtils.ts:15](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/helpers/appQueryUtils.ts#L15)

## Functions

### AppQuery

▸ **AppQuery**<`Scope`, `T`\>(`props`): `JSX.Element`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` |
| `T` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `AppQueryProps`<`Scope`, `T`\> |

#### Returns

`JSX.Element`

#### Defined in

[components/AppQuery.ts:10](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/components/AppQuery.ts#L10)

___

### httpRequest

▸ **httpRequest**(`options`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`HttpRequestOptions`](../interfaces/.HttpRequestOptions)<`any`\> |

#### Returns

`Promise`<`any`\>

#### Defined in

[networking/httpManager.ts:178](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/networking/httpManager.ts#L178)

___

### initApi

▸ **initApi**(`config`): `void`

This function must be called as soon as possible in you application lifecycle,
in any case it must be called before any api request.
See how to use it in the [usage section](/docs/usage/basic-usage)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ApiConfig`](#apiconfig-4) |

#### Returns

`void`

#### Defined in

[networking/httpManager.ts:137](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/networking/httpManager.ts#L137)

___

### initNetworking

▸ **initNetworking**(`config`): `void`

**`deprecated`**
use  [initApi](#initapi-4) instead

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ApiConfig`](#apiconfig-4) |

#### Returns

`void`

#### Defined in

[networking/httpManager.ts:176](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/networking/httpManager.ts#L176)

___

### useAppMutation

▸ **useAppMutation**<`Scope`, `Route`\>(`route`, `queryOptions?`, `mutationOptions?`): `UseMutationResult`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`, ``"mutation"``\>, `any`, [`ApiPayloadType`](#apipayloadtype-4)<`Scope`, `Route`\> & { `_pathParams?`: { `[key: string]`: `any`;  }  }, `any`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `route` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } | a route from AppRoutes or an object with a scope and a route |
| `queryOptions` | `Partial`<`Omit`<[`AppQueryOptions`](#appqueryoptions-4)<[`ApiPayloadType`](#apipayloadtype-4)<`Scope`, `Route`\>\>, ``"apiScope"``\>\> | http options for the query. Path params is needed to replace path variables |
| `mutationOptions` | `UseMutationOptions`<`unknown`, `unknown`, `void`, `unknown`\> | react-query's mutation options |

#### Returns

`UseMutationResult`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`, ``"mutation"``\>, `any`, [`ApiPayloadType`](#apipayloadtype-4)<`Scope`, `Route`\> & { `_pathParams?`: { `[key: string]`: `any`;  }  }, `any`\>

#### Defined in

[hooks/useAppMutation.ts:13](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/hooks/useAppMutation.ts#L13)

___

### useAppQuery

▸ **useAppQuery**<`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`, `useQueryOptions?`): `UseQueryResult`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`\>\>

Alias for array

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` | One of the keys of [AppRoutes](../interfaces/.AppRoutes) |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`] | - |

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions` | `Partial`<`Omit`<[`AppQueryOptions`](#appqueryoptions-4)<`any`\>, ``"payload"`` \| ``"apiScope"``\>\> |
| `useQueryOptions` | `UseQueryOptions`<`unknown`, `unknown`, `unknown`, `QueryKey`\> |

#### Returns

`UseQueryResult`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`\>\>

#### Defined in

[hooks/useAppQuery.ts:13](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/hooks/useAppQuery.ts#L13)

___

### useAppQueryClient

▸ **useAppQueryClient**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `cancelQueries` | [`FunctionWithTypedRouteAndOptions`](#functionwithtypedrouteandoptions-4)<`Promise`<`void`\>\> |
| `executeMutation` | [`ExecuteMutationFunction`](#executemutationfunction-4) |
| `fetchQuery` | [`FunctionWithMappedReturnType`](#functionwithmappedreturntype-4) |
| `getMutationDefaults` | [`FunctionWithTypedRouteAndOptions`](#functionwithtypedrouteandoptions-4)<`undefined` \| `MutationObserverOptions`<`any`, `any`, `any`, `any`\>\> |
| `getQueryData` | [`FunctionWithMappedReturnType`](#functionwithmappedreturntype-4) |
| `getQueryDefaults` | [`FunctionWithTypedRouteAndOptions`](#functionwithtypedrouteandoptions-4)<`undefined` \| `QueryObserverOptions`<`any`, `any`, `any`, `any`, `any`\>\> |
| `invalidateAppQueries` | [`FunctionWithTypedRouteAndOptions`](#functionwithtypedrouteandoptions-4)<`Promise`<`void`\>\> |
| `invalidateQueries` | [`FunctionWithTypedRouteAndOptions`](#functionwithtypedrouteandoptions-4)<`Promise`<`void`\>\> |
| `isFetching` | [`FunctionWithTypedRouteAndOptions`](#functionwithtypedrouteandoptions-4)<`number`\> |
| `isMutating` | [`FunctionWithTypedRouteAndOptions`](#functionwithtypedrouteandoptions-4)<`number`\> |
| `prefetchQuery` | [`FunctionWithTypedRouteAndOptions`](#functionwithtypedrouteandoptions-4)<`Promise`<`void`\>\> |
| `refetchAppQueries` | [`FunctionWithTypedRouteAndOptions`](#functionwithtypedrouteandoptions-4)<`Promise`<`void`\>\> |
| `refetchQueries` | [`FunctionWithTypedRouteAndOptions`](#functionwithtypedrouteandoptions-4)<`Promise`<`void`\>\> |
| `removeQueries` | [`FunctionWithTypedRouteAndOptions`](#functionwithtypedrouteandoptions-4)<`void`\> |
| `resetQueries` | [`FunctionWithTypedRouteAndOptions`](#functionwithtypedrouteandoptions-4)<`Promise`<`void`\>\> |
| `setDefaultOptions` | [`FunctionWithTypedRouteAndOptions`](#functionwithtypedrouteandoptions-4)<`void`\> |
| `setMutationDefaults` | [`SetMutationDefaultsFunction`](#setmutationdefaultsfunction-4) |
| `setQueryData` | [`SetQueryDataFunction`](#setquerydatafunction-4) |
| `setQueryDefaults` | [`SetQueryDefaultsFunction`](#setquerydefaultsfunction-4) |

#### Defined in

[hooks/useAppQueryClient.ts:61](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/hooks/useAppQueryClient.ts#L61)

___

### useInfiniteAppQuery

▸ **useInfiniteAppQuery**<`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`, `useQueryOptions?`): `UseInfiniteQueryResult`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions` | `Partial`<[`AppQueryOptions`](#appqueryoptions-4)<`any`\>\> |
| `useQueryOptions` | `UseInfiniteQueryOptions`<`unknown`, `unknown`, `unknown`, `unknown`, `QueryKey`\> |

#### Returns

`UseInfiniteQueryResult`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`\>\>

#### Defined in

[hooks/useInfiniteAppQuery.ts:7](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/hooks/useInfiniteAppQuery.ts#L7)
