// import { HttpRequestOptions } from "src/networking"

import { HttpRequestOptions } from '..';

export { useAppMutation } from './useAppMutation';
export { useAppQuery } from './useAppQuery';
export * from './useAppQueryClient';
export * from './useAppTask';

export type AppQueryOptions<Payload = any> = {
  pathParams?: { [key: string]: any };
  extraQueryKey?: any;
} & Omit<HttpRequestOptions<Payload>, 'url'>;
