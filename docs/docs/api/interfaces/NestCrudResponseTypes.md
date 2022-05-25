---
id: "NestCrudResponseTypes"
title: "Interface: NestCrudResponseTypes<T>"
sidebar_label: "NestCrudResponseTypes"
sidebar_position: 0
custom_edit_url: null
---

INTEGRATION WITH THIRD PARTY LIBRARIES

## Type parameters

| Name |
| :------ |
| `T` |

## Properties

### RestApiDeeResponse

• **RestApiDeeResponse**: `any`

#### Defined in

[index.ts:214](https://github.com/apperside/react-query-typed-api/blob/6e6d5a9/src/index.ts#L214)

___

### deleteManyPayload

• **deleteManyPayload**: `any`

#### Defined in

[index.ts:213](https://github.com/apperside/react-query-typed-api/blob/6e6d5a9/src/index.ts#L213)

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

[index.ts:207](https://github.com/apperside/react-query-typed-api/blob/6e6d5a9/src/index.ts#L207)

___

### getOne

• **getOne**: `T`

#### Defined in

[index.ts:208](https://github.com/apperside/react-query-typed-api/blob/6e6d5a9/src/index.ts#L208)

___

### saveManyPayload

• **saveManyPayload**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bulk` | `T`[] |

#### Defined in

[index.ts:211](https://github.com/apperside/react-query-typed-api/blob/6e6d5a9/src/index.ts#L211)

___

### saveManyResponse

• **saveManyResponse**: `T`[]

#### Defined in

[index.ts:212](https://github.com/apperside/react-query-typed-api/blob/6e6d5a9/src/index.ts#L212)

___

### saveOnePayload

• **saveOnePayload**: `T`

#### Defined in

[index.ts:209](https://github.com/apperside/react-query-typed-api/blob/6e6d5a9/src/index.ts#L209)

___

### saveOneResponse

• **saveOneResponse**: `T`

#### Defined in

[index.ts:210](https://github.com/apperside/react-query-typed-api/blob/6e6d5a9/src/index.ts#L210)
