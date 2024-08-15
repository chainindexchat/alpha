import 'reflect-metadata';

import { Container } from "inversify";
import { TYPES } from "./types";
import HttpProvider from "../providers/httpProvider";
import PassthroughRepository from "../repositories/passthroughRepository";
import ChainIndexApi from "../controllers/chainindexApi";
import { RequestClient } from "../providers/requestClient";
import fetch from "node-fetch";

const myContainer = new Container();
myContainer.bind<RequestClient>(TYPES.RequestClient).toConstantValue(fetch as RequestClient);
myContainer.bind<HttpProvider>(TYPES.HttpProvider).to(HttpProvider)
myContainer.bind<PassthroughRepository>(TYPES.PassthroughRepository).to(PassthroughRepository);
myContainer.bind<ChainIndexApi>(TYPES.ChainIndexApi).to(ChainIndexApi);
export { myContainer };