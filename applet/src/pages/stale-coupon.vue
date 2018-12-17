<template>
    <div class="wrap-stale-coupon">
        <section v-if="coupons.length!=0">
            <div class="coupon-list" v-for="item in coupons" :key="index">
                <div class="left">
                    <div class="left-s-money">
                        <span style="font-size: 28rpx">￥</span>
                        <span>{{ item.face_value }}</span>
                    </div>
                    <div class="left-b-money">满{{ item.order_odds }}元可用</div>
                </div>
                <div class="right">
                    <div class="right-t">{{ item.name }}</div>
                    <div class="right-b">
                        <div class="bot-l">{{ item.timer }}</div>
                        <div class="bot-r">已过期</div>
                    </div>
                </div>
            </div>
        </section>
        <section v-else>
            <div class="no-coupon">
                <div><wk-icon type="youhuiquan" size="120" color="#D8D8D8"></wk-icon></div>
                <div>暂无过期优惠券</div>
            </div>
        </section>
    </div>
</template>

<script>
    import wkIcon from '../components/icon/icon'
    import { getCoupons, getMyCoupons } from '@/api'
    export default {
        name: "coupon",
        components: {
            wkIcon
        },
        data() {
            return {
                coupons: [],
                unused:0
            }
        },
        methods: {
            unusedCoupon() {
                this.coupons = []
                getMyCoupons(this.unused).then((res) => {
                    console.log(res)
                    this.coupons = res.data.map(item => {
                        return {
                            order_odds: item.coupon.order_odds,
                            name: item.coupon.coupon_name,
                            face_value: item.coupon.face_value,
                            timer: `${item.coupon.start_time.split(' ')[0].replace(/-/g, '.')} - ${item.coupon.expire_time.split(' ')[0].replace(/-/g, '.')}`,
                            status: item.status
                        }
                    })
                    console.log('生成的数组',this.coupons.length)
                }).catch((err) => {
                    console.log(err)
                });
            },
        },
        mounted() {
            this.unusedCoupon()
        }
    }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    .wrap-stale-coupon{
        width: 100%
        padding 10rpx 30rpx
        box-sizing border-box
        letter-spacing: 0;
        .coupon-list{
            width: 100%
            height: 200rpx
            margin-top 20rpx
            display flex
            .left{
                width: 200rpx
                height: 200rpx
                color white
                text-align center
                background-color #D8D8D8
                .left-s-money{
                    font-weight 500
                    font-size 48rpx
                    padding 32rpx 0 20rpx 0
                    box-sizing border-box
                }
            }
            .right{
                flex 1
                background-color white
                padding 28rpx 28rpx 20rpx 28rpx
                box-sizing border-box
                display flex
                flex-direction column
                justify-content space-between
                .right-t{
                    font-size 28rpx
                }
                .right-b{
                    width: 100%
                    height: 50rpx
                    display flex
                    justify-content space-between
                    .bot-l{
                        line-height 50rpx
                        color #A0A0A0
                    }
                    .bot-r{
                        width: 140rpx
                        height: 50rpx
                        border 1rpx solid #D8D8D8
                        border-radius 25rpx
                        color #D8D8D8
                        line-height 46rpx
                        text-align center
                        box-sizing border-box
                    }
                }
            }
        }
        .coupon-skip{
            width: 100%
            padding 40rpx 0
            box-sizing border-box
            display flex
            justify-content center
            color #A0A0A0
        }
        .no-coupon{
            padding 400rpx 0 0 0
            box-sizing border-box
            display flex
            flex-direction column
            justify-content center
            align-items center
            color #D8D8D8
            font-size 30rpx
        }
    }
</style>
