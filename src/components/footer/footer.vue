<template>
    <div class="footer">
        <div @click="gotoAddress({path: '/msite', query: {geohash}})" class="footItem">
            <div v-if="$route.path.indexOf('msite') !== -1" class="actives">
                <img src="../../assets/image/indexSelect.png" alt="">
                <div class="name">外卖</div>
            </div>
            <div v-else class="default">
                <img src="../../assets/image/index.png" alt="">
                <div class="name">外卖</div>
            </div>
        </div>
        <div @click="gotoAddress({path: '/search/' + geohash})" class="footItem">
            <div v-if="$route.path.indexOf('geohash') !== -1" class="actives">
                <img src="../../assets/image/serviceSelect.png" alt="">
                <div class="name">搜索</div>
            </div>
            <div v-else class="default">
                <img src="../../assets/image/service.png" alt="">
                <div class="name">搜索</div>
            </div>
        </div>
        <div @click="gotoAddress({path: '/order'})" class="footItem">
            <div v-if="$route.path.indexOf('order') !== -1" class="actives">
                <img src="../../assets/image/newsSelect.png" alt="">
                <div class="name">订单</div>
            </div>
            <div v-else class="default">
                <img src="../../assets/image/news.png" alt="">
                <div class="name">订单</div>
            </div>
        </div>
        <div @click="gotoAddress({path: '/profile'})" class="footItem">
            <div v-if="$route.path.indexOf('profile') !== -1" class="actives">
                <img src="../../assets/image/mySelect.png" alt="">
                <div class="name">我的</div>
            </div>
            <div v-else class="default">
                <img src="../../assets/image/my.png" alt="">
                <div class="name">我的</div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        data () {
            return {}
        },
        computed: {
            ...mapState([
                'geohash'
            ]),
        },
        methods: {
            gotoAddress (path) {
               this.$router.push(path);
            }
        }
    }
</script>