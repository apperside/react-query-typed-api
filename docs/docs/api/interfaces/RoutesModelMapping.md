---
id: "RoutesModelMapping"
title: "Interface: RoutesModelMapping"
sidebar_label: "RoutesModelMapping"
sidebar_position: 0
custom_edit_url: null
---

This interface allows you to define all your CRUD resources and the name to use to those resources in the api urls.
This interface need to be augmented with key-value pairs where the key is the name of the resource and the value is the
type of the resource.

**`example`**
```typescript
	type MyType1={field1:string}
	type MyType2={field2:number}

	export interface RoutesModelMapping {
		myroute1: MyType1
		myroute2: MyType2	
	}
```
