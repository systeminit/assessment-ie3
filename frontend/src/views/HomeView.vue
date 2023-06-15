<script setup lang="ts">
// The primary view for Taskly.
//
// If the user is not signed in, we show them the sign in page.
// If the user is signed in, we show them Taskly.
//

import SignIn from "@/components/SignIn.vue";
import TasklyMain from "@/components/TasklyMain.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<template>
  <template v-if="!userStore.user">
    <SignIn />
  </template>
  <template v-else>
    <TasklyMain />
  </template>
</template>
