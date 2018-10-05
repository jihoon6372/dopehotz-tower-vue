// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

/* css */
require('@/assets/css/tower.css');
require('@/assets/css/tower_m.css');
require('@/assets/css/carousel_core.css');

/* js */
// require('@/assets/js/mouse_wheel.js');
// require('@/assets/js/carousel_core.js');
// require('@/assets/js/main_carousel.js');
// require('@/assets/js/sc_player.js');
// require('@/assets/js/preview.js');
// require('@/assets/js/common.js');
// require('@/assets/js/taginput.js');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
