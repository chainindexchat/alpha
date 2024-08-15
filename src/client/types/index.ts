export interface PostLoginPayload { }
export interface PostLoginInput {
    key: string;
    signature: string;
    rewardAddress: string;
}
export interface PostUserPayload {
    nonce: string;
}
export interface PostUserInput {
    rewardAddress: string;
}
export interface GetPromptPayload {
    prompt: Prompt;
    sqlGenerationIds: string[];
}
export interface Prompt {
    id: string;
    userId: string;
    chatId: string;
    text: string;
    engineResponseId: string;
}
export interface GetSqlGenerationPayload {
    engineResponse: EngineResponse;
    sqlGeneration: SqlGeneration;
    error: string;
}
export interface SqlGeneration {
    id: string;
    userId: string;
    chatId: string;
    promptId: string;
    status: string;
    engineResponseId: string;
}
export interface EngineResponse {
    id: string;
    llm_config: { llm_name: string; };
    metadata: any | null;
    promptId: string;
    sql: string;
    status: string;
    tokensUsed: number;
    error: string;
}
export interface GetChatPayload {
    chat: Chat;
    promptIds: string[];
    sqlGenerationIds: string[];

}
export interface GetAllChatsPayload {
    chats: Chat[];
}
export interface Chat {
    id: string;
    title: string;
    userId: string;
}
export interface PostChatPayload {
    chat: Chat;
}
export interface PostChatInput {
    title: string;
}
export interface PostPromptPayload {
    status: string;
    prompt: {
        chatId: string;
        engineResponseId: string;
        id: string;
        text: string;
        userId: string;
    }
}
export interface PostPromptInput {
    chatId: string;
    text: string;
}
export interface PostSqlGenerationPayload {
    engineResponse: EngineResponse;
    sqlGeneration: SqlGeneration;
    status: string;
}
export interface PostSqlGenerationInput {
    chatId: string;
    promptId: string;
    promptEngineId: string;
}
export interface PutChatPayload {
}
export interface PutChatInput {
    chatId: string;
    body: { title: string; };
}