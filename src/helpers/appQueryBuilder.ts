/* eslint-disable @typescript-eslint/no-explicit-any */

import { CreateQueryParams, RequestQueryBuilder } from "@nestjsx/crud-request";

/**
 * This function is is used to overcome an issue with next-crud @nestjsx/crud-request.
 * queryBuilder.setJoin generates a query string like this
 *
 * join=field1,field2,field3
 *
 * instead of this one
 *
 * join[0]=field1&join[1]=field2&join[2]=field3
 *
 * as stated in the docs https://github.com/nestjsx/crud/wiki/Requests#join
 */

const buildJoin = (join?: string[]): { field: string }[] | undefined => {
  if (!join?.length) {
    return undefined;
  }
  return join.map((item) => ({ field: item }));
};

const buildNestJsxQuery = (
  queryOptions: Omit<CreateQueryParams, "join"> & { join?: string[] } = {}
): RequestQueryBuilder => {
  const { join, ...otherOptions } = queryOptions;
  return RequestQueryBuilder.create({
    ...otherOptions,
    join: buildJoin(join),
  });
};

//prepare for when there will be more than one query engine
export type QueryBuilderEngine = "nestJsx";

const builQuery = (
  queryOptions: Omit<CreateQueryParams, "join"> & {
    join?: string[];
    engine?: QueryBuilderEngine;
  } = {}
): RequestQueryBuilder => {
  return buildNestJsxQuery(queryOptions);
};

export const appQueryBuilder = {
  nestJsx: buildNestJsxQuery,
  builQuery,
};

export default appQueryBuilder;
