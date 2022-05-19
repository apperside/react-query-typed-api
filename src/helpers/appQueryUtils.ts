/* eslint-disable @typescript-eslint/no-explicit-any */

import { appQueryBuilder } from './appQueryBuilder';

/**
 * @deprecated
 * use appQueryBuilder.buildNestJsxQuery instead
 */
const buildQuery = appQueryBuilder.buildNestJsxQuery;

/**
 * @deprecated
 * Use appQueryBuilder instead
 */
export const appQueryUtils = {
	buildQuery,
}



export default appQueryUtils;