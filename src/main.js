import Vue from 'vue'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Icon from 'vue-svg-icon/Icon'

Vue.use(ElementUI)

Vue.component('icon', Icon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
