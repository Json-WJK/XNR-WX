<template>
    <div class="wrap-integral-list">
        <div class="list-top">
            <div class="top-rule" @click="goInRule">积分规则</div>
            <div class="top-circle">
                <div class="name">积分</div>
                <div class="num">{{ integralAll }}</div>
            </div>
            <div class="top-btn">
                <div @click="goInList">积分商城</div>
                <div @click="goInOrder">我的订单</div>
            </div>
        </div>
        <div class="list-bot">
            <div class="bot-header">
                <div class="header"></div>
                <div>积分明细</div>
                <div class="header"></div>
            </div>
            <div class="bot-content">
                <div class="content" v-for="item in integralList" :key="index">
                    <div class="left">
                        <div class="left-t">商城订单：{{ item.order_id }}</div>
                        <div>{{ item.create_time }}</div>
                    </div>
                    <div class="right">{{ item.integral }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getIntegralDetailed } from '../api/api'
    export default {
        name: "integral-list",
        components: {

        },
        data() {
            return {
                page: 1,
                maxPage: 1,
                userInfoId:'',
                integralList: [],
                //积分总数
                integralAll:0
            }
        },
        methods: {
            goInRule() {
                this.$router.push({path: '/pages/integral-rule'})
            },
            goInList() {
                this.$router.push({path: '/pages/integral', isTab: true})
            },
            goInOrder() {
                this.$router.push({path: '/pages/integral-order'})
            },
            getIntegralList() {
                wx.showLoading({
                    title:'加载中...'
                })
                getIntegralDetailed(this.page, this.userInfoId).then((res) => {
                    console.log('获取积分明细后台数据',res)

                    if(res.success == true) {
                        //获取积分总数
                        this.integralAll = res.data.integral_all
                        let data = res.data
                        this.integralList.push(...data.items.map((item) => {
                            return {
                                create_time: item.create_time,
                                integral: item.integral,
                                order_id: item.order_id,
                            }
                        }))
                        this.maxPage = data._meta.pageCount
                        console.log('获取积分明细最大分页',this.maxPage)
                    }
                })
                wx.hideLoading()
            }


        },
        onReachBottom: function() {
            this.page++
            if(this.page <= this.maxPage){
                this.getIntegralList()
            }else{
                this.page = this.maxPage
            }
        },
        mounted() {
            Object.assign(this, this.$options.data()) // 清空当前页面数据
            this.getIntegralList()
        }
    }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    .wrap-integral-list{
        width: 100%
        background-color white
        box-sizing border-box
        .list-top{
            width: 100%
            background-color white
            padding 56rpx  0 48rpx 0
            box-sizing border-box
            display flex
            flex-direction column
            align-items center
            position relative
            .top-rule{
                position absolute
                top: 30rpx
                right: 20rpx
                font-size 28rpx
                color: #666666;
            }
            .top-circle{
                width: 200rpx
                height: 200rpx
                background-color #F5A623
                border-radius 50%
                color white
                font-size 28rpx
                display flex
                flex-direction column
                justify-content center
                align-items center
                .num{
                    font-size 52rpx
                }
            }
            .top-btn{
                width: 360rpx
                padding-top 30rpx
                box-sizing border-box
                display flex
                flex-direction row
                justify-content space-between
                div{
                    width: 170rpx
                    height: 62rpx
                    border: 1rpx solid #F2F2F2;
                    border-radius: 8rpx;
                    display flex
                    align-items center
                    justify-content center
                    font-size 28rpx
                    color: #666666;
                }
            }
        }
        .list-bot{
            width: 100%
            padding 0 30rpx
            box-sizing border-box
            .bot-header{
                width: 100%
                font-size 28rpx
                color: #A0A0A0;
                display flex
                justify-content space-between
                align-items center
                .header{
                    width: 264rpx
                    height: 1rpx
                    background-color #F2F2F2
                }
            }
            .bot-content{
                width: 100%
                .content{
                    width: 100%
                    padding 30rpx 0
                    box-sizing border-box
                    //height: 120rpx
                    border-bottom 1rpx solid #F2F2F2
                    display flex
                    align-items center
                    justify-content space-between
                    .left{
                        color #a0a0a0
                        .left-t{
                            font-size 28rpx
                            color #333333
                        }
                    }
                    .right{
                        font-size 28rpx
                        color #F5A623
                    }

                }
            }
        }
    }
</style>
