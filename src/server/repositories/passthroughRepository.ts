import 'reflect-metadata';
import { injectable, inject } from "inversify";
import { TYPES } from "../container/types";
import HttpProvider, { RequestInput } from "../providers/httpProvider";
@injectable()
export default class PassthroughRepository {
    private _httpProvider: HttpProvider;
    public constructor(
        @inject(TYPES.HttpProvider) httpProvider: HttpProvider
    ) {
        this._httpProvider = httpProvider;
    }

    public async request(args: RequestInput) { return this._httpProvider.request(args); }
}
