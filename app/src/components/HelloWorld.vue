<template>
  <h1>{{ msg }}</h1>
  <n-button type="primary" @click="count++">count is {{ count }}</n-button>
</template>

<script setup>
import { ref } from 'vue'
import { NButton } from 'naive-ui'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
