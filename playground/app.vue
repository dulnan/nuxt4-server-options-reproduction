<template>
  <div>
    <h1>Test serverOptions</h1>
    <p>{{ data }}</p>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/test");
</script>
