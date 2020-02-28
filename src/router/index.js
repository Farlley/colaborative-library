import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import('@/views/Register')
  },
  {
    name: 'Book',
    path: '/book',
    component: () => import('@/views/Book'),
    props: true
  },
  {
    name: 'MyBooks',
    path: '/my-books',
    component: () => import('@/views/MyBooks'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
