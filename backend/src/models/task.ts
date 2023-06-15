// The task model stores the tasks that users create. It stores
// them in memory - it does not persist.

import { object, string, InferType } from 'yup';
import { randomUUID } from "crypto";

// A schema for our tasks.
export const taskSchema = object({
  id: string().uuid().required(),
  userId: string().uuid().required(),
  task: string().required(),
});

// A schema for task creation, which we use to validate new tasks
// sent as JSON from the frontend.
export const taskCreateSchema = object({
  userId: string().uuid().required(),
  task: string().required(),
});

// Typescript types for our Task and TaskCreate data structures above.
export type Task = InferType<typeof taskSchema>;
export type TaskCreate = Omit<Task, "id">;

// The in memory set of tasks, indexed by user id.
export let tasks: { [userId: string]: Task[] } = {};

// Add a task to the task list, assigning it a random id.
export const tasksAdd = (taskCreate: TaskCreate) => {
  const task = {
    id: randomUUID(),
    userId: taskCreate.userId,
    task: taskCreate.task,
  };
  if (tasks[task.userId]) {
    tasks[task.userId].push(task);
  } else {
    tasks[task.userId] = [task];
  }
  return task;
}

// Clear all the tasks.
export const tasksClear = () => {
  tasks = {};
}

// List all the tasks for a given user.
export const tasksList = (userId: string) => {
  if (tasks[userId]) {
    return tasks[userId];
  } else {
    return [];
  }
}
