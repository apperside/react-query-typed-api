




  

<div id="top"></div>

  

[![Contributors][contributors-shield]][contributors-url]

[![Forks][forks-shield]][forks-url]

[![Stargazers][stars-shield]][stars-url]

[![Issues][issues-shield]][issues-url]

[![MIT License][license-shield]][license-url]

[![LinkedIn][linkedin-shield]][linkedin-url]

  
  
  

<!-- PROJECT LOGO -->

<br  />

<div align="center">

<a href="https://github.com/apperside/react-query-typed-api">

<img src="images/logo.png" alt="Logo" width="80" height="80"/>

</a>

  

<h3 align="center">React Query Wrapper</h3>

  

<p align="center">
Bootstrapped with https://www.npmjs.com/package/react-component-lib-boilerplate

An opinioneted wrapper around react-query to allow strong typing for your api requests

<br  />

<!--<a href="https://github.com/apperside/react-query-typed-api"><strong>Explore the docs »</strong></a>-->

<br  />

<br  />

<!--<a href="https://github.com/apperside/react-query-typed-api">View Demo</a>-->

·

<a href="https://github.com/apperside/react-query-typed-api/issues">Report Bug</a>

·

<a href="https://github.com/apperside/react-query-typed-api/issues">Request Feature</a>

</p>

</div>

  
  
  

<!-- TABLE OF CONTENTS 

<details>

<summary>Table of Contents</summary>

<ol>

<li>

<a href="#about-the-project">About The Project</a>

<ul>

<li><a href="#built-with">Built With</a></li>

</ul>

</li>

<li>

<a href="#getting-started">Getting Started</a>

<ul>

<li><a href="#prerequisites">Prerequisites</a></li>

<li><a href="#installation">Installation</a></li>

</ul>

</li>

<li><a href="#usage">Usage</a></li>

<li><a href="#roadmap">Roadmap</a></li>

<li><a href="#contributing">Contributing</a></li>

<li><a href="#license">License</a></li>

<li><a href="#contact">Contact</a></li>

<li><a href="#acknowledgments">Acknowledgments</a></li>

</ol>

</details>

  
  -->
  

<!-- ABOUT THE PROJECT -->

## About The Project

  

This library was built while I was searching an elegant way to interact with web endpoints in my typescript based apps in such a way that I don't need to remember all endpoints, their return types, payload types ecc.. 
For sure you can create constants for your endpoints and add tricky typescript types to map request and responses, but I was looking for a standard way to easily use in all my apps. 

I was using the awesome library [React Query](https://react-query.tanstack.com/) for my networking operations, and I was (and still) really love it, but it is lacking a way to map query keys with their underling types.

After some struggling I found a pattern which is working for me, so I built a library on top of this idea.

This library is built on top of  React Query's api (so if you know how to use it, you don't need to learn anything new), and uses [Axios](https://axios-http.com/docs/intro) for the networking.

By strongly relying  on typescript's type augmentation, this library will allow you to define the endpoints your app is using and strongly link types to them.



By using typescript's augmentation feature, you will define your routes along with response and payload types
and then you will be able to have strong typing for your endpoints

A companion web application to define the routes and generate the full api configuration is under development, please start this repository if you are interested in it

  
  

<p align="right">(<a href="#top">back to top</a>)</p>

  
  
  

### Built On Top Of

* [React Query](https://react-query.tanstack.com/)
* [Axios](https://axios-http.com/docs/intro)

  
  

<p align="right">(<a href="#top">back to top</a>)</p>

  
  

## Prerequisites
you need to have the following libraries already installed:


* [React Query](https://github.com/tannerlinsley/react-query)
* [Axios](https://github.com/axios/axios)


<!-- GETTING STARTED -->

## Getting Started

 Install the library from npm registry

  

### Installation

  

This is an example of how to list things you need to use the software and how to install them.

* npm

```sh

npm i apperside/react-query-typed-api

```

* yarn

```sh

yarn add apperside/react-query-typed-api

```


  

<p align="right">(<a href="#top">back to top</a>)</p>

  
  
  

<!-- USAGE EXAMPLES -->

## Usage
This library is a wrapper around react-query, so before you begin using this library, you need to install and configure react-query as explained in [their docs](https://react-query.tanstack.com/overview).

react-query-typed-api is also heavily based on the concept of augmentation, you can find more about typescript augmentation in [the dedicated documentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation). 

The first interface to know about is AppRoutes, which is declared as follows
```typescript
    export interface AppRoutes {
      main: MainApi
    }
    
    export interface MainApi {
      /**
       * TO BE AUGMENTED
       */
    }
```
The statement `main: MainApi` means that the app has one default api, whose scope is `main`. You can create as many scopes you want, we will speak about api scopes [later on](#api-scopes) .

In order to agument the main scope and add your routes, you have to augment `MainApi` interface
```typescript
    /**
     * You have to add this declaration wherever you want to augment librariy's types
     */
    declare module "react-query-typed-api" {
      /**
       * Augment this interface to add al custom endpoints
       */
      export interface MainApi {
        // MyApiResponseType and MyApiPayloadType are whatever type you want depending on your endpoint response and payload
        "my-route": { responseType: MyApiResponseType, payloadType: MyApiPayloadType }
        // if the payload is the same as the response, you can omit the payloadType 
        "another-custom-route": { responseType: MyApiResponseType2 }
      }
    }
```
let say  we augment our main api like this 

```typescript
    type MyApiResponseType = { responseField1: string }
    type MyApiPayloadType = { payloadField1: string }
    type MyApiResponseType2 = { responseField2: string }
    
    declare module "react-query-typed-api" {
      export interface MainApi {
        "my-route": { responseType: MyApiResponseType, payloadType: MyApiPayloadType }
        "another-custom-route": { responseType: MyApiResponseType2 }
      }
    }
```
We are defining 2 routes:
**my-route**: it will return data of type `MyApiResponseType`, and it will accept data of type `MyApiPayloadType`  when using mutation.
**another-custom-route**: it will return data of type `MyApiResponseType`, and it will accept data of type `MyApiPayloadType`  when using mutation.

With such configuration you will have the following typescript behavior

https://user-images.githubusercontent.com/5955338/169349796-9faac282-770b-427d-8508-997ea08217aa.mp4


> **IMPORTANT**: every entry under `MainApi` must have these fields:
> 
> `responseType`
> **mandatory**, it represents the type of the response and the type of the payload if `payloadType` is not defined
> 
> `payloadType`
> **optional**, it represents the type of the payload for mutations, `responseType` will be used if not provided
> 
> `mutationResponseType`
> **optional**, it represents the response type for mutations, `responseType` will be used if not provided
> 


`useAppQuery` is nothing else that a wrapper around react-query's `useQuery`, it just wraps it with strong typing thanks to typescript augmentation. Together with `useAppQuery` there is also `useAppMutation`


As your can see, types are automatically inferred based on the types declared through augmentation

### PATH PARAMS
You can also use routes with variable parameters. Given we augment the api like this
```typescript
      type MyApiResponseType = { field1: string }
      type MyApiPayloadType = { field2: string }
      
      export interface MainApi {
            "my-route/:id": { responseType: MyApiResponseType, payloadType: MyApiPayloadType },
      }
```
we can use this endpoint like this:

**QUERY**
```typescript
    const query = useAppQuery("my-route/:id", { pathParams: { id: "123" } });
```
**MUTATION**
```typescript
    const mutation = useAppMutation("my-route/:id")
    // the _ before pathParams is not a typo, read below for more info
    mutation.mutate({ field2: "value", _pathParams: { id: "123" } })
```
```
⚠️ Type inferring does not work for path params, and probably it never will 😃
```

### <a name="head1234"></a>

> **A note about `mutate` and `mutateAsync` methods:** In react-query, when you call `mutate` or `mutateAsync`, you can just pass the payload
> for the request and an options object where you can pass just some
> callbacks. To allow the best possible integration for path params, we
> added `_pathParams` as a valid field to pass to `mutate` and
> `mutateAsync`, because sometimes it may be tricky to have the values
> to use as path variables at the moment you call useMutation (imagine
> for example a form submission, you most probably will have the value
> you need only when the form is submitted).
> 
> Since this field will never be passed to the request payload, we
> prefixed it with underscore to allow you to pass a `pathParams` field
> (without underscore) to you payload in case you may need. If you will
> need to pass a _pathParams field to your payload, **it will not work**



## API SCOPES
You can use augmentation to add as many set of apis as you need, you just need to augment the interface `AppRoutes`. An api scope is intended to be a group of endpoint pointing to the same server and having the same prefix. Let say you augment it in the following way
```typescript
      type MyApiResponseType = { responseField1: string }
      type MyApiPayloadType = { payloadField1: string }
      type MyApiResponseType2 = { responseField2: string }
    
      export interface MainApi {
        "my-route/:id": { responseType: MyApiResponseType, payloadType: MyApiPayloadType },
      }
    
      /**
       * Augment this interface to as many groups of api you need.
       * A group of api is a set of endpoints that share the same prefix,server,port and protocol
       */
      export interface AppRoutes {
        
        anotherApi: {
          "another-api-route": { responseType: { anotherApiResponseField: string } }
        }
      }
```
You will be able to use the other scopes like this 
```typescript
      const query = useAppQuery({ scope: "anotherApi", route: "another-api-route" });
    
      const mutation = useAppMutation({ scope: "anotherApi", route: "another-api-route" })
```
You will have full intellisense also in this case


https://user-images.githubusercontent.com/5955338/169356072-9b81090a-6500-457a-bb7f-123974f43e80.mp4


## INITIALIZATION
After you have defined all of your routes, you need to initialize the library by providing the server informations for all the defined api scopes. A good point to do this could be the same point where you initialize react-query's `queryClient` and pass it to the app's context (as explained in [their docs](https://react-query.tanstack.com/quick-start))
```typescript
    import { initNetworking } from "react-query-typed-api";
    
	initNetworking({
	  servers: {
	    main: {
	      apiUrl: "https://my-api-url.com/api",
	    },
	    anotherApi: {
	      apiUrl: "https://another-api-url/v1",
	    },
	  },
	});
```
The `initNetworking` function takes the following arguments:

| parameter | description | mandatory  |default value |
|--|--|--|--|
| servers |the configuration fo the servers, see below  |true|undefined
| localStorage | by default *react-query-typed-api* will use the browser's local storage to automatically add the token header from the storage. If you want to use this library with react native you will need to pass the instance of AsyncStorage to this parameter	 |no|window.localStorage|
| loggingEnabled |if true, the library will log all the request, responses and errors |no | false

**SERVER CONFIGURATION**
The `servers` field is an object which accepts the following values:
| property | description  |mandatory  |default value|
|--|--|--|--|
| apiUrl |the base url for the api (eg: http://localhost:8080/api )  |yes |undefined
| headers | the headers you will add here will be added to each request for the given api scope. It can be a static key-value map (eg: `{"My-Api-Key":"12345"}`) or a function which takes in input the request configuration, so you can return custom values based on the route, method ecc |no |
| requestInterceptor | the function you pass here must be a valid [axios interceptor](https://axios-http.com/docs/interceptors)  and it will be added before each request for this server |no |undefined
| responseHandlers | since axios, by design, only allows one interceptor for the request, in this library you are allowed to pass any number of interceptors for the response. Every function you will add here will be called with the request's response |no |empty array
| errorHandlers | like above, in this library you are allowed to pass any number of interceptors for the errors. Every function you will add here will be called with the full error info |no |empty array


## useAppQuery
The `useAppQuery` hook accepts 3 arguments:

**routeOrRouteObj** (`mandatory`)
This parameter can be:

 - a string representing any route inside the main scope
 - an object with the following properties
```typescript
{
     scope:"<one of your api scopes>",
     route:"a route in the scope"
}
```

**appQueryOptions**

`appQueryOptions` accepts the following values:
 
|parameter  |description  |default|
|--|--|--|
| **method** | this parameter indicated the HTTP verb (GET,POST,PUT,PATCH,DELETE)|GET|
|**headers**|a key-value pair for the request headers|undefined|
|**query**|a string representing the entire query string or an object|undefined|
|**isProtected**|if true, an Authorization header will be added with Bearer authentication using the token from the local storage (by default the local storage key will be *`token`* , but it can be customized in the [initialization options](#initialization)|true|
|**extraRoutePath**|a string that will be added after the base api url (passed in the [initialization options](#initialization) and before the endpoint url. For example if the apiUrl is http://localhost:8080/api and your endpoint is `/my-endpoint`, if you pass for example `"custom-path"` to this propery, the final endpoint will be http://localhost:8080/api/custom-path/my-endpoint |undefined|
|**cancelToken**|an [Axios's cancel token](https://axios-http.com/docs/cancellation)|undefined|
|**pathParams**|if the endpoint has a path variable (eg: `/my-endpoint/:id`), this parameter must contain an object having as values the path variables and as value the value you want your variable to assume|--|


**useQueryOptions**
The options you would pass to [react-query's `useQuery()`](https://react-query.tanstack.com/reference/useQuery)

## useAppMutation
The `useAppMutation` hook will take in input the same parameters as `useAppQuery()`, plus the `payload` property which represents the request's payload.

## useAppQueryClient
Together with `useAppQuery` and `useAppMutation`, we also crafted `useAppQueryClient`, a wrapper around [`queryClient`](https://react-query.tanstack.com/reference/QueryClient), you can use it the following way

```typescript
import { useAppQueryClient } from  "react-query-typed-api";
```
The following methods have been ported 

 - invalidateAppQueries 
 - refetchAppQueries 
 - isFetching
 -  isMutating
 - getQueryData 
 - setQueryData 
 - removeQueries 
 - resetQueries 
 - cancelQueries
 - invalidateQueries 
 - refetchQueries 
 - fetchQuery 
 - prefetchQuery
 - executeMutation 
 - setDefaultOptions 
 - setQueryDefaults 
 - getQueryDefaults
 - setMutationDefaults 
 - getMutationDefaults

Here is an example how how it works with invalidateQueries method, but it works the same with the other methods


https://user-images.githubusercontent.com/5955338/169376695-4b2d987c-2f38-4120-ad71-84dac200d294.mp4


# Differences with react-query
The way `useAppQuery` and `useAppMutation` works is exacly the same as react-query.
Since this is 100% true for `useAppQuery`,  on `useAppMutation` we added there is a small difference  one as the  although useAppQuery can be used in the same and exact way as useQuery is used, some little change [has been added](#head1234) to mutate and mutateAsync

<!--_For more examples, please refer to the [Documentation](https://example.com)_-->

  

<p align="right">(<a href="#top">back to top</a>)</p>

  
  
  

<!-- TODO -->

## TODO

  

- [x] Publish initial version

 [] Add missing documentation (crud endpoints, 
 
 [] Wrap useInfiniteQuery

 [] Add support for typing errors
 
 [] Add tests


[] Much more 😅

  

See the [open issues](https://github.com/apperside/react-query-typed-api/issues) for a full list of proposed features (and known issues).

  

<p align="right">(<a href="#top">back to top</a>)</p>

  
  
  

<!-- CONTRIBUTING -->

## Contributing

  

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

  

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

  

1. Fork the Project

2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)

3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)

4. Push to the Branch (`git push origin feature/AmazingFeature`)

5. Open a Pull Request

  

<p align="right">(<a href="#top">back to top</a>)</p>

  
  
  

<!-- LICENSE -->

## License

  

Distributed under the MIT License. See `LICENSE.txt` for more information.

  

<p align="right">(<a href="#top">back to top</a>)</p>

  
  
  

<!-- CONTACT -->

## Contact

  

Your Name Apperside - https://apperside.com -  info@apperside.com

  

Project Link: [https://github.com/apperside/react-query-typed-api](https://github.com/apperside/react-query-typed-api)

  
  

<p align="right">(<a href="#top">back to top</a>)</p>

  
  
  

<!-- MARKDOWN LINKS & IMAGES -->

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/apperside/react-query-typed-api.svg?style=for-the-badge

[contributors-url]: https://github.com/apperside/react-query-typed-api/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/apperside/react-query-typed-api.svg?style=for-the-badge

[forks-url]: https://github.com/apperside/react-query-typed-api/network/members

[stars-shield]: https://img.shields.io/github/stars/apperside/react-query-typed-api.svg?style=for-the-badge

[stars-url]: https://github.com/apperside/react-query-typed-api/stargazers

[issues-shield]: https://img.shields.io/github/issues/apperside/react-query-typed-api.svg?style=for-the-badge

[issues-url]: https://github.com/apperside/react-query-typed-api/issues

[license-shield]: https://img.shields.io/github/license/apperside/react-query-typed-api.svg?style=for-the-badge

[license-url]: https://github.com/apperside/react-query-typed-api/blob/master/LICENSE.txt

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[linkedin-url]: https://linkedin.com/in/simonegaspari

[product-screenshot]: images/screenshot.png

