<template>
   <div class="shoplist">
       <mt-loadmore :bottom-method="loadMore" ref="loadmore" bottomPullText="" bottomDropText="" bottomLoadingText="正在拼了命加载..." :bottom-all-loaded='loaded' :bottomDistance="30" v-if="shopListArr.length">
           <ul>
               <router-link class="shopLists" v-for="(item, index) in shopListArr" :to="{path: '/shop', query:{geohash, id:item.id}}" :key="item.id">
                  <div class="lt">
                      <img :src="imgBaseUrl + item.image_path" alt="">
                  </div>
                  <div class="rt">
                      <div class="shop_head">
                          <div class="pp"><span class="zp">品牌</span><span class="ns">{{item.name}}</span></div>
                          <ul class="db">
                              <li v-for="item in item.supports" :key="item.id" class="dbLi">{{item.icon_name}}</li>
                          </ul>
                      </div>
                      <div class="shop_center">
                          <section class="rating_order_num_left">
                              <span class="rating_num">{{item.rating}}</span>
                              <span class="order_section">月售{{item.recent_order_num}}单</span>
                          </section>
                          <section class="rating_order_num_right">
                              <span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
                              <span class="delivery_style delivery_right" v-if="zhunshi(item.supports)">准时达</span>
                          </section>
                      </div>
                      <div class="shop_footer">
                          <p class="fee">
                              ¥{{item.float_minimum_order_amount}}起送
                              <span>/</span>
                              {{item.piecewise_agent_fee.tips}}
                          </p>
                          <p class="distance_time">
                              <span>{{item.distance}}</span>
                              <span>/</span>
                              <span class="order_time">{{item.order_lead_time}}</span>
                          </p>
                      </div>
                  </div>
               </router-link>
           </ul>
       </mt-loadmore>
       <p class="noMore" v-else>没有更多内容</p>
       <div class="backTop" v-if="showBackStatus"></div>
       <transition name="loading">
           <loading v-if="showLoading"></loading>
       </transition>
   </div>
</template>

<script>
    import { Loadmore } from 'mint-ui'
    import { shoplist } from '../../service/getData'
    import { imgBaseUrl } from '../../config/env'
    import { showBack } from '../../config/mUtils'
    import { getImgPath } from './mixin'
    import ratingStar from './ratingStar'
    import loading from  './loading'
    export default {
        data () {
            return {
                offset: 0, //批次加载店铺列表，每次加载20个 limit = 20
                shopListArr: [], //店铺列表数据
                showLoading: true, //显示加载动画
                limit: 8,   //每次取8条
                curIndex: 0, 
                loaded: false,
                showBackStatus: false, //显示返回顶部按钮
                imgBaseUrl 
            }
        },
        props: ['geohash'],
        components: { ratingStar, loading },
        mounted () {
            this.initData();
        },
        methods: {
           async initData () {
              //获取商铺数据
              let res = await shoplist(this.latitude, this.longitude, this.offset, ++this.curIndex * this.limit);
              this.shopListArr = [...res];
              //取得数据隐藏动画
              this.hideLoading();
              //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
              showBack( status => {
                  this.showBackStatus = status;
              })
           },
           async loadMore () {
              this.loaded = true;
              let res = await shoplist(this.latitude, this.longitude, this.offset, ++this.curIndex * this.limit);
              this.shopListArr = [...res];
              this.loaded = false;
              this.$refs.loadmore.onBottomLoaded(); //必须使用钩子函数回调,关闭触发 bottomMethod 的上拉距离阈值（像素）
           },
           hideLoading () {
              this.showLoading = false;
           },
           zhunshi (supports) {
              let zhunStatus;
              if((supports instanceof Array) && supports.length) {
                 supports.forEach( item => {
                    if(item.icon_name === '准'){
                        zhunStatus = true;
                    }
                 })
              }else{
                 zhunStatus = false;
              }
              return zhunStatus;
           }
        }
    }
</script>