<template>
    <div class="cash-box">
        <div class="box-wrap" v-if="exchangeSucc"></div>
        <div class="box-cover" v-if="exchangeSucc">
            <div class="cover-top">
                <div class="top-content">
                    <wk-icon type="liwu" size="70" color="#F5A623"></wk-icon>
                </div>
            </div>
            <div class="cover-center">
                兑换成功
            </div>
            <div class="cover-bottom">
                <div class="left" @click="goCancel">取消</div>
                <div class="right" @click="goDetail">查看详情</div>
            </div>
        </div>
    </div>
</template>

<script>
    import wkIcon from '../../components/icon/icon'
    export default {
        name: "exchange-success",
        components: {
            wkIcon
        },
        props: {
            exchangeSucc: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {

            }
        },
        methods: {
            goCancel() {
                this.$emit('go-conceal')
            },
            goDetail() {
                this.$emit('go-detail')
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    .cash-box{
        width: 100%
        height: 100%
        .box-wrap{
            width: 100%
            height: 100%
            background-color black
            opacity .6
            position fixed
            left: 0
            bottom: 100rpx
            z-index: 5
        }
        .box-cover{
            width: 590rpx
            padding 0 80rpx
            box-sizing border-box
            height: 480rpx
            background-color white
            position fixed
            left: 80rpx
            top: 300rpx
            z-index 10
            border-radius 8rpx
            .cover-top{
                width: 100%
                height: 290rpx
                padding 80rpx 0 60rpx 0
                box-sizing border-box
                display flex
                justify-content center
                .top-content{
                    width: 156rpx
                    height: 156rpx
                    border-radius 50%
                    background-color #f2f2f2
                    display flex
                    align-items center
                    justify-content center
                }
            }
            .cover-center{
                width: 100%
                text-align center
                color #666666
            }
            .cover-bottom{
                width: 430rpx
                height: 60rpx
                margin-top 48rpx
                display flex
                justify-content space-between
                .left{
                    width: 200rpx
                    height: 60rpx
                    border 1rpx solid #CBCBCB
                    box-sizing border-box
                    border-radius 8rpx
                    color #666666
                    display flex
                    align-items center
                    justify-content center
                }
                .right{
                    width: 200rpx
                    height: 60rpx
                    background-color #F5A623
                    border-radius 8rpx
                    color white
                    display flex
                    align-items center
                    justify-content center
                }
            }
        }
    }
</style>
