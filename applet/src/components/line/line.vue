
<style lang="scss">
    .line__wrap{
        
    }
</style>

<template>
    <view class="line__wrap" :style="{ height: height + 'rpx', 'background-color': color }"></view>
</template>

<script>
    export default {
        props: {
            height: {
                type: [String, Number],
                default: '1'
            },
            color: {
                type: String,
                default: '#eee'
            }
        }
    } 
</script>

