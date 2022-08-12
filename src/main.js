import Vue from 'vue'
import { Pagination, MessageBox } from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from "@/router"
import TypeNav from "@/components/TypeNav"
import store from "@/store/index"
import "@/mock/mockServe"

import "swiper/css/swiper.css";
import Carousel from "@/components/Carousel"
import * as API from "@/api"


Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.use(Pagination)
Vue.component(MessageBox.name, MessageBox)
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$message = MessageBox


Vue.config.productionTip = false
import VueLazyload from 'vue-lazyload'
// Vue.use(VueLazyload)
// or with options
const loadimage = require('./assets/2.gif')

Vue.use(VueLazyload, {
  loading: loadimage,
})
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
}).$mount('#app')
