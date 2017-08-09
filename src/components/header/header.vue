<template>
    <div class="header" id="header">
        <slot name="logo"></slot>
        <slot name="changecity"></slot>
        <slot name="search"></slot>
        <slot name="msite-title"></slot>
        <router-link to="/login" v-if="signinUp">
            <span class="login">登录|注册</span>
        </router-link>
        <span v-if="goBack" class="gobacks" @click="$router.go(-1)"></span>
        <span v-if="headTitle" class="headTitle">{{headTitle}}</span>
    </div>
</template>

<script>
    export default{
        data () {
            return {
                istrue: false
            }
        },
        props: ['signinUp', 'headTitle', 'goBack']
    }
</script>

<style>

</style>