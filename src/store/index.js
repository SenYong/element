import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import action from './action'
import mutations from './mutations'
Vue.use(Vuex)

const state = {
   geohash: 'wtw3sm0q087',//地址geohash值
   latitude: "",
   longitude: "",
   cartList: {} // 加入购物车的商品列表
}

export default new Vuex.Store({
   state,
   getters,
   action,
   mutations,
})