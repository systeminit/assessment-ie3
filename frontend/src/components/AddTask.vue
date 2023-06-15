<script setup>
// The UI for adding a task.
import { PlusCircleIcon, DocumentTextIcon } from "@heroicons/vue/solid";
import { useTaskStore } from "@/stores/task";
import { ref } from "vue";

// The task as entered by the user in the form.
const task = ref("");

const taskStore = useTaskStore();

// Add a new task. Triggered when the user hits enter in the
// text box, or hits the add button. Clears the `task` field
// after submission.
const addTask = async () => {
  await taskStore.addTask(task.value);
  task.value = "";
};
</script>

<template>
  <div>
    <label for="email" class="block text-sm font-medium text-gray-700">
      Add Task
    </label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <div class="relative flex items-stretch flex-grow focus-within:z-10">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <DocumentTextIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          v-model="task"
          name="task"
          id="task"
          class="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-800"
          placeholder="your cool task"
          @keyup.enter="addTask()"
        />
      </div>
      <button
        type="button"
        class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        @click="addTask()"
      >
        <PlusCircleIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        <span>Add</span>
      </button>
    </div>
  </div>
</template>
