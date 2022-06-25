---
sidebar_position: 1
slug: /
---

# Introduction

  

This library was built while I was searching an elegant way to interact with web endpoints in my typescript based apps in such a way that I don't need to remember all endpoints, their return types, payload types ecc.. 
For sure you can create constants for your endpoints and add tricky typescript types to map request and responses, but I was looking for a standard way to easily use in all my apps. 

I was using the awesome library [React Query](https://react-query.tanstack.com/) for my networking operations, and I was (and still) really love it, but it is lacking a way to map query keys with their underling types.

After some struggling I found a pattern which is working for me, so I built a library on top of this idea.

This library is built on top of  React Query's api (so if you know how to use it, you don't need to learn anything new), and uses [Axios](https://axios-http.com/docs/intro) for the networking.

By strongly relying  on typescript's type augmentation, this library will allow you to define the endpoints your app is using and strongly link types to them.



By using typescript's augmentation feature, you will define your routes along with response and payload types
and then you will be able to have strong typing for your endpoints

A companion web application to define the routes and generate the full api configuration is under development, please start this repository if you are interested in it