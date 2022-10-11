<template>
  <div class="home-page">
    <HelloWorld msg="Hello, world." />
    <n-button type="primary" @click="handleClick">The shop of pets</n-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<script setup>
import HelloWorld from '@components/HelloWorld.vue'
import { NButton } from 'naive-ui'
import { useRouter } from '@router/index'

const router = useRouter()
const handleClick = () => {
  router.push('/pets')
}
</script>

<style scoped>
@import url('./home.less');
</style>
