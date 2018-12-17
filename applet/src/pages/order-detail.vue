<template>
    <div class="wrap-order-detail">
        <div class="detail-name">
            {{orderInfo.status}}
        </div>
        <div class="detail-product">
            <div class="product-header">
                <div class="header-t">{{orderInfo.restaurant_name}}</div>
            </div>
            <div class="product-content">
                <div class="content-t">
                    <div class="t-recomm" v-for="item in orderInfo.foods">
                        <div class="top">{{item.name}}</div>
                        <div class="center">×{{item.quanty}}</div>
                        <div class="bottom">&yen; {{item.price}}</div>
                    </div>
                </div>
            </div>
            <div class="product-dis"  v-if="orderInfo.coupon">
                <div class="dis-coupon">
                    <div class="left">优惠券</div>
                    <div class="right">
                        <div style="color: #D0021B">-&yen;{{orderInfo.coupon}}</div>
                        <div><wk-icon type="youjiantou" size="40" color="#CBCBCB"></wk-icon></div>
                    </div>
                </div>
            </div>
            <div class="product-sub">
                <div class="sub">
                    <span class="sub-text">小计:</span>
                    <span class="sub-num">{{orderInfo.amount}}</span>
                </div>
            </div>
        </div>
        <div class="detail-message">
            <div class="message" v-if="orderInfo.no">
                <div>取餐码</div>
                <div class="r">{{orderInfo.no}}</div>
            </div>
            <div class="message">
                <div>订单号</div>
                <div class="r">{{orderInfo.id}}</div>
            </div>
            <div class="message">
                <div>支付方式</div>
                <div class="r">{{orderInfo.pay_type}}支付</div>
            </div>
            <div class="message">
                <div>下单时间</div>
                <div class="r">{{orderInfo.created_at}}</div>
            </div>
        </div>
        <div class="detail-remark">
            <div class="remark-header">订单备注</div>
            <div class="remark-content">{{orderInfo.explain}}</div>
        </div>
        <wk-loading ref="loading"></wk-loading>
    </div>
</template>

<script>
import { getOrderInfo } from '@/api'
import wkLoading from '@c/loading'
// import wkPrice from '@c/price'
export default {
    name: 'order-detail',
    data() {
        return {
            orderId: '',
            orderInfo: ''
        }
    },
    components: {
        wkLoading
    },
    mounted() {
        this.orderId = this.$root.$mp.query.id
        getOrderInfo(this.orderId)
            .then(result => {
                this.orderInfo = result.data
                this.$refs.loading.hide()
            })
            .catch(err => {
                console.log(err)
            })
    }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
.wrap-order-detail {
    width: 100%;
    padding: 40rpx 40rpx 100rpx 40rpx;
    box-sizing: border-box;

    .detail-name {
        font-size: 52rpx;
        padding: 0 0 40rpx 0;
        box-sizing: border-box;
    }

    .detail-product {
        width: 100%;
        background-color: white;
        border-radius: 8rpx;

        .product-header {
            width: 100%;
            padding: 0 20rpx;
            box-sizing: border-box;

            .header-t {
                font-size: 32rpx;
                color: #666666;
                padding: 40rpx 0 60rpx 0;
                box-sizing: border-box;
                border-bottom: 1rpx solid #F5F5F5;
            }
        }

        .product-content {
            width: 100%;
            padding: 0 20rpx;
            box-sizing: border-box;
            font-size: 28rpx;

            .content-t {
                border-bottom: 1rpx solid #F5F5F5;

                .t-recomm {
                    padding: 30rpx 0;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;

                    .top {
                        flex: 3;
                    }

                    .center {
                        flex: 1;
                    }

                    .bottom {
                        flex: 1;
                        text-align: right;
                    }
                }
            }
        }

        .product-dis {
            width: 100%;
            height: 100rpx;
            padding: 0 20rpx;
            box-sizing: border-box;

            .dis-coupon {
                width: 100%;
                height: 100rpx;
                border-bottom: 1rpx solid #F5F5F5;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .left {
                    font-size: 28rpx;
                    font-weight: bold;
                }

                .right {
                    display: flex;
                    align-items: center;
                }
            }
        }

        .product-sub {
            width: 100%;
            height: 100rpx;
            padding: 0 20rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-weight: bolder;

            .sub {
                height: 32rpx;
                display: flex;
                align-items: center;

                .sub-num {
                    font-size: 32rpx;
                }
            }
        }
    }

    .detail-message {
        margin-top: 20rpx;
        width: 100%;
        background-color: white;
        border-radius: 8rpx;

        .message {
            padding: 30rpx 20rpx;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            font-size: 28rpx;

            .r {
                color: #666666;
            }
        }
    }

    .detail-remark {
        margin-top: 20rpx;
        width: 100%;
        background-color: white;
        border-radius: 8rpx;
        font-size: 28rpx;

        .remark-header {
            padding: 30rpx 20rpx;
            box-sizing: border-box;
            font-weight: bolder;
        }

        .remark-content {
            padding: 0 20rpx 30rpx 20rpx;
            box-sizing: border-box;
            color: #666666;
            line-height: 36rpx;
        }
    }
}
</style>
