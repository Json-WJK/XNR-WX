<template>
   <div>
       <div class="aotom-discounts">
           <scroll-view class="scroll-view_H" scroll-x style="width: 100%">
               <ul>
                   <li v-for="item in couponsList" :key="index">
                       <div class="coupon"
                            :class="{couponState1: item.is_get==1, couponState0: item.is_get!=1 }" @click="getCoupons(index)">
                           <div class="coupon-l" :class="{couponSe1: item.is_get==1,couponSe0: item.is_get!=1}">
                               <div class="l-top"><span>￥</span><span class="top-s">{{ item.face_value }}</span></div>
                               <div class="l-bot">满{{ item.order_odds }}元可用</div>
                           </div>
                           <div v-if="item.is_get!=1" class="coupon-r">点击领取</div>
                           <div v-else class="coupon-r" @click="getCoupons(index)">已领取</div>
                       </div>
                   </li>
               </ul>
           </scroll-view>
       </div>
   </div>
</template>

<script>
    export default {
        name: "discounts-coupon",
        props: {
            couponsList: {
                type: Array,
                default: []
            }
        },
        data() {
            return {

            }
        },
        methods: {
            getCoupons(index) {
                this.$emit('get-coupons', index)

            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    .aotom-discounts{
        width: 100%
        height: 120rpx
        background-color white
        ul{
            display flex
            padding 0 60rpx 0 30rpx
            box-sizing border-box
            li{
                height: 120rpx
                margin-right 20rpx
                box-sizing border-box
                .couponState1{
                    color #CBCBCB
                    border-color #CBCBCB
                }
                .couponState0{
                    color #F74C69
                    border-color #F74C69
                }
                .coupon{
                    height: 120rpx
                    padding 20rpx 0
                    box-sizing border-box
                    border 1rpx solid
                    border-radius 8rpx
                    display flex
                    .couponSe1{
                        border-color #CBCBCB
                    }
                    .couponSe0{
                        border-color #F74C69
                    }
                    .coupon-l{
                        padding 0 20rpx
                        box-sizing border-box
                        height: 80rpx
                        border-right 1rpx solid
                        .l-top{
                            width: 100%
                            line-height 48rpx
                            text-align center
                            font-size 32rpx
                            .top-s{
                                font-size 48rpx
                                font-weight 500
                            }
                        }
                        .l-bot{
                            white-space:nowrap
                            line-height 24rpx
                            text-align center
                            letter-spacing 2rpx
                        }
                    }
                    .coupon-r{
                        flex 1
                        display flex
                        align-items center
                        justify-content center
                        white-space:nowrap
                        padding 0 20rpx
                        box-sizing border-box
                    }

                }
            }
        }
    }
</style>
