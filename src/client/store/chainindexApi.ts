// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { GetAllChatsPayload, GetPromptPayload, GetSqlGenerationPayload, PostChatPayload, PostChatInput, PostPromptPayload, PostPromptInput, PostSqlGenerationPayload, PostSqlGenerationInput, PutChatPayload, PutChatInput, GetChatPayload, PostUserPayload, PostUserInput, PostLoginInput, PostLoginPayload } from '../types'

const baseUrl = typeof window === 'undefined'
    ? 'https://localhost:3000/api/chainindex' // Server-side base URL
    : `/api/chainindex`; // Client-side base URL

// Define a service using a base URL and expected endpoints
export const chainindexApi = createApi({
    reducerPath: 'chainindexApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Chat'],
    endpoints: (builder) => ({
        getPing: builder.query<void, void>({
            query: () => `ping`,
        }),
        postUser: builder.mutation<PostUserPayload, PostUserInput>({
            query: (body) => ({
                url: `register`,
                method: 'POST',
                body,
            }),
        }),
        postLogin: builder.mutation<PostLoginPayload, PostLoginInput>({
            query: (body) => ({
                url: `login`,
                method: 'POST',
                body,
            }),
        }),
        getPrompt: builder.query<GetPromptPayload, string>({
            query: (promptId) => `prompts/${promptId}`,
        }),
        getSqlGenerations: builder.query<GetSqlGenerationPayload, string>({
            query: (sqlGenerationId) => `sql_generations/${sqlGenerationId}`
        }),
        getChat: builder.query<GetChatPayload, string>({
            providesTags: ['Chat'],
            query: (chatId) => `chats/${chatId}`

        }),
        getAllChats: builder.query<GetAllChatsPayload, void>({
            query: () => `chats`,
            transformResponse: (rawResult: GetAllChatsPayload) => {
                const chatsSorted =
                    rawResult?.chats?.slice().sort((a: any, b: any) => {
                        return (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any);
                    }) || [];
                return { chats: chatsSorted }
            }
        }),
        postChat: builder.mutation<PostChatPayload, PostChatInput>({
            query: (body) => ({
                url: `chats`,
                method: 'POST',
                body,
            }),
        }),
        putChat: builder.mutation<PutChatPayload, PutChatInput>({
            query: ({ chatId, body }) => ({
                url: `chats/${chatId}`,
                method: 'PUT',
                body,
            }),
        }),
        postPrompt: builder.mutation<PostPromptPayload, PostPromptInput>({
            invalidatesTags: ['Chat'],
            query: (body) => ({
                url: `prompts`,
                method: 'POST',
                body,
            }),
        }),
        postSqlGeneration: builder.mutation<PostSqlGenerationPayload, PostSqlGenerationInput>({
            invalidatesTags: ['Chat'],
            query: (body) => ({
                url: `sql_generations`,
                method: 'POST',
                body,
            }),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetPingQuery,
    useLazyGetPingQuery,
    usePostUserMutation,
    usePostLoginMutation,
    useGetChatQuery,
    useGetAllChatsQuery,
    usePostChatMutation,
    usePutChatMutation,
    useGetPromptQuery,
    usePostPromptMutation,
    useGetSqlGenerationsQuery,
    usePostSqlGenerationMutation,
} = chainindexApi