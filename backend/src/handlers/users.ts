// The RESTful API handlers for our user routes.

import { Context, Next } from "koa";
import { usersAdd, userCreateSchema, usersList } from "../models/user";

// Create a new user, validating that the incoming data is correct.
// Returns the newly created user in the response.
export const createUser = async (ctx: Context, next: Next) => {
  const userCreate = await userCreateSchema.validate(ctx.request.body);
  const user = usersAdd(userCreate);
  ctx.body = user;
  await next();
};

// Lists the existing users, validating that the incoming data
// is correct.
export const listUsers = async (ctx: Context, next: Next) => {
  ctx.body = usersList();
  await next();
};
