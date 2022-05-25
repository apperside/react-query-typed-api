---
id: "NestCrudResponseTypes"
title: "Interface: NestCrudResponseTypes<T>"
sidebar_label: "NestCrudResponseTypes"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name |
| :------ |
| `T` |

## Properties

### RestApiDeeResponse

• **RestApiDeeResponse**: `any`

#### Defined in

[crud/index.ts:165](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/crud/index.ts#L165)

___

### deleteManyPayload

• **deleteManyPayload**: `any`

#### Defined in

[crud/index.ts:164](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/crud/index.ts#L164)

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

[crud/index.ts:158](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/crud/index.ts#L158)

___

### getOneResponse

• **getOneResponse**: `T`

#### Defined in

[crud/index.ts:159](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/crud/index.ts#L159)

___

### saveManyPayload

• **saveManyPayload**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bulk` | `T`[] |

#### Defined in

[crud/index.ts:162](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/crud/index.ts#L162)

___

### saveManyResponse

• **saveManyResponse**: `T`[]

#### Defined in

[crud/index.ts:163](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/crud/index.ts#L163)

___

### saveOnePayload

• **saveOnePayload**: `T`

#### Defined in

[crud/index.ts:160](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/crud/index.ts#L160)

___

### saveOneResponse

• **saveOneResponse**: `T`

#### Defined in

[crud/index.ts:161](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/crud/index.ts#L161)
