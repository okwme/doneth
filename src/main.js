// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import VueWorker from 'vue-worker'
import moment from 'moment'
router.afterEach((to, from, next) => {
  if (typeof window.ga !== 'undefined') ga('send', 'pageview')
})
sync(store, router)
Vue.use(VueWorker)

Object.defineProperty(Vue.prototype, '$moment', { value: moment })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
