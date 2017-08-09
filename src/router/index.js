import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const home = r => require.ensure( [], () => r(require("../page/home/home")), 'home');
const city = r => require.ensure( [], () => r(require("../page/city/city")), 'city');
const msite = r => require.ensure( [], () => r(require("../page/msite/msite")), 'msite'); 
const shop = r => require.ensure( [], () => r(require("../page/shop/shop")), 'shop');
const shopDetail = r => require.ensure([], () => r(require('../page/shop/children/shopDetail')), 'shopDetail')

export default new VueRouter({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/city/:cityid',
      component: city
    },
    {
      path: '/msite',
      component: msite
    },
    {
      path: '/shop',
      component: shop,
      children: [
         {path: 'shopDetail', component: shopDetail}
      ]
    }
  ]
})
