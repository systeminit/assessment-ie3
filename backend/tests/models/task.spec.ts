// Tests for our Task model.

import { tasks, tasksAdd, tasksClear, tasksList } from "../../src/models/task";
import { usersAdd, User } from "../../src/models/user";
import { clearState } from "../../src/models";

let kermit: User;
let piggy: User;

beforeEach(() => {
  clearState();
  kermit = usersAdd({ name: "Kermit the Frog " });
  piggy = usersAdd({ name: "Miss Piggy" });
});

test("tasksAdd", () => {
  const kermitTask = tasksAdd({ userId: kermit.id, task: "be nice to piggy" });
  expect(kermitTask).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      userId: kermit.id,
      task: "be nice to piggy",
    }),
  );

  expect(tasks[kermit.id]).toEqual(expect.arrayContaining([kermitTask]));

  const kermitTask2 = tasksAdd({ userId: kermit.id, task: "laugh at fozzy" });
  expect(tasks[kermit.id]).toEqual(
    expect.arrayContaining([kermitTask, kermitTask2]),
  );

  const piggyTask = tasksAdd({ userId: piggy.id, task: "marry kermit" });
  expect(tasks[piggy.id]).toEqual(expect.arrayContaining([piggyTask]));
});

test("tasksClear", () => {
  tasksAdd({ userId: kermit.id, task: "be nice to piggy" });
  tasksAdd({ userId: piggy.id, task: "marry kermit" });
  expect(Object.keys(tasks).length).toBe(2);
  tasksClear();
  expect(Object.keys(tasks).length).toBe(0);
});

test("tasksList", () => {
  const kermitTask = tasksAdd({ userId: kermit.id, task: "be nice to piggy" });
  const piggyTask = tasksAdd({ userId: piggy.id, task: "marry kermit" });
  expect(tasksList(kermit.id)).toEqual(expect.arrayContaining([kermitTask]));
  expect(tasksList(piggy.id)).toEqual(expect.arrayContaining([piggyTask]));
  expect(tasksList("nope")).toEqual([]);
});
