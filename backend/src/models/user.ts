// The user model allows us to create and list users, and
// stores them in memory.

import { object, string, InferType } from "yup";
import { randomUUID } from "crypto";

// Creates a schema for a user, which we can use to
// validate incoming JSON data.
export const userSchema = object({
  id: string().uuid().required(),
  name: string().required(),
});

// Create a schema for when we want to create a user.
export const userCreateSchema = object({
  name: string().required(),
});

// These are both Typescript types, which we use to describe
// the data later.
export type User = InferType<typeof userSchema>;
export type UserCreate = Omit<User, "id">;

// Our in memory store of users, indexed by their
// user id.
export let users: { [id: string]: User } = {};

// Adds a user to the users object. Creates the ID
// automatically.
export const usersAdd = (userCreate: UserCreate) => {
  for (const user of Object.values(users)) {
    if (user.name == userCreate.name) {
      console.log("returning the existing user");
      return user;
    }
  }
  const user = {
    id: randomUUID(),
    name: userCreate.name,
  };
  users[user.id] = user;
  return user;
};

// Clears all the users
export const usersClear = () => {
  users = {};
};

// Lists all the existing users as an array, sorted by name.
export const usersList = () => {
  return Object.values(users).sort((a, b) => a.name.localeCompare(b.name));
};
