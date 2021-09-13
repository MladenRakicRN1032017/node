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
    component: Home
  },
  {
    path: '/:text',
    name: 'HomeFiltered',
    props: route => ({text: route.params.text}),
    component: Home
  },
  {
    path: '/categories/:category',
    name: 'HomeCategory',
    props: route => ({category: route.params.category}),
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = new VueRouter({
  routes
})

export default router