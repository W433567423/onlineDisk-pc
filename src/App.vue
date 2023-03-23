<template>
  <div class="app"><router-view /></div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
const store = useStore();
store.dispatch('userModule/initUser');
</script>

<style scoped>
/* .app {
  width: 100%;
} */
</style>
