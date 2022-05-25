---
id: "crud.RoutesModelMapping"
title: "Interface: RoutesModelMapping"
sidebar_label: "RoutesModelMapping"
custom_edit_url: null
---

[crud](../modules/crud.md).RoutesModelMapping

This interface is to be augmented. Se the [usage section](/docs/usage/basic-usage) for more info

**`example`**
```typescript
	type MyType1={field1:string}
	type MyType2={field2:number}

	export interface RoutesModelMapping {
		myroute1: MyType1
		myroute2: MyType2	
	}
```
