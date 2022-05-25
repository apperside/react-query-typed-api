---
id: "HttpRequestOptions"
title: "Interface: HttpRequestOptions<Payload>"
sidebar_label: "HttpRequestOptions"
sidebar_position: 0
custom_edit_url: null
---

The options for an HTTP request

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `Payload` | `any` | the type for the payload, default is any |

## Properties

### apiScope

• `Optional` **apiScope**: ``"main"``

The [ApiScope](../modules.md#apiscope-12) for the request.
Based on this value a specific network configuration will be picked up based con the configuration object passed to [initApi](../modules.md#initapi-12)

#### Defined in

[networking/httpManager.ts:71](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/networking/httpManager.ts#L71)

___

### cancelToken

• `Optional` **cancelToken**: `CancelTokenSource`

An [Axios's cancel token](https://axios-http.com/docs/cancellation) to cancel pending requests if needed

#### Defined in

[networking/httpManager.ts:62](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/networking/httpManager.ts#L62)

___

### extraRoutePath

• `Optional` **extraRoutePath**: `string` \| `string`[] \| (`string` \| `number`)[]

A string that will be added after the base api url
(passed in the [initialization options](#initialization) and before the endpoint url.
For example if the apiUrl is http://localhost:8080/api and your endpoint is `/my-endpoint`,
if you pass for example `"custom-path"` to this propery,
the final endpoint will be http://localhost:8080/api/custom-path/my-endpoint

#### Defined in

[networking/httpManager.ts:58](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/networking/httpManager.ts#L58)

___

### headers

• `Optional` **headers**: `Object`

The headers for the request.
It must be a key-value pair with with the values being a string or a number (which will be stringified )

#### Index signature

▪ [key: `string`]: `string` \| `number`

#### Defined in

[networking/httpManager.ts:40](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/networking/httpManager.ts#L40)

___

### isProtected

• `Optional` **isProtected**: `boolean`

If it is true, the library will put a bearer token in the `Authorization` header which will be read from the localstorage's
token value. The name of the key to search for in the local storage can be customized with the [ApiConfig](../modules.md#apiconfig-12) object  in the
[initApi](../modules.md#initapi-12) function

#### Defined in

[networking/httpManager.ts:50](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/networking/httpManager.ts#L50)

___

### method

• `Optional` **method**: [`HttpMethod`](../modules.md#httpmethod-12)

The HTTP method

#### Defined in

[networking/httpManager.ts:44](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/networking/httpManager.ts#L44)

___

### payload

• `Optional` **payload**: `Payload`

The payload for the request

#### Defined in

[networking/httpManager.ts:66](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/networking/httpManager.ts#L66)

___

### query

• `Optional` **query**: `string` \| { `[key: string]`: `string`;  }

The query string.
It can be:
- a plain string: in this case it must be a valid query string
- a key value pair: in this case the query string will be built using the keys and their stringified values

#### Defined in

[networking/httpManager.ts:35](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/networking/httpManager.ts#L35)

___

### url

• **url**: `string`

The request url

#### Defined in

[networking/httpManager.ts:28](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/networking/httpManager.ts#L28)
