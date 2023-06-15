// Tests for our User model.

import { users, usersAdd, usersClear, usersList } from "../../src/models/user";
import { clearState } from "../../src/models";

beforeEach(() => {
  clearState();
});

test("usersAdd", () => {
  usersAdd({ name: "Jimmy Buffet" });
  expect(Object.values(users)).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        name: "Jimmy Buffet",
      }),
    ]),
  );
});

test("usersClear", () => {
  usersAdd({ name: "Jimmy Buffet" });
  expect(Object.keys(users).length).toBe(1);
  usersClear();
  expect(Object.keys(users).length).toBe(0);
});

test("usersList", () => {
  usersAdd({ name: "Jimmy Buffet" });
  usersAdd({ name: "Snoop Dogg" });
  expect(usersList()).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        name: "Jimmy Buffet",
      }),
      expect.objectContaining({
        name: "Snoop Dogg",
      }),
    ]),
  );
});
