---
id: "crud"
title: "Module: crud"
sidebar_label: "crud"
sidebar_position: 0
custom_edit_url: null
---

## Interfaces

- [CustomCrudRoutes](../interfaces/crud.CustomCrudRoutes.md)
- [DefaultGetManyResponse](../interfaces/crud.DefaultGetManyResponse.md)
- [DefaultSaveManyPayload](../interfaces/crud.DefaultSaveManyPayload.md)
- [DefaultSaveOnePayload](../interfaces/crud.DefaultSaveOnePayload.md)
- [NestCrudResponseTypes](../interfaces/crud.NestCrudResponseTypes.md)
- [RoutesModelMapping](../interfaces/crud.RoutesModelMapping.md)

## Type aliases

### CrudRoutes

Ƭ **CrudRoutes**: { [key in keyof CustomCrudRoutes]: CustomCrudRoutes[key] }

#### Defined in

[crud/index.ts:116](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/crud/index.ts#L116)

___

### DefaultDeleteManyPayload

Ƭ **DefaultDeleteManyPayload**<`T`\>: `T`

Default payload type for deleteMany request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[crud/index.ts:77](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/crud/index.ts#L77)

___

### DefaultDeleteManyResponse

Ƭ **DefaultDeleteManyResponse**<`T`\>: `T`

Default response type for deleteMany request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[crud/index.ts:82](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/crud/index.ts#L82)

___

### DefaultGetOneResponse

Ƭ **DefaultGetOneResponse**<`T`\>: `T`

Default response type for getOne request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[crud/index.ts:53](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/crud/index.ts#L53)

___

### DefaultSaveOneResponse

Ƭ **DefaultSaveOneResponse**<`T`\>: `T`

Default response type for saveOne request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[crud/index.ts:72](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/crud/index.ts#L72)

___

### NestJsxModelRoute

Ƭ **NestJsxModelRoute**<`T`, `BasePath`\>: [`RoutesForModel`](crud.md#routesformodel-88)<`T`, `BasePath`, [`NestCrudResponseTypes`](../interfaces/crud.NestCrudResponseTypes.md)<[`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md)[`T`]\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof [`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md) |
| `BasePath` | extends `string` \| `unknown` = `unknown` |

#### Defined in

[crud/index.ts:137](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/crud/index.ts#L137)

___

### NestModelRoute

Ƭ **NestModelRoute**<`T`, `BasePath`\>: [`NestJsxModelRoute`](crud.md#nestjsxmodelroute-76)<`T`, `BasePath`\>

**`deprecated`**
use [NestJsxModelRoute](crud.md#nestjsxmodelroute-76) instead

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof [`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md) |
| `BasePath` | extends `string` \| `unknown` = `unknown` |

#### Defined in

[crud/index.ts:143](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/crud/index.ts#L143)

___

### RoutesForModel

Ƭ **RoutesForModel**<`T`, `BasePath`, `R`\>: { [key in AllRoutes<T, BasePath\>]: key extends \`${string}/bulk\` ? Object : key extends \`${string}/:id\` ? Object : key extends \`${string}/bulk-delete/:ids\` ? Object : key extends \`${string}\` ? Object : RoutesModelMapping[T] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof [`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md) |
| `BasePath` | extends `string` \| `unknown` = `unknown` |
| `R` | extends `CrudActionsDataMapping` = { `getManyResponse?`: [`DefaultGetManyResponse`](../interfaces/crud.DefaultGetManyResponse.md)<[`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md)[`T`]\> ; `getOneResponse?`: [`DefaultGetOneResponse`](crud.md#defaultgetoneresponse-88)<[`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md)[`T`]\> ; `saveManyPayload?`: [`DefaultSaveManyPayload`](../interfaces/crud.DefaultSaveManyPayload.md)<[`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md)[`T`]\> ; `saveManyResponse?`: [`DefaultGetManyResponse`](../interfaces/crud.DefaultGetManyResponse.md)<[`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md)[`T`]\> ; `saveOnePayload?`: [`DefaultSaveOnePayload`](../interfaces/crud.DefaultSaveOnePayload.md)<[`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md)[`T`]\> ; `saveOneResponse?`: [`DefaultGetOneResponse`](crud.md#defaultgetoneresponse-88)<[`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md)[`T`]\>  } |

#### Defined in

[crud/index.ts:85](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/crud/index.ts#L85)
