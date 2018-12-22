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
        src: url('//at.alicdn.com/t/font_883451_4r9msw93bp6.ttf?t=1544685999641') format('embedded-opentype')
    }

    .wack {
        font-family:"wack" !important;
        font-size:16px;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .wack-dingwei:before { content: "\e618"; }
    .wack-emidianhua2:before { content: "\e61a"; }
    .wack-youjiantou:before { content: "\e630"; }
    .wack-dingdan:before { content: "\e652"; }
    .wack-youhuiquan:before { content: "\e60f"; }
    .wack-huiyuan:before { content: "\e632"; }
    .wack-htmal5icon31:before { content: "\e643"; }
    .wack-yuanquanweixuanfuben:before { content: "\e610"; }
    .wack-duihao2:before { content: "\e69e"; }
    .wack-chacha:before { content: "\e629"; }
    .wack-jia:before { content: "\e612"; }
    .wack-jian:before { content: "\e6aa"; }
    .wack-liwu:before { content: "\e657"; }
    .wack-jifen:before { content: "\e674"; }
    .wack-ai66:before { content: "\e6b8"; }
    .wack-yue:before { content: "\e647"; }
    .wack-touxiang-shi:before { content: "\e65f"; }
    .wack-iconhuidaoshouye:before { content: "\e608"; }
    .wack-clock:before { content: "\e6be"; }
    .wack-sousuo:before { content: "\e64d"; }
    .wack-banben:before { content: "\e640"; }

    
</style>
