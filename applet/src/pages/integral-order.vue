<template>
    <div class="wrap-integral-order">
        <section v-if="integralOrder.length != 0">
            <div class="order-content" v-for="item in integralOrder" :key="index">
                <div class="content-top">
                    <div>订单号：{{ item.id }}</div>
                    <div class="success">交易成功</div>
                </div>
                <div class="content-center">
                    <div class="center-c">
                        <div class="c-left"><img :src="item.thumb" alt=""></div>
                        <div class="c-right">
                            <div class="right-t">
                                {{ item.goods_name }}
                            </div>
                            <div class="right-b">
                                <div class="b-integral">
                                    <!--<div class="small">{{  }}</div>-->
                                    <div>{{ item.change_integral }}积分</div>
                                </div>
                                <div class="b-num">×1</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-bottom">
                    <div class="b-ard">
                        兑换码:<span>{{ item.code }}</span>
                    </div>
                    <div class="b-time">
                        {{ item.endtime }} 过期
                    </div>
                </div>
            </div>
        </section>
        <section  v-else>
            <div class="no-integral-order">
                <div><wk-icon type="dingdan" size="120" color="#D8D8D8"></wk-icon></div>
                <div>暂无积分订单</div>
            </div>
        </section>
    </div>
</template>

<script>
    import wkIcon from '../components/icon'
    import { getIntegralOrder } from '../api/api'
    export default {
        name: "order-detail",
        components: {
            wkIcon
        },
        data() {
            return {
                integralOrder: [],
                page: 1,
                maxPage: 1
            }
        },
        methods: {
            goInOrDetail() {
                this.$router.push({path: '/pages/integral-order-detail'})
            },
            getIntegralOrder() {
                wx.showLoading({
                    title:'加载中...'
                })
                getIntegralOrder(this.page).then((res) => {
                    console.log('获取积分订单后台的数据',res)
                    if(res.success == true) {
                        let data = res.data
                        this.integralOrder.push(...data.items.map((item) => {
                            return {
                                id: item.id,
                                thumb: item.thumb,
                                goods_name: item.goods_name,
                                change_integral: item.change_integral,
                                code: item.code,
                                endtime: item.endtime
                            }
                        }))
                        //获取分页的最大页数
                        this.maxPage = data._meta.pageCount
                        console.log('积分订单列表',this.integralOrder)
                    }
                })
                wx.hideLoading()

            }
        },
        onReachBottom: function() {
            this.page++
            if(this.page <= this.maxPage){
                this.getIntegralOrder()
            }else{
                this.page = this.maxPage
            }
        },
        mounted() {

        },
        onShow() {
            Object.assign(this, this.$options.data()) // 清空当前页面数据
            this.getIntegralOrder()
        }
    }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    .wrap-integral-order{
        width: 100%
        color #666666
        .order-content{
            width: 100%
            background-color white
            border-bottom 8rpx solid #f2f2f2
            .content-top{
                width: 100%
                height: 60rpx
                padding 0 20rpx
                box-sizing border-box
                display flex
                justify-content space-between
                align-items center
                color #444546
                .success{
                    color #F5A623
                }
            }
            .content-center{
                width: 100%
                height: 200rpx
                background-color #f9f9f9
                padding 0 20rpx
                box-sizing border-box
                display flex
                align-items center
               .center-c{
                   width: 100%
                   display flex
                   .c-left{
                       width: 220rpx
                       img{
                           width: 200rpx
                           height: 160rpx

                       }
                   }
                   .c-right{
                       flex 1
                       height 160rpx
                       display flex
                       flex-direction column
                       justify-content space-between
                       .right-t{
                           font-size 28rpx
                           color: #444546;
                           line-height 36rpx
                           display: -webkit-box;
                           -webkit-box-orient: vertical;
                           -webkit-line-clamp: 2;
                           overflow: hidden;
                       }
                       .right-b{
                           width: 100%
                           line-height 28rpx
                           display flex
                           justify-content space-between
                           align-items center
                           .b-integral{
                               font-size 28rpx
                               color #FF0B29
                               display flex
                               align-items flex-end
                               .small{
                                   font-size 16rpx
                               }
                           }
                           .b-num{
                               color: #828282;
                           }
                       }

                   }
               }
            }
            .content-bottom{
                width: 100%
                display flex
                justify-content space-between
                padding 50rpx 20rpx 30rpx 20rpx
                box-sizing border-box
                span{
                    color: #F5A623
                }
            }
        }
        .no-integral-order{
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
