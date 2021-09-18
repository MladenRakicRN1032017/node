import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login";
import Profile from "@/views/Profile";
import Book from "@/views/Book";
import ReserveBook from "@/views/ReserveBook";
import Register from "@/views/Register";

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
    path: '/filtered/:text',
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
  },
  {
    path: '/book/:id',
    name: 'Book',
    meta: {
      authRequired: false
    },
    props: route => ({id: route.params.id}),
    component: Book
  },
  {
    path: '/reserve/:id',
    name: 'Reserve',
    meta: {
      authRequired: true
    },
    props: route => ({book: route.params.id}),
    component: ReserveBook
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      authRequired: false
    },
    component: Register
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    const jwt = localStorage.getItem('jwt')
    if (jwt == null) {
      next('/login')
      return
    }
  }
  next()
})

export default router