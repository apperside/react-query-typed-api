import { AppRoutes, BaseHttpRequestOptions } from "../networking"

export { useAppMutation } from "./useAppMutation"
export { useAppQuery } from "./useAppQuery"
export { useInfiniteAppQuery } from "./useInfiniteAppQuery"

export { useAppQueryClient } from "./useAppQueryClient"

export type AppQueryOptions<Payload = any> = {
	pathParams?: { [key: string]: any }
} & BaseHttpRequestOptions<Payload>