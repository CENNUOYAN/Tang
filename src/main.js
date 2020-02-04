import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import Router from 'vue-router'
import router from '@/router/index.js'

// vuex引入
import store from '@/store/index'

// 修复路由报NavigationDuplicated异常
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
