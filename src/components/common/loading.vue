<template>
   <div class="loading">
       <div class="loading_img" :style="{backgroundPositionY: -(positionY%7)*50 + 'px'}"></div>
   </div>
</template>

<script>
    export default {
        data () {
            return {
                positionY: 0,
                timer: null
            }
        },
        mounted () {
            this.timer = setInterval( () => {
                this.positionY++;
            }, 600)
        }
    }
</script>