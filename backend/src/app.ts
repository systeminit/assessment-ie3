// Our backend is a Koa application. This module creates the
// application and configures it for our needs.

import * as Koa from "koa";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser";
import * as cors from "@koa/cors";
import * as logger from "koa-logger";
import { router } from "./routes";

export const app = new Koa();
app
  .use(logger())
  .use(cors())
  .use(json())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

