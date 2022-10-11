export const routes = [
  {
    path: '/',
    name: 'home',
    icon: '',
    component: () => import('../views/home/home.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/pets',
    name: 'pets',
    icon: '',
    component: () => import('../views/pets/pets.vue'),
    meta: {
      title: '宠物商铺',
    },
  },
]
