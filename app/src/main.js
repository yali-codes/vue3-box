import App from './App.vue'
import router from './router'
import { ethStore } from '@stores/index'
import { useWeb3 } from '@hooks/index'
import { createApp } from 'vue'

createApp(App).use(router).mount('#app', true)

// Routing front guard
router.beforeEach((_, __, next) => {
  if (!ethStore.web3) {
    // Initialize web3 and smart contract before routing jump,
    // so the useWeb3 method need to carry `next` parameter.
    return useWeb3(next)
  }
  next()
})
