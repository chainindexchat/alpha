import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { CookieJar } from 'tough-cookie';
import { MixedCookieAgent } from 'http-cookie-agent/http';
import { isNil } from "lodash";
import { TYPES } from "../container/types";
import type { RequestClient } from './requestClient';

export interface RequestInput {
    context: any;
    method?: string;
    cookies?: string[];
    headers?: Record<string, string>;
    hostName?: string;
    basePath?: string;
    apiPath: string;
    query?: string;
    body?: BodyInit | null;
}
@injectable()
export default class HttpProvider {
    // eslint-disable-next-line no-unused-vars
    constructor(@inject(TYPES.RequestClient) private _requestClient: RequestClient) { }
    public async request({
        context,
        method = "GET",
        cookies,
        headers,
        hostName,
        basePath = '',
        apiPath,
        query,
        body = null
    }: RequestInput): Promise<any> {
        let url = '';
        let parsedResponse: any | null = null;
        // let errors = null;
        let status: number | null = null;
        try {
            const { req, res: nextResponse } = context;
            const jar = new CookieJar();
            if (isNil(hostName) || isNil(basePath) || isNil(apiPath)) throw new Error("BAD_REQUEST_URL");
            if (cookies && Array.isArray(cookies)) {
                cookies.forEach(async (cookie) => {
                    if (req?.cookies && cookie in req.cookies) {
                        await jar.setCookie(`${cookie}=${req.cookies[cookie]}`, hostName);
                    }
                });
            }

            url = `${hostName}${basePath}${apiPath}${query ?? ''}`;

            const apiResponse = await this._requestClient(url, {
                method,
                ...(headers && { headers }),
                ...(body && { body: JSON.stringify(body) }),
                agent: new MixedCookieAgent({ cookies: { jar } })
            });
            if (req && cookies) {
                const responseCookies = await jar.getCookies(hostName);
                cookies.forEach(async (cookie: string) => {
                    const resCookie = responseCookies.find((resC) => resC.key === cookie);
                    if (resCookie) {
                        nextResponse?.setHeader('Set-Cookie', resCookie.toString());
                        Object.assign(req.cookies ?? {}, { [`${cookie}`]: resCookie.value })
                    }
                })
            }
            ({ status } = apiResponse);
            if (status >= 400) return { "status": status }
            try {
                parsedResponse = await apiResponse.json()
            } catch (e) { throw new Error("ERROR_PARSING_API_RESPONSE") }
            if (status && status >= 500) throw new Error("STATUS_CODE_GTE_500");
            return parsedResponse
        } catch (e) { console.log(e); console.log("parsedResponse", parsedResponse); throw e; }
    }

}