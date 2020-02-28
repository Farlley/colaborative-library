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
    name: 'Books',
    path: '/books',
    component: () => import('@/views/Books'),
    props: true
  },
  {
    name: 'MyBooks',
    path: '/my-books',
    component: () => import('@/views/MyBooks'),
    props: true
  },
  {
    name: 'MyLoans',
    path: '/my-loans',
    component: () => import('@/views/MyLoans'),
    props: true
  },
  {
    name: 'Book',
    path: '/books/:id',
    component: () => import('@/views/Book'),
    props: true
  },
  {
    name: 'BookNew',
    path: '/books/new',
    component: () => import('@/views/BookNew'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
