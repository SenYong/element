<template>
    <div class="star">
        <div :style=" 'width:' + rating*2/5 + 'rem'" class="star_overflow">
            
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        props: ['rating']
    }
</script>