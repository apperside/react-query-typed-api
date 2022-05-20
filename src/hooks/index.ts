import { BaseHttpRequestOptions } from "../networking"

export { useAppMutation } from "./useAppMutation"
export { useAppQuery } from "./useAppQuery"
export { useAppQueryClient } from "./useAppQueryClient"
export { useInfiniteAppQuery } from "./useInfiniteAppQuery"


export type AppQueryOptions<Payload = any> = {
	pathParams?: { [key: string]: any }
} & BaseHttpRequestOptions<Payload>