<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>

  </div>
</template>

<style scoped></style>
<!-- json-server --watch db.json --port 3000
 -->