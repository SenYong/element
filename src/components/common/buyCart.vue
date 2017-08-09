<template>
     <div class="buyCart">
         <section v-if="food.specifications.length">
             <section class="choose_icon_container">
                  <!-- <transition name="showReduce">
                      <span class="delate">s</span>
                  </transition>
                  <transition name="fade">
                      <span class="cart_num">s</span>
                  </transition> -->
                  <span class="chooseList" @click="showChooseList(food)">选规格</span>
             </section>
         </section>
         <section v-else>
             aaa
         </section>
     </div>
</template>


<script>
    export default {
        data () {
            return {}
        },
        props: ['shopId', 'food'],
        methods: {
            //显示规格列表
            showChooseList (foodScroll) {
               //触发父组件的@showChooseList事件
               this.$emit('showChooseList', foodScroll)
            }
        } 
    }
</script>
