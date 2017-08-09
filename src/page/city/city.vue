<template>
    <div class="city">
        <head-top :head-title="cityname" go-back="true">
           <router-link to="/home" slot="changecity" class="changecity">切换城市</router-link>
        </head-top>
        <form class="cityform" v-on:submit.prevent>
            <input type="search" name="city" placeholder="输入学校、商务楼、地址" class="city_input addStyle" required v-model='inputVaule'>
            <input type="submit" name="submit" class="city_input" @click='postpois' value="提交">
        </form> 
        <div class="history">
            <h4 v-if="historytitle" class="historytitles">搜索历史</h4>
            <div class="list">
                <ul>
                    <li v-for="(item, index) in placelist" :key="index" class="listLi" @click="nextpage(index, item.geohash)">
                        <div class="names">{{item.name}}</div>
                        <div class="address">{{item.address}}</div>
                    </li>
                </ul>
            </div>
            <div class="historytitles" v-if="placeNone">很抱歉！无搜索结果</div>
            <div class="footer" @click="clearAll" v-if="historytitle&&placelist.length">清空所有</div>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/header/header'
    import { currentcity, searchplace } from '../../service/getData'
    import {getStore, setStore, removeStore} from '../../config/mUtils'
    export default {
        data () {
            return {
                cityid: '', //当前城市id
                cityname: '', //当前城市名字
                placelist: [], //搜索城市列表
                inputVaule: '', //搜索地址
                historytitle: true, //默认显示搜索头部
                placeNone: false, //搜索无内容时显示信息
                placeHistory:[] // 历史搜索记录
            }
        },
        components: { headTop },
        mounted () {
            //获取当前城市的id
            this.cityid = this.$route.params.cityid;
            //获取当前城市名字
            currentcity(this.cityid).then( res => {
                this.cityname = res.name;
            })
            this.initData();
        },
        methods: {
           initData () {
              if(getStore('placeHistory')){
                 this.placelist = JSON.parse(getStore('placeHistory'));
              }else{
                 this.placelist = []
              }
           },

           postpois () {
             //输入值不为空时才发送信息
             if(this.inputVaule){
                searchplace(this.cityid, this.inputVaule).then( res => {
                    this.historytitle = false;
                    this.placelist = res;
                    this.placeNone = res.length ? false : true;
                })
             }
           },

           /**
             * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
             * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
             */
           nextpage (index, geohash) {
              let history = getStore('placeHistory');
              let choosePlace = this.placelist[index];
              if(history){
                 let checkrepeat = false;
                 this.placeHistory = JSON.parse(history);
                 this.placeHistory.forEach(item => {
                    if(item.geohash == geohash){
                       checkrepeat = true; 
                    }
                 })
                 if(!checkrepeat){
                    this.placeHistory.push(choosePlace) 
                 }
              }else{
                 this.placeHistory.push(choosePlace)
              }
              setStore('placeHistory', this.placeHistory);
              this.$router.push({path:'/msite', query:{geohash}});
           },
           clearAll () {
              removeStore('placeHistory');
              this.initData();
           } 
        }
    }
</script>