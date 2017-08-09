<template>
    <div class="msite">
        <head-top signin-up="msite">
             <router-link to="/home" slot="search" class="search">
             </router-link>
             <router-link to="/home" slot="msite-title">
                 <span class="msiteTitle">{{msiteTitle}}</span>
             </router-link>
        </head-top>
        <nav class="msite_nav">
            <mt-swipe :auto="4000" v-if="foodTypes.length">
                <mt-swipe-item v-for="(item, index) in foodTypes" :key="index">
                    <router-link v-for="(foodItem, index) in item" :key="foodItem.id" to="/home" class="foodTo">
                       <img :src="imgBaseUrl + foodItem.image_url" alt="" class="foodImg">
                       <div class="foodName">{{foodItem.title}}</div>
                    </router-link>
                </mt-swipe-item>   
            </mt-swipe>
        </nav>
        <div class="shop_list_container">
            <header>附近商家</header>
            <shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
        </div>
        <foot-Guide></foot-Guide>
    </div>
</template>

<script>
    import headTop from '../../components/header/header'
    import footGuide from '../../components/footer/footer'
    import shopList from '../../components/common/shoplist'
    import { cityGuess, msiteAdress, msiteFoodTypes } from '../../service/getData'
    import { mapMutations } from 'vuex'
    import { Swipe, SwipeItem } from 'mint-ui'
    export default {
        data () {
            return {
                geohash: "", //city页面传递过来的地址geohash
                msiteTitle: "请选择地址...",  //页面头部的标题
                foodTypes: [], //食品分类列表
                hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
                imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
            }
        },
        components: { headTop, footGuide, shopList },
        async beforeMount () {
            if(!this.$route.query.geohash){
                const address = await cityGuess();
                this.geohash = address.latitude + ',' + address.longitude;
            }else{
                this.geohash = this.$route.query.geohash;
            }
            this.SAVE_GEOHASH(this.geohash); //保存到vuex
            //获取位置信息
            let res = await msiteAdress(this.geohash);
            this.msiteTitle = res.address;
            // 记录当前经度纬度
            this.RECORD_ADDRESS(res);
            this.hasGetData = true;
        },
        mounted () {
            //获取导航食品类型列表
            msiteFoodTypes(this.geohash).then(res => {
                let resLength = res.length;
                let resArr = [...res]; //返回一个新的数组
                let foodArr = [];
                for(let i = 0, j = 0; i < resLength; i+=8, j++){
                    foodArr[j] = resArr.splice(0,8);
                }
                this.foodTypes = foodArr;
            })
        },
        methods: {
           ...mapMutations(['SAVE_GEOHASH','RECORD_ADDRESS'])
        }
    }
</script>