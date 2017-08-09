<template>
    <div class="shop">
        <div class="shop_container" v-if="!showLoading">
            <header class="shop_detail_header">
                <img :src="imgBaseUrl + shopDetailData.image_path" alt="商品图片" class="header_cover_img">
                <div class="description_header">
                    <div class="description_top">
                        <div class="description_left">
                            <img :src="imgBaseUrl + shopDetailData.image_path" alt="">
                        </div>
                        <router-link class="description_right" to="/shop/shopDetail">
                            <h4 class="description_title ellipsis">{{shopDetailData.name}}</h4>
                            <p class="description_text">商家配送／{{shopDetailData.order_lead_time}}分钟送达／配送费¥{{shopDetailData.float_delivery_fee}}</p>
                            <p class="description_promotion">公告：{{promotionInfo}}</p>
                            <span class="right_icon"></span>
                        </router-link>
                    </div>
                    <div class="description_footer" v-if="shopDetailData.activities.length" @click="showActivitiesFun">
                        <p class="ellipsis">
                            <span class="tip_icon" :style="{ backgroundColor: '#' + shopDetailData.activities[0].icon_color }">{{shopDetailData.activities[0].icon_name}}</span>
                            <span>{{shopDetailData.activities[0].description}}(APP专享)</span>
                        </p>
                        <p class="ellipsis_length">{{shopDetailData.activities.length}}个活动</p>
                    </div>
                </div>
            </header>
            <div class="change_show_type" ref="chooseType">
                <div class="type">
                    <span :class="{ activity_show: changeShowType == 'food' }">商品</span>
                </div>
                <div class="type">
                    <span :class="{ activity_show: changeShowType == 'rating' }">评价</span>
                </div>
            </div>
            <div class="food_container">
                <div class="menu_container">
                    <div class="menu_left" ref="wrapperMenu">
                        <ul>
                            <li v-for="(item, index) in menuList" class="menu_left_li" :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">
                               <img :src="getImgPath(item.icon_url)" alt="" v-if="item.icon_url" class="icon_url">
                               <span>{{item.name}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="menu_right" ref="menuFoodList">
                        <ul>
                            <li v-for="(item, index) in menuList" :key="index" v-if="menuIndex == index">
                                <header >
                                    <div class="menu_detail_header_left">
                                        <strong class="menu_item_title">{{item.name}}</strong>
                                        <span class="menu_item_description">{{item.description}}</span>
                                    </div>
                                </header>
                                <div class="menu_detail_list" v-for="(food, foodindex) in item.foods" :key="foodindex">
                                    <div class="menu_detail_link">
                                        <img :src="imgBaseUrl + food.image_path" alt="" class="menu_food_img">
                                        <div class="menu_food_description">
                                            <h3 class="food_description_head">
                                                <strong class="description_foodname">{{food.name}}</strong>
                                                <ul v-if="food.attributes.length">
                                                    <li v-for="(attribute,index) in food.attributes" :key="index">
                                                        <p v-if=" attribute.icon_name == '招牌' " class="zp">{{attribute.icon_name}}</p>
                                                    </li>
                                                </ul>
                                            </h3>
                                            <p class="food_description" v-if="food.description">{{food.description}}</p>
                                            <p class="food_rating">
                                                <span v-if="food.month_sales">月售{{food.month_sales}}份</span>
                                                <span v-if="food.satisfy_rate">好评率{{food.satisfy_rate}}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <footer class="menu_detail_footer">
                                        <section class="food_price">
                                            <span>¥</span>
                                            <span>{{food.specfoods[0].price}}</span>
                                            <span v-if="food.specifications.length">起</span>
                                        </section>
                                        <buy-cart :food="food" :shopId="shopId" @showChooseList="showChooseList"></buy-cart>
                                    </footer>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 底部购物车 -->
                <div class="buy_cart_container">
                    <div class="cart_icon_num">
                        <div class="cart_icon_container">
                            <span class="cart_list_length">1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <loading v-if="showLoading"></loading>
        <transition name="router-slid" mode="out-in">
            <router-view ></router-view>
        </transition>
        <!-- 选择规格 -->
        <section>
             <transition name="fadeBounce">
                 <div class="specs_list" v-if="showSpecs">
                     <header class="specs_head">
                         <h4>{{choosedFoods.name}}</h4>
                         <span class="close" @click="showChooseList">X</span>
                     </header>
                     <div class="specs_details">
                        <h5>{{choosedFoods.specifications[0].name}}</h5>
                        <ul>
                            <li v-for="(item, index) in choosedFoods.specifications[0].values" :key="index" class="specsLi" :class="{'specsActive': index == specsIndex }" @click="chooseSpecs(index)">
                                {{item}}
                            </li>
                        </ul>
                     </div>
                     <footer class="specs_footer">
                         <span class="specs_price">¥{{choosedFoods.specfoods[specsIndex].price}}</span>
                         <span class="specs_addto_cart" @click="addSpecs(choosedFoods.category_id, choosedFoods.item_id, choosedFoods.specfoods[specsIndex].food_id, choosedFoods.specfoods[specsIndex].name, choosedFoods.specfoods[specsIndex].price, choosedFoods.specifications[0].values[specsIndex], choosedFoods.specfoods[specsIndex].packing_fee, choosedFoods.specfoods[specsIndex].sku_id, choosedFoods.specfoods[specsIndex].stock)">加入购物车</span>
                     </footer>
                 </div>    
             </transition>
        </section>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import { msiteAdress, shopDetails, foodMenu  } from '../../service/getData'
    import { imgBaseUrl } from '../../config/env'
    import { getImgPath } from '../../components/common/mixin'
    import loading from '../../components/common/loading' 
    import buyCart from '../../components/common/buyCart'
    export default {
        data () {
            return {
                geohash: '', //geohash位置信息
                shopId: null, //商店id值
                showLoading: true, //显示加载动画
                shopDetailData: null, //商铺详情
                menuList: [], //食品列表
                showActivities: false, //是否显示活动详情
                changeShowType: 'food', //切换显示商品或者评价
                showSpecs: false,//控制显示食品规格
                menuIndex: 0, //已选菜单索引值，默认为0
                choosedFoods: null, //当前选中规格列表数据
                specsIndex: 0, //当前选中的规格索引值
                imgBaseUrl
            }
        },
        mixins: [getImgPath],
        components: {loading, buyCart},
        created () {
            this.geohash = this.$route.query.geohash;
            this.shopId = this.$route.query.id;
        },
        mounted () {
            this.initData();
        },
        computed: {
            ...mapState(['latitude', 'longitude']),
            promotionInfo: function () {
                return this.shopDetailData.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。'
            }
        },
        methods: {
            ...mapMutations(['RECORD_ADDRESS', 'ADD_CART']),
            //初始化时获取基本数据
            async initData () {
               if(!this.latitude){
                  //获取位置信息
                  let res = await msiteAdress(this.geohash);
                  // 记录当前经度纬度进入vuex
                  this.RECORD_ADDRESS(res);
               }
               //获取商铺信息
               this.shopDetailData = await shopDetails(this.shopId, this.latitude, this.longitude);
               //获取商铺食品列表
               this.menuList = await foodMenu(this.shopId);
              
               //隐藏加载动画
               this.hideLoading();
               console.log(this.menuList)
            },
            hideLoading () {
               this.showLoading = false;
            },
            //控制活动详情页的显示隐藏
            showActivitiesFun () {
               this.showActivities = !this.showActivities
            },
            //点击左侧食品列表标题，相应列表移动到最顶层
            chooseMenu (index) {
                this.menuIndex = index;
            },
            //显示规格列表
            showChooseList(food){
                if(food){
                    this.choosedFoods = food
                }
                this.showSpecs = !this.showSpecs
                this.specsIndex = 0
            },
            //记录当前所选规格的索引值
            chooseSpecs(index){
                this.specsIndex = index
            },
            
            //多规格商品加入购物车
            addSpecs (category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock) {
               this.ADD_CART({
                  shopid: this.shopId,
                  category_id,
                  item_id,
                  food_id,
                  name,
                  price,
                  specs,
                  packing_fee,
                  sku_id,
                  stock 
               }) 
               console.log
               this.showChooseList() 
            }
        }
    }
</script>

<style>
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(32px, 0, 0);
        opacity: 0;
    }
</style>