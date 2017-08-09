<template>
    <div class="shopDetail">
        <head-top head-title="商家详情" go-back="true"></head-top>
        <div class="activities_container">
            <header>活动与属性</header>
            <ul class="actibities_ul">
                <li></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import headTop from '../../../components/header/header'
    export default {
        data () {
            return {}
        },
        components: { headTop }
    }
</script>