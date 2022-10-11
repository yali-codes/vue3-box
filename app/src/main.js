import App from './App.vue'
import router from './router'
import { ethStore } from '@stores/index'
import { useWeb3 } from '@hooks/index'
import { createApp } from 'vue'

createApp(App).use(router).mount('#app', true)

// Routing front guard
router.beforeEach((_, __, next) => {
  if (!ethStore.web3) {
    useWeb3()
  }
  next()
})
