import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && to.name !== 'Register' && !store.getters.isAuthenticated) next({ name: 'Login' })
  else next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
