---
id: "imperative"
title: "Module: imperative"
sidebar_label: "imperative"
sidebar_position: 0
custom_edit_url: null
---

## Functions

### httpDelete

▸ **httpDelete**<`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`): `Promise`<{ `result`: `boolean`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | [`AppQueryOptions`](#appqueryoptions-4)<[`ApiPayloadType`](#apipayloadtype-4)<`Scope`, `Route`\>\> |

#### Returns

`Promise`<{ `result`: `boolean`  }\>

#### Defined in

[imperative/index.ts:55](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/imperative/index.ts#L55)

___

### httpGet

▸ **httpGet**<`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`): `Promise`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`\>\>

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` | the api scope |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`] | One route in the scope |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } | A string or an object containig  a key of [AppRoutes](../interfaces/.AppRoutes) containing the parameter. |
| `appQueryOptions?` | [`AppQueryOptions`](#appqueryoptions-4)<`any`\> |  |

#### Returns

`Promise`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`\>\>

#### Defined in

[imperative/index.ts:27](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/imperative/index.ts#L27)

___

### httpPatch

▸ **httpPatch**<`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`): `Promise`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`, ``"mutation"``\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | [`AppQueryOptions`](#appqueryoptions-4)<[`ApiPayloadType`](#apipayloadtype-4)<`Scope`, `Route`\>\> |

#### Returns

`Promise`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`, ``"mutation"``\>\>

#### Defined in

[imperative/index.ts:48](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/imperative/index.ts#L48)

___

### httpPost

▸ **httpPost**<`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`): `Promise`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`, ``"mutation"``\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | [`AppQueryOptions`](#appqueryoptions-4)<[`ApiPayloadType`](#apipayloadtype-4)<`Scope`, `Route`\>\> |

#### Returns

`Promise`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`, ``"mutation"``\>\>

#### Defined in

[imperative/index.ts:34](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/imperative/index.ts#L34)

___

### httpPut

▸ **httpPut**<`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`): `Promise`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`, ``"mutation"``\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | [`AppQueryOptions`](#appqueryoptions-4)<[`ApiPayloadType`](#apipayloadtype-4)<`Scope`, `Route`\>\> |

#### Returns

`Promise`<[`ApiResponseType`](#apiresponsetype-4)<`Scope`, `Route`, ``"mutation"``\>\>

#### Defined in

[imperative/index.ts:41](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/imperative/index.ts#L41)
