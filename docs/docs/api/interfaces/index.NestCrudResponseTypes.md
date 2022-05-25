---
id: "index.NestCrudResponseTypes"
title: "Interface: NestCrudResponseTypes<T>"
sidebar_label: "NestCrudResponseTypes"
custom_edit_url: null
---

[index](../modules/).NestCrudResponseTypes

INTEGRATION WITH THIRD PARTY LIBRARIES

## Type parameters

| Name |
| :------ |
| `T` |

## Properties

### RestApiDeeResponse

• **RestApiDeeResponse**: `any`

#### Defined in

[index.ts:173](https://github.com/apperside/react-query-typed-api/blob/392a73d/src/index.ts#L173)

___

### deleteManyPayload

• **deleteManyPayload**: `any`

#### Defined in

[index.ts:172](https://github.com/apperside/react-query-typed-api/blob/392a73d/src/index.ts#L172)

___

### getMany

• **getMany**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `count` | `number` |
| `page` | `number` |
| `pageCount` | `number` |
| `rows` | `T`[] |
| `total` | `number` |

#### Defined in

[index.ts:166](https://github.com/apperside/react-query-typed-api/blob/392a73d/src/index.ts#L166)

___

### getOne

• **getOne**: `T`

#### Defined in

[index.ts:167](https://github.com/apperside/react-query-typed-api/blob/392a73d/src/index.ts#L167)

___

### saveManyPayload

• **saveManyPayload**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bulk` | `T`[] |

#### Defined in

[index.ts:170](https://github.com/apperside/react-query-typed-api/blob/392a73d/src/index.ts#L170)

___

### saveManyResponse

• **saveManyResponse**: `T`[]

#### Defined in

[index.ts:171](https://github.com/apperside/react-query-typed-api/blob/392a73d/src/index.ts#L171)

___

### saveOnePayload

• **saveOnePayload**: `T`

#### Defined in

[index.ts:168](https://github.com/apperside/react-query-typed-api/blob/392a73d/src/index.ts#L168)

___

### saveOneResponse

• **saveOneResponse**: `T`

#### Defined in

[index.ts:169](https://github.com/apperside/react-query-typed-api/blob/392a73d/src/index.ts#L169)
