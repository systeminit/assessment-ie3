<script setup lang="ts">
// The sign in page for Taskly.
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

// The userName entered in the text field.
const userName = ref("");

const userStore = useUserStore();

// Sign the user in. Used when the sign in button is clicked.
const signIn = async () => {
  await userStore.signIn(userName.value);
};
</script>

<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Tell us your name to start adding tasks!
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div class="mt-1">
              <input
                v-model="userName"
                id="name"
                name="name"
                type="name"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click="signIn()"
            >
              Sign in to add tasks!
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
