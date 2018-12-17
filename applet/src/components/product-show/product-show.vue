<template>
    <div class="show-recomm">
        <div class="recomm-content" v-for="i in integralList" :key="index" @click="goInDetail(index)">
            <div class="content-t"><img :src="i.image" alt=""></div>
            <div class="content-c">
                {{ i.shopname }}
            </div>
            <div class="content-b">
                <div class="b-top">{{ i.integral }}积分</div>
                <!--<div class="b-people">9999人购买</div>-->
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "product-show",
        data() {
            return {

            }
        },
        props: {
            integralList: {
                type: Array,
                default: []
            }
        },
        methods: {
            goInDetail(index) {
                this.$emit('go-detail',index)
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    .show-recomm{
        width: 100%
        display flex
        justify-content space-between
        flex-wrap wrap
        .recomm-content{
            width: 370rpx
            margin-top 14rpx
            background-color white
            .content-t{
                width: 370rpx
                height: 370rpx
                display flex
                justify-content center
                align-items center
                img{
                    width: 370rpx
                    height: 370rpx
                }
            }
            .content-c{
                width: 100%
                line-height 32rpx
                color #333333
                padding 10rpx 10rpx 0 10rpx
                box-sizing border-box
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }

            .content-b{
                flex 1
                padding 20rpx 10rpx 0 10rpx
                box-sizing border-box
                display flex
                justify-content space-between
                color #FF0B29
            }
            .b-top{
                font-size 28rpx
            }
            .b-people{
                color #A0A0A0
            }

        }
    }

</style>
