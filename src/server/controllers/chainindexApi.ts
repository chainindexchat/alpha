import 'reflect-metadata';

import { injectable, inject } from "inversify";
import { TYPES } from "../container/types";
import { RequestInput } from "../providers/httpProvider";
import PassthroughRepository from "../repositories/passthroughRepository";
@injectable()
export default class ChainIndexApi {
    private _passthroughRepository: PassthroughRepository;
    public constructor(
        @inject(TYPES.PassthroughRepository) passthroughRepository: PassthroughRepository
    ) {
        this._passthroughRepository = passthroughRepository;
    }
    public async request(args: RequestInput) { return this._passthroughRepository.request({ ...args, hostName: `${process.env.NEXT_PUBLIC_BACKEND_FQDN}`, cookies: ['Authorization'] }); }
}
