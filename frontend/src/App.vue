<script setup lang="ts">
// Our Vue application starts by mounting the router, and
// displaying whatever component the user is viewing based
// on the URL in the browser. For our application, that will
// always be the 'HomeView' component.
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>
