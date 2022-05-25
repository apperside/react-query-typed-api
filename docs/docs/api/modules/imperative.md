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
| `appQueryOptions?` | [`AppQueryOptions`](#appqueryoptions-88)<[`ApiPayloadType`](#apipayloadtype-88)<`Scope`, `Route`\>\> |

#### Returns

`Promise`<{ `result`: `boolean`  }\>

#### Defined in

[imperative/index.ts:52](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/imperative/index.ts#L52)

___

### httpGet

▸ **httpGet**<`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`): `Promise`<[`ApiResponseType`](#apiresponsetype-88)<`Scope`, `Route`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } | A string or an object containig  a key of [AppRoutes](../interfaces/.AppRoutes) containing the parameter. |
| `appQueryOptions?` | [`AppQueryOptions`](#appqueryoptions-88)<`any`\> |  |

#### Returns

`Promise`<[`ApiResponseType`](#apiresponsetype-88)<`Scope`, `Route`\>\>

#### Defined in

[imperative/index.ts:24](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/imperative/index.ts#L24)

___

### httpPatch

▸ **httpPatch**<`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`): `Promise`<[`ApiResponseType`](#apiresponsetype-88)<`Scope`, `Route`, ``"mutation"``\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | [`AppQueryOptions`](#appqueryoptions-88)<[`ApiPayloadType`](#apipayloadtype-88)<`Scope`, `Route`\>\> |

#### Returns

`Promise`<[`ApiResponseType`](#apiresponsetype-88)<`Scope`, `Route`, ``"mutation"``\>\>

#### Defined in

[imperative/index.ts:45](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/imperative/index.ts#L45)

___

### httpPost

▸ **httpPost**<`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`): `Promise`<[`ApiResponseType`](#apiresponsetype-88)<`Scope`, `Route`, ``"mutation"``\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | [`AppQueryOptions`](#appqueryoptions-88)<[`ApiPayloadType`](#apipayloadtype-88)<`Scope`, `Route`\>\> |

#### Returns

`Promise`<[`ApiResponseType`](#apiresponsetype-88)<`Scope`, `Route`, ``"mutation"``\>\>

#### Defined in

[imperative/index.ts:31](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/imperative/index.ts#L31)

___

### httpPut

▸ **httpPut**<`Scope`, `Route`\>(`routeOrRouteObj`, `appQueryOptions?`): `Promise`<[`ApiResponseType`](#apiresponsetype-88)<`Scope`, `Route`, ``"mutation"``\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Scope` | extends ``"main"`` = ``"main"`` |
| `Route` | extends `string` \| `number` \| `symbol` = keyof [`AppRoutes`](../interfaces/.AppRoutes)[`Scope`] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeOrRouteObj` | `Route` \| { `route`: `Route` ; `scope`: `Scope`  } |
| `appQueryOptions?` | [`AppQueryOptions`](#appqueryoptions-88)<[`ApiPayloadType`](#apipayloadtype-88)<`Scope`, `Route`\>\> |

#### Returns

`Promise`<[`ApiResponseType`](#apiresponsetype-88)<`Scope`, `Route`, ``"mutation"``\>\>

#### Defined in

[imperative/index.ts:38](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/imperative/index.ts#L38)
