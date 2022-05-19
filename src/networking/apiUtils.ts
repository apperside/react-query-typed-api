/* eslint-disable @typescript-eslint/no-explicit-any */
import urlJoin from 'url-join';
import { AppQueryOptions } from "..";

function buildQueryString(query: { [key: string]: string }): string {
  let queryParams = "";
  const paramKeys = Object.keys(query);
  if (paramKeys.length > 0) {
    paramKeys.forEach((key, index) => {
      if (index > 0) {
        queryParams += "&";
      }
      queryParams += `${key}=${query[key]}`
    })
  }
  return queryParams;
}


function buildUrl(route: string, options?: AppQueryOptions): string {
  if (!options) {
    return route
  }
  const { extraRoutePath, query } = options;

  let url = route as string;
  if (typeof extraRoutePath === "string" && !!extraRoutePath) {
    url = urlJoin(extraRoutePath, url);
  }
  //if is an array
  else if (typeof extraRoutePath === "object" && extraRoutePath.length) {
    url += (extraRoutePath as any[]).concat("/");
  }
  const queryParams = typeof query === "string" ? query : apiUtils.buildQueryString(query || {});
  if (queryParams) {
    url += `?${queryParams}`;
  }
  return url;
}

const apiUtils = { buildQueryString, buildUrl }

export default apiUtils;