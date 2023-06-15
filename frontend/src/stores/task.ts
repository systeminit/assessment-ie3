// The Task store.
//
// Stores the tasks for the currently logged in user.

import { defineStore } from "pinia";
import { mande } from "mande";
import { useUserStore } from "./user";

export const taskApi = mande("/api/tasks");

// A single task; corresponds to the `Task` on the backend.
export interface Task {
  id: string;
  userId: string;
  task: string;
}

// We track an array of Task objects for each user.
export interface TaskStore {
  tasks: Task[];
}

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    tasks: [],
  }),
  actions: {
    // Get the tasks for the currently signed in user from the backend,
    // and set it to the current list of tasks. If there is no signed
    // in user, the task list should be empty.
    async getTasks() {
      const userStore = useUserStore();
      if (userStore.user) {
        this.tasks = await taskApi.get(userStore.user.id);
      } else {
        this.tasks = [];
      }
    },
    // Add a task to the task list, then update the list of tasks. It
    // is a bug to call this action when a user is not logged in; we
    // currently just log to the console if that happens.
    async addTask(task: string) {
      const userStore = useUserStore();
      if (userStore.user) {
        await taskApi.post({ userId: userStore.user.id, task });
        await this.getTasks();
      } else {
        console.log("Cannot add a task without a logged in user; bug!");
      }
    },
    // Reset the list of tasks to the initial state (empty).
    clear() {
      this.tasks = [];
    },
  },
});
