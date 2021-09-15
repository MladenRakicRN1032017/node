import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login";
import Profile from "@/views/Profile";

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      authRequired: false
    },
    component: Home
  },
  {
    path: '/:text',
    name: 'HomeFiltered',
    meta: {
      authRequired: false
    },
    props: route => ({text: route.params.text}),
    component: Home
  },
  {
    path: '/categories/:category',
    name: 'HomeCategory',
    meta: {
      authRequired: false
    },
    props: route => ({category: route.params.category}),
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      authRequired: false
    },
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      authRequired: true
    },
    component: Profile
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    const jwt = localStorage.getItem('jwt')
    if (!jwt) {
      next({name: Login})
      return
    }
  }
  next()
})

export default router