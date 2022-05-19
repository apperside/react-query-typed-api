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
        alert("pre");
        return config;
      },
      responseHandlers: [
        (response) => {
          alert("handle 1");
        },
        (response) => {
          alert("handle 2");
        },
      ],
    },
    openmeteo: {
      apiUrl: "https://api.open-meteo.com/v1",
      responseHandlers: [
        (response) => {
          alert("handle 1");
        },
        (response) => {
          alert("handle 2");
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

