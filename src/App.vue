<template>
  <div id="app">
      <transition name="router-fade">
          <router-view></router-view>
      </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  .router-fade-enter-active, .router-fade-leave-active {
     transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active{
     opacity: 0;
  }
</style>
