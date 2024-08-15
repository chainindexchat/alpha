import { RequestInfo, RequestInit, Response } from "node-fetch";


export interface RequestClient {
    // eslint-disable-next-line no-unused-vars
    (input: RequestInfo, init?: RequestInit): Promise<Response>;
}
