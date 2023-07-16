// The REST handlers for health.

import { Context, Next } from "koa";

// Health check endpoint used to determine if the API is up.
export const health = async (ctx: Context, next: Next) => {
    ctx.body = { status: "healthy" };
    ctx.status = 200;
    await next();
};
