---
id: "crud.NestCrudResponseTypes"
title: "Interface: NestCrudResponseTypes<T>"
sidebar_label: "crud.NestCrudResponseTypes"
custom_edit_url: null
---

[crud](../modules/crud.md).NestCrudResponseTypes

## Type parameters

| Name |
| :------ |
| `T` |

## Properties

### RestApiDeeResponse

• **RestApiDeeResponse**: `any`

#### Defined in

[crud/index.ts:139](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/crud/index.ts#L139)

___

### deleteManyPayload

• **deleteManyPayload**: `any`

#### Defined in

[crud/index.ts:138](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/crud/index.ts#L138)

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

[crud/index.ts:132](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/crud/index.ts#L132)

___

### getOneResponse

• **getOneResponse**: `T`

#### Defined in

[crud/index.ts:133](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/crud/index.ts#L133)

___

### saveManyPayload

• **saveManyPayload**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bulk` | `T`[] |

#### Defined in

[crud/index.ts:136](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/crud/index.ts#L136)

___

### saveManyResponse

• **saveManyResponse**: `T`[]

#### Defined in

[crud/index.ts:137](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/crud/index.ts#L137)

___

### saveOnePayload

• **saveOnePayload**: `T`

#### Defined in

[crud/index.ts:134](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/crud/index.ts#L134)

___

### saveOneResponse

• **saveOneResponse**: `T`

#### Defined in

[crud/index.ts:135](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/crud/index.ts#L135)
