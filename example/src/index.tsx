import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initNetworking } from "react-query-typed-api";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

initNetworking({
  servers: {
    main: {
      apiUrl: "https://metaweather.com/api",
      requestInterceptor: (config) => {
        console.log("main api request interceptor", config);
        return config;
      },
      responseHandlers: [
        (response) => {
          console.log("main api first response handler", response);
        },
        (response) => {
          console.log("main api second response handler", response);
        },
      ],
    },
    openmeteo: {
      apiUrl: "https://api.open-meteo.com/v1",
      requestInterceptor: (config) => {
        console.log("openmeteo api request interceptor", config);
        return config;
      },
      responseHandlers: [
        (response) => {
          console.log("openmeteo api first response handler", response);
        },
        (response) => {
          console.log("openmeteo api second response handler", response);
        },
      ],
    },
  },
});
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

