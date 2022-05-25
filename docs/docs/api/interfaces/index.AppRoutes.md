---
id: "index.AppRoutes"
title: "Interface: AppRoutes"
sidebar_label: "AppRoutes"
custom_edit_url: null
---

[index](../modules/).AppRoutes

The interface representing all of your api endpoints.
It must be a key value pair where the key is an identifier for a specific api and the value and object of type
[](../modules/#appendpoint-88)

## Properties

### main

• **main**: [`MainApi`](.MainApi)

The default [ApiScope](../modules/#apiscope-88). Augment this interface to add more scopes, see the [usage section](/docs/usage/basic-usage) for more information. for more info

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

[index.ts:59](https://github.com/apperside/react-query-typed-api/blob/299ed8e/src/index.ts#L59)
