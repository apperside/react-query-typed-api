

  

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

<img src="images/logo.png" alt="Logo" width="80" height="80">

</a>

  

<h3 align="center">React Query Wrapper</h3>

  

<p align="center">
Bootstrapped with https://www.npmjs.com/package/react-component-lib-boilerplate

A wrapper around react-query to allow strong typing for your endopints

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

  

The aim of this project is to create a wrapper around react-query with for easily strong-typing your endpoints.

By using typescript's augmentation feature, you will define your routes along with response and payload types
and then you will be able to have strong typing for your endpoints

A companion node cli is under development

  
  

<p align="right">(<a href="#top">back to top</a>)</p>

  
  
  

### Built With

* [React Query](https://react-query.tanstack.com/)

  
  

<p align="right">(<a href="#top">back to top</a>)</p>

  
  
  <!-- GETTING STARTED -->

## Prerequisites
you need to have the following libraries already installed:


* [React Query](https://github.com/tannerlinsley/react-query)


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

react-query-typed-api is also based on the concept of augmentation, you can find more about typescript augmentation in [the dedicated documentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation). 

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
The statement `main: MainApi` means that the app has one default api, whose scope is `main`. You can create as many scopes you want, we will speak about api scopes later on.

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
    type MyApiResponseType = { field1: string }
    type MyApiPayloadType = { field2: string }
    type MyApiResponseType2 = { field3: string }
    
    declare module "react-query-typed-api" {
      export interface MainApi {
        "my-route": { responseType: MyApiResponseType, payloadType: MyApiPayloadType }
        "another-custom-route": { responseType: MyApiResponseType2 }
      }
    }
```
we will have the following typescript behavior
![route autocomplete](https://github.com/apperside/react-query-typed-api/blob/master/docs/images/screenshot1.png?raw=true)
![type infering](https://github.com/apperside/react-query-typed-api/blob/master/docs/images/screenshot2.png?raw=true)
`useAppQuery` is nothing else that a wrapper around react-query's `useQuery`, it just wraps it with strong typing thanks to typescript augmentation. Together with `useAppQuery` there is also `useAppMutation`

![enter image description here](https://github.com/apperside/react-query-typed-api/blob/master/docs/images/screenshot3.png?raw=true)
As your can see, types are automatically inferred based on the types declared in augmentation

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
    mutation.mutate({ field2: "value", pathParams: { id: "123" } })
```
### API SCOPES
You can use augmentation to add as many set of apis as you need, you just need to augment the interface `RoutesMapping`. An api scope is intended to be a group of endpoint pointing to the same server and having the same prefix. Let say we do the augmentation in the following way
```typescript
      type MyApiResponseType = { field1: string }
      type MyApiPayloadType = { field2: string }
      type MyApiResponseType2 = { field3: string }
    
      export interface MainApi {
        "my-route/:id": { responseType: MyApiResponseType, payloadType: MyApiPayloadType },
      }
    
      /**
       * Augment this interface to as many groups of api you need.
       * A group of api is a set of endpoints that share the same prefix,server,port and protocol
       */
      export interface RoutesMapping {
        
        anotherApi: {
          "another-api-route": { responseType: { anotherApiResponseField: string } }
        }
      }
```
You will be able to use the other scope like this 
```typescript
      const query = useAppQuery({ scope: "anotherApi", route: "another-api-route" });
    
      const mutation = useAppMutation({ scope: "anotherApi", route: "another-api-route" })
```
You will have full intellisense also in this case

![enter image description here](https://github.com/apperside/react-query-typed-api/blob/master/docs/images/screenshot4.png?raw=true)
![enter image description here](https://github.com/apperside/react-query-typed-api/blob/master/docs/images/screenshot5.png?raw=true)
## INITIALIZATION
after you have defined all of your routes, you need to initialize the library by providing the server informations for all the defined api scopes. A good point to do this could be the same point where you initialize react-query's query client and pass it to the app's context (as explained in their docs)
```typescript
    import { initNetworking } from "react-query-typed-api";
    
    initNetworking({
      servers: {
        /**
         * this api will point to https://my.server.com:443/api/v1
         */
        main: {
          port: 443,
          serverAddress: "my.server.com",
          protocol: "https",
          baseUrl: "api/v1"
        },
        /**
         * this api will point to https://my.second.server.com:443/custom/v2
         */
        otherApi: {
          port: 443,
          serverAddress: "my.second.server.com",
          protocol: "https",
          baseUrl: "custom/v2"
        }
      }
    });
```
<!--_For more examples, please refer to the [Documentation](https://example.com)_-->

  

<p align="right">(<a href="#top">back to top</a>)</p>

  
  
  

<!-- ROADMAP -->

## Roadmap

  

- [x] Publish initial version

 [] Add documentation

 [] Add tests

[] Split in different packages (ui-core, redux-utils, api-utils)

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

