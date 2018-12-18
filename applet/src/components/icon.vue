<template>
    <text class="wack" :class="['wack-' + type ]" :style="{ 'font-size': size + 'rpx' || '16rpx', color: color }"></text>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: ''
            },
            size: {
                type: [String, Number],
                default: ''
            },
            color: {
                type: String,
                default: ''
            }
        }
    }

</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    @font-face {
        font-family: "wack";
        src: url('//at.alicdn.com/t/font_944094_ldsvmb6ha6g.ttf?t=1545097628819') format('truetype');
    }

    .wack {
        font-family:"wack" !important;
        font-size:16px;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .wack-daohangtubiao:before { content: "\e653"; }
    .wack-dianhuahover:before { content: "\e61f"; }
    .wack-dingwei-r:before { content: "\e610"; }
    .wack-icon--:before { content: "\e78e"; }
    .wack-sousuo:before { content: "\e64d"; }
</style>

