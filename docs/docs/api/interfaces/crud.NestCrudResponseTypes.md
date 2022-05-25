---
id: "crud.NestCrudResponseTypes"
title: "Interface: NestCrudResponseTypes<T>"
sidebar_label: "NestCrudResponseTypes"
custom_edit_url: null
---

[crud](../modules/crud.md).NestCrudResponseTypes

INTEGRATION WITH THIRD PARTY LIBRARIES

## Type parameters

| Name |
| :------ |
| `T` |

## Properties

### RestApiDeeResponse

• **RestApiDeeResponse**: `any`

#### Defined in

[crud/index.ts:134](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/crud/index.ts#L134)

___

### deleteManyPayload

• **deleteManyPayload**: `any`

#### Defined in

[crud/index.ts:133](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/crud/index.ts#L133)

___

### getManyResponse

• **getManyResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `count` | `number` |
| `page` | `number` |
| `pageCount` | `number` |
| `rows` | `T`[] |
| `total` | `number` |

#### Defined in

[crud/index.ts:127](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/crud/index.ts#L127)

___

### getOneResponse

• **getOneResponse**: `T`

#### Defined in

[crud/index.ts:128](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/crud/index.ts#L128)

___

### saveManyPayload

• **saveManyPayload**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bulk` | `T`[] |

#### Defined in

[crud/index.ts:131](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/crud/index.ts#L131)

___

### saveManyResponse

• **saveManyResponse**: `T`[]

#### Defined in

[crud/index.ts:132](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/crud/index.ts#L132)

___

### saveOnePayload

• **saveOnePayload**: `T`

#### Defined in

[crud/index.ts:129](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/crud/index.ts#L129)

___

### saveOneResponse

• **saveOneResponse**: `T`

#### Defined in

[crud/index.ts:130](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/crud/index.ts#L130)
