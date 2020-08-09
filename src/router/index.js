import Vue from 'vue'
import VueRouter from 'vue-router'
import Pitchers from '../views/Pitchers.vue'
import Batters from '../views/Batters.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Pitchers',
    component: Pitchers
  },
  {
    path: '/Batters',
    name: 'Batters',
    component: Batters
  }
]

const router = new VueRouter({
  routes
})

export default router
