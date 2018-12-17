<template>
    <div class="detail-modal">
        <div v-if="frame" class="dialog-wrap" @click="goConceal"></div>
        <div v-if="frame" class="dialog-cover">
            <div class="cover-header">
                <!--<div class="header-img"><img src="../../../static/image/2.png" alt=""></div>-->
                <div class="header-text">
                    <div class="text-t" @click="goConceal"><wk-icon type="chacha" size="40" color=""></wk-icon></div>
                    <div class="text-c">￥99.00</div>
                    <div class="text-b">商品编号:11111122324</div>
                </div>
            </div>
            <div class="cover-content">
                <div class="content-top">规格</div>
                <div class="content-bot" >
                    <span class="bot-to"
                        v-for="standard in standards"
                        :key="index"
                        :class="{botPitch: standard.sState}"
                        @click="goState(index)">{{ standard.standard }}</span>
                </div>
            </div>
            <div class="cover-content">
                <div class="content-top">口味</div>
                <div class="content-bot">
                    <!--<span class="bot-to">香辣</span>-->
                    <!--<span class="bot-to">香辣</span>-->
                    <!--<span class="bot-to">香辣</span>-->
                    <!--<span class="bot-to">甜辣</span>-->
                    <!--<span class="bot-to">特辣</span>-->
                    <!--<span class="bot-to">不辣</span>-->
                    <span class="bot-to"
                        v-for="taste in tastes"
                        :key="index"
                        :class="{botPitch: taste.isColor}"
                        @click="goChoice(index)">{{ taste.taste }}</span>
                </div>
            </div>
            <div class="cover-quantity">
                <div>数量</div>
                <div class="quantity-to">
                    <div class="to-t" @click="goMinus"><wk-icon type="jian" size="20" color=""></wk-icon></div>
                    <div class="to-c">{{ quantity }}</div>
                    <div class="to-b" @click="goAdd"><wk-icon type="jia" size="20" color=""></wk-icon></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import wkIcon from '../../components/icon/icon'
    export default {
        name: "dialog-modal",
        components: {
            wkIcon
        },
        data() {
            return {

            }
        },
        props: {

            frame: {
                type: Boolean,
                default: false
            },
            quantity: {
                type: Number,
                default: 1
            },
            standards: {
                type: Array,
                default: []
            },
            tastes: {
                type: Array,
                default: []
            }
        },
        methods: {
            goConceal() {
                this.$emit('go-conceal')
            },
            goState(index) {
                this.$emit('go-state', index)
            },
            goChoice(index) {
                this.$emit('go-choice', index)
            },
            goMinus() {
                this.$emit('go-minus')
            },
            goAdd() {
                this.$emit('go-add')
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    .detail-modal{
        width: 100%
        height: 100%
        .dialog-wrap{
            width: 100%
            height: 100%
            background-color black
            opacity .6
            position fixed
            left: 0
            bottom: 100rpx
            z-index: 5
        }
        .dialog-cover{
            width: 100%
            background-color white
            position fixed
            left: 0
            bottom: 100rpx
            z-index 10
            .cover-header{
                width: 100%
                height: 170rpx
                padding 0 20rpx 0 240rpx
                box-sizing border-box
                border-bottom 2rpx solid #f2f2f2
                position relative
                .header-img{
                    position absolute
                    left: 20rpx
                    top: -50rpx
                    img{
                        width: 200rpx
                        height: 200rpx
                        border-radius 8rpx
                    }
                }
                .header-text{
                    width: 100%
                    height: 150rpx
                    padding-top 30rpx
                    box-sizing border-box
                    .text-t{
                        display flex
                        justify-content flex-end
                    }
                    .text-c{
                        font-size 32rpx
                        color #FF0B29
                    }
                }
            }
            .cover-content{
                width: 100%
                padding 0 20rpx
                box-sizing border-box
                .content-top{
                    padding 20rpx 0
                    box-sizing border-box
                }
                .content-bot{
                    display flex
                    flex-wrap wrap
                    .bot-to{
                        padding 10rpx 16rpx
                        box-sizing border-box
                        margin-right 20rpx
                        margin-bottom 20rpx
                        border: 1rpx solid #DBDBDB;
                        border-radius: 4rpx;
                        color black
                    }
                    .botPitch{
                        color #F5A623
                        border: 1rpx solid #F5A623;
                    }
                }
            }
            .cover-quantity{
                width: 100%
                padding 40rpx 40rpx 100rpx 20rpx
                box-sizing border-box
                display flex
                align-items center
                justify-content space-between
                .quantity-to{
                    display flex
                    .to-t{
                        width: 40rpx
                        height: 40rpx
                        background-color #F2F2F2
                        border: 1rpx solid #DBDBDB;
                        display flex
                        align-items center
                        justify-content center
                        border-bottom-left-radius 8rpx
                        border-top-left-radius 8rpx
                    }
                    .to-c{
                        width: 80rpx
                        height: 40rpx
                        border: 1rpx solid #DBDBDB;
                        display flex
                        align-items center
                        justify-content center
                    }
                    .to-b{
                        width: 40rpx
                        height: 40rpx
                        background-color #F2F2F2
                        border: 1rpx solid #DBDBDB;
                        display flex
                        align-items center
                        justify-content center
                        border-bottom-right-radius 8rpx
                        border-top-right-radius 8rpx
                    }
                }
            }
        }

    }
</style>
