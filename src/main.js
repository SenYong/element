import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './style/style.css'
Vue.use(mint)


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
