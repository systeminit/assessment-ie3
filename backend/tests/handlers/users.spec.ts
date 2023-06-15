// Tests for our Users API.

import * as request from "supertest";
import { app } from "../../src/app";
import { clearState } from "../../src/models";
import { usersAdd } from "../../src/models/user";

beforeEach(() => {
  clearState();
});

test("createUser", async () => {
  const res = await request(app.callback())
    .post("/api/users")
    .set("Content-Type", "application/json")
    .send({ name: "adam" })
    .expect(200);
  expect(res.body.name).toBe("adam");
});

test("listUsers", async () => {
  usersAdd({ name: "adam" });
  const res = await request(app.callback())
    .get("/api/users")
    .set("Content-Type", "application/json")
    .send()
    .expect(200);
  expect(res.body.length).toBe(1);
  expect(res.body[0]).toEqual(expect.objectContaining({ id: expect.any(String), name: "adam" }));
});
