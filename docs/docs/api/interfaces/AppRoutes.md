---
id: "AppRoutes"
title: "Interface: AppRoutes"
sidebar_label: "AppRoutes"
sidebar_position: 0
custom_edit_url: null
---

The interface representing all of your api endpoints.
It must be a key value pair where the key is an identifier for a specific api and the value and object of type
[](../modules.md#appendpoint-14)

## Properties

### main

• **main**: [`MainApi`](MainApi.md)

The default [ApiScope](../modules.md#apiscope-14). Augment this interface to add more scopes, see the [usage section](/docs/usage/basic-usage) for more information. for more info

**`example`**
Here's a simple example:
```typescript
declare module "react-query-typed-api" {

export interface AppRoutes {
	my-other-api: {
		"my-other-endpoint": { responseType: MyOtherResponse }
	}
}
```

#### Defined in

[index.ts:63](https://github.com/apperside/react-query-typed-api/blob/e3c1c0d/src/index.ts#L63)
