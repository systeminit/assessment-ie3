// Tests for our Tasks API.

import * as request from "supertest";
import { app } from "../../src/app";
import { clearState } from "../../src/models";
import { User, usersAdd } from "../../src/models/user";
import { tasksAdd } from "../../src/models/task";

let kermit: User;

beforeEach(() => {
  clearState();
  kermit = usersAdd({ name: "Kermit the Frog" });
});

test("createTask", async () => {
  const res = await request(app.callback())
    .post("/api/tasks")
    .set("Content-Type", "application/json")
    .send({ userId: kermit.id, task: "be nice to piggy" })
    .expect(200);
  expect(res.body.userId).toBe(kermit.id);
  expect(res.body.task).toBe("be nice to piggy");
});

test("listTasks", async () => {
  const task1 = tasksAdd({
    userId: kermit.id,
    task: "be nice to piggy",
  });
  const task2 = tasksAdd({
    userId: kermit.id,
    task: "laugh at fozzy",
  });
  const res = await request(app.callback())
    .get(`/api/tasks/${kermit.id}`)
    .set("Content-Type", "application/json")
    .send()
    .expect(200);
  expect(res.body.length).toBe(2);
  expect(res.body).toEqual([task1, task2]);
});

