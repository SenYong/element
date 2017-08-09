<template>
    <div class="home">
        <head-top signin-up='home'>
            <span slot="logo" class="logo" @click="reload">element</span>
        </head-top>
        <nav class="city_nav">
            <div class="city_tip">
                <span>当前定位城市：</span>
                <span>定位不准时，请在城市列表中选择</span>
            </div>
            <router-link :to="'/city/' + guessCityid" class="guess_city">
                <span>{{guessCity}}</span>
            </router-link>
        </nav>
        <div class="hot_city_container" id="hot_city_container">
            <h4 class="hotCity">热门城市</h4>
            <ul class="cityList">
                <router-link  tag="li" :to=" '/city/' + item.id" v-for="(item, index) in guessHotCity" :key="item.id" class="hotCityname">
                   {{item.name}}
                </router-link>
            </ul>
        </div>
        <div class="group_city_container">
            <ul class="letter_classify">
                <li class="letter_classify_li" v-for="(value, key, index) in sortgroupcity" :key="key">
                    <h4 class="groupcityName">
                        {{key}}
                        <span v-if="index == 0">（按字母排序）</span>
                    </h4>
                    <ul class="citylistul">
                        <router-link tag="li" v-for="(item, index) in value" :key="item.id" :to=" '/city/' + item.id " class="citylistli">
                           {{item.name}}
                        </router-link>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/header/header'
    import { cityGuess, hotcity, groupcity } from '../../service/getData'
    export default{
        data () {
            return {
                guessCity: "",  //当前城市
                guessCityid: "", //当前城市id
                guessHotCity: "", //获取当前热门城市
                guessGroupCity: "", //获取所以城市
            }
        },
        components:{ headTop },
        computed: {
            //将获取的数据按照A-Z字母开头排序
            sortgroupcity(){
                let sortobj = {};
                for(let i = 65; i <= 90; i++ ){
                    if(this.guessGroupCity[String.fromCharCode(i)]){
                       sortobj[String.fromCharCode(i)] = this.guessGroupCity[String.fromCharCode(i)];
                    }
                }
                return sortobj;
            }
        },
        async mounted () {
            //获取当前城市
            await cityGuess().then( res => {
                console.log(res)
                this.guessCity = res.name;
                this.guessCityid = res.id;
            })

            //获取热门城市
            await hotcity().then( res => {
                this.guessHotCity = res;
            })

            //获取所以城市
            await groupcity().then( res => {
                this.guessGroupCity = res
            })
        },
        methods: {
           //点击logo刷新
           reload() {
             window.location.reload();
           } 
        } 
    }
</script>