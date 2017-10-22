// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'
sync(store, router)
window.moment = moment // dont hate me :)

Vue.config.productionTip = false
Vue.use(VueMomentJS, moment)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
