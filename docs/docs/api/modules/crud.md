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

[crud/index.ts:119](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/crud/index.ts#L119)

___

### DefaultDeleteManyPayload

Ƭ **DefaultDeleteManyPayload**<`T`\>: `T`

Default payload type for deleteMany request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[crud/index.ts:80](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/crud/index.ts#L80)

___

### DefaultDeleteManyResponse

Ƭ **DefaultDeleteManyResponse**<`T`\>: `T`

Default response type for deleteMany request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[crud/index.ts:85](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/crud/index.ts#L85)

___

### DefaultGetOneResponse

Ƭ **DefaultGetOneResponse**<`T`\>: `T`

Default response type for getOne request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[crud/index.ts:56](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/crud/index.ts#L56)

___

### DefaultSaveOneResponse

Ƭ **DefaultSaveOneResponse**<`T`\>: `T`

Default response type for saveOne request

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[crud/index.ts:75](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/crud/index.ts#L75)

___

### NestJsxModelRoute

Ƭ **NestJsxModelRoute**<`T`, `BasePath`\>: [`RoutesForModel`](crud.md#routesformodel-4)<`T`, `BasePath`, [`NestCrudResponseTypes`](../interfaces/crud.NestCrudResponseTypes.md)<[`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md)[`T`]\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof [`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md) |
| `BasePath` | extends `string` \| `unknown` = `unknown` |

#### Defined in

[crud/index.ts:142](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/crud/index.ts#L142)

___

### NestModelRoute

Ƭ **NestModelRoute**<`T`, `BasePath`\>: [`NestJsxModelRoute`](crud.md#nestjsxmodelroute-4)<`T`, `BasePath`\>

**`deprecated`**
use [NestJsxModelRoute](crud.md#nestjsxmodelroute-4) instead

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof [`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md) |
| `BasePath` | extends `string` \| `unknown` = `unknown` |

#### Defined in

[crud/index.ts:148](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/crud/index.ts#L148)

___

### RoutesForModel

Ƭ **RoutesForModel**<`CrudModel`, `BasePath`, `R`\>: { [key in AllRoutes<CrudModel, BasePath\>]: key extends \`${string}/bulk\` ? Object : key extends \`${string}/:id\` ? Object : key extends \`${string}/bulk-delete/:ids\` ? Object : key extends \`${string}\` ? Object : RoutesModelMapping[CrudModel] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `CrudModel` | extends keyof [`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md) |
| `BasePath` | extends `string` \| `unknown` = `unknown` |
| `R` | extends `CrudActionsDataMapping` = { `getManyResponse?`: [`DefaultGetManyResponse`](../interfaces/crud.DefaultGetManyResponse.md)<[`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md)[`CrudModel`]\> ; `getOneResponse?`: [`DefaultGetOneResponse`](crud.md#defaultgetoneresponse-4)<[`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md)[`CrudModel`]\> ; `saveManyPayload?`: [`DefaultSaveManyPayload`](../interfaces/crud.DefaultSaveManyPayload.md)<[`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md)[`CrudModel`]\> ; `saveManyResponse?`: [`DefaultGetManyResponse`](../interfaces/crud.DefaultGetManyResponse.md)<[`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md)[`CrudModel`]\> ; `saveOnePayload?`: [`DefaultSaveOnePayload`](../interfaces/crud.DefaultSaveOnePayload.md)<[`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md)[`CrudModel`]\> ; `saveOneResponse?`: [`DefaultGetOneResponse`](crud.md#defaultgetoneresponse-4)<[`RoutesModelMapping`](../interfaces/crud.RoutesModelMapping.md)[`CrudModel`]\>  } |

#### Defined in

[crud/index.ts:88](https://github.com/apperside/react-query-typed-api/blob/c75dd68/src/crud/index.ts#L88)
