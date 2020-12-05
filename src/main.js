// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './lib/css'
import './lib/script'
import './lib/global'

import Vue from 'vue'
import App from './App'
import router from './router'
import EventBus from './lib/eventBus.js'
import axios from 'axios'
import i18n from './i18n'

Vue.prototype.$bus = EventBus
Vue.prototype.$http = axios
// Vue.prototype.$socketip = socketio

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  i18n,

  components: {
    App
  }
})
