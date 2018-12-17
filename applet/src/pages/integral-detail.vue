<template>
    <div class="wrap-integral-detail">
        <div class="detail-show">
            <div>
                <wk-viewpager :movies="movies"></wk-viewpager>
            </div>
            <!--<div v-else class="show-img">-->
                <!--<img :src="movies" alt="">-->
            <!--</div>-->
            <div class="show-text">
                {{ integralMovies.name }}
            </div>
            <div class="show-spec">
                <div class="spec-l">
                    <span>{{ integralMovies.integral }}积分</span>
                </div>
            </div>
        </div>
        <div class="detail-recomm">
            <div class="show-header">详情</div>
            <div class="recomm-content">
                <!--<div v-text="integralMovies.describe"></div>-->
                <!--{{ integralMovies.describe }}-->
                <wxParse :content="integralMovies.describe" @preview="preview" @navigate="navigate" />
            </div>
        </div>
        <!--弹出立即兑换窗口组件-->
        <div class="detail-btn">
            <!--这里做三次判断分别是：兑换 未登录 积分不足-->
            <div v-if="integralMovies.credit>=integralMovies.integral" class="exchange" @click="showAff">立即兑换</div>
            <div v-else-if="integralMovies.credit == null" class="exchange" style="background-color: #CBCBCB" @click="goRegister">请先登录</div>
            <div v-else class="exchange" style="background-color: #CBCBCB">积分不足</div>
        </div>
        <!--兑换窗口-->
        <affirm-exchange
            :affExchange="affExchange"
            @go-conceal="concealAff"
            @go-convert="convertAff"></affirm-exchange>
        <exchange-success
            :exchangeSucc="exchangeSucc"
            @go-conceal="concealSucc"
            @go-detail="integralDetail"></exchange-success>
    </div>
</template>

<script>
    import wkIcon from '../components/icon/icon'
    import wkViewpager from '../components/viewpager/viewpager'
    import dialogModal from '../components/dialog-modal/dialog-modal'
    import affirmExchange from '../components/affirm-exchange/affirm-exchange'
    import exchangeSuccess from '../components/exchang-success/exchange-success'
    import { getIntegralDetail, exChange } from '../api/api'
    //这个是解析富文本
    import wxParse from 'mpvue-wxparse'
    import Ext from '../api/ext'
    const getExtJson = () => new Ext()
    export default {
        name: "integral-detail",
        components: {
            wkIcon,
            wkViewpager,
            dialogModal,
            affirmExchange,
            exchangeSuccess,
            wxParse
        },
        data() {
            return {
                integralMovies: {},
                //定义 拼接 轮播图的网址
                movies: [],
                typeFrame: false,
                affExchange: false,
                exchangeSucc: false,
                avatarUrl: ''
            }
        },
        methods: {
            goRegister() {
                this.$router.push({path: '/pages/register'})
            },
            showType() {
                this.typeFrame = true
            },
            typeConceal() {
                this.typeFrame = false
            },
            showAff() {
                this.affExchange = true
            },
            //点击取消兑换框
            concealAff() {
                this.affExchange = false
            },
            //获取用户名字
            getUserName() {
                wx.showLoading({
                    title:'加载中...'
                })
                wx.getUserInfo({
                    withCredentials: true,
                    success:(res) => {
                        //此处为获取微信信息后的业务方法
                        this.avatarUrl = res.userInfo.nickName;
                        console.log('获取用户的名字',this.avatarUrl)
                    },
                    fail: function() {

                    }
                });
                wx.hideLoading()
            },
            //点击立即兑换的方法
            convertAff() {
                //积分兑换商品接口
                let data = {
                    real_name: this.avatarUrl,
                    mobile: this.$route.query.mobile,
                    change_integral: this.integralMovies.integral,
                    items:[
                        {
                            industry:1,
                            skucode:this.integralMovies.sku,
                            props:this.integralMovies.props,
                            goods_id:this.integralMovies.id,
                            change_id:this.integralMovies.change_id,
                            goods_name: this.integralMovies.name,
                            quantity: 1,
                            thumb: this.integralMovies.thumb,
                            type: this.integralMovies.type
                        }
                    ]

                }
                console.log(data)
                exChange(data).then(res =>{
                    console.log('积分兑换操作请求',res)
                    // if(res.success){
                    //     //请求成功
                    //     wx.hideLoading()
                    //     wx.showToast({
                    //         title:res.data.msg,
                    //         icon:'none',
                    //         duration: 1500,
                    //         mask:true
                    //     })
                    //     let time2 = setTimeout(() => {
                    //         this.$router.back()
                    //         clearTimeout(time2)
                    //     }, 1700);
                    // }else{
                    //     wx.hideLoading()
                    //     wx.showToast({
                    //         title:res.data.message,
                    //         icon:'none',
                    //         duration: 1000,
                    //         mask:true
                    //     })
                    // }
                    if(res.success == true) {
                        //点击隐藏兑换框  显示查看订单框
                        this.affExchange = false
                        this.exchangeSucc = true
                    }
                    // if(res.success == false) {
                    //     //点击隐藏兑换框  显示查看订单框
                    //     this.affExchange = false
                    //     wx.showToast({
                    //         title: '积分余额不足',
                    //         icon: 'none',
                    //         duration: 2000
                    //     })
                    // }
                }).catch(err =>{
                    wx.hideLoading()
                    wx.showToast({
                        title: '未知错误',
                        icon:'none',
                        duration: 1000,
                        mask:true
                    })
                })
            },
            concealSucc() {
                this.exchangeSucc = false
            },
            integralDetail() {
                this.$router.replace({path: '/pages/integral-order'})
            },
            //获取积分商品详情
            getIntegralDetail() {
                wx.showLoading({
                    title:'加载中...'
                })
                let data = {
                    type: this.$route.query.type,
                    goods_id: this.$route.query.goods_id,
                    id: this.$route.query.id
                }
                console.log('获取积分详情需要传的参数',data)
                getIntegralDetail(data).then((res) => {
                    console.log('getIntegralDetail',res.data)
                    if(res.success == true) {
                        let data = res.data
                        this.integralMovies = {
                            sku: data.view.sku,
                            props: data.view.props,
                            id: data.view.id,
                            change_id: data.view.change_id,
                            name: data.view.name,
                            thumb: getExtJson().api_host + data.view.thumb,
                            type: data.view.type,
                            integral: data.shop.integral,
                            industry: data.shop.industry,
                            describe: data.view.detail,
                            credit: data.view.credit,
                            imgs: data.view.imgs,
                            image: data.view.image
                        }
                        if(data.view.type == 0) {
                            this.movies.push({img: getExtJson().api_host + this.integralMovies.image})
                            console.log('111111', this.movies)
                        }else if(data.view.type == 1) {
                            this.movies = this.integralMovies.imgs.map((res) => {
                                return {
                                    img: getExtJson().api_host + res
                                }
                            })
                        }

                        console.log(this.integralMovies)
                       // if(res.data.view.type == 0) {
                       //      this.integralMovies = {
                       //          sku: data.sku,
                       //          props: data.props,
                       //          id: data.id,
                       //          change_id: data.change_id,
                       //          name: data.name,
                       //          thumb: getExtJson().api_host + data.thumb,
                       //          type: data.type,
                       //          integral: data.integral,
                       //          describe: data.describe,
                       //          name: data.name,
                       //          credit: data.credit,
                       //      }
                       //      this.movies = {
                       //          img: getExtJson().api_host + data.image,
                       //      }
                       // }
                       // if(res.data.view.type == 1){
                       //     this.integralMovies = {
                       //         sku: data.sku,
                       //         props: data.props,
                       //         id: data.id,
                       //         change_id: data.change_id,
                       //         name: data.name,
                       //         thumb: getExtJson().api_host + data.thumb,
                       //         type: data.type,
                       //         integral: data.integral,
                       //         describe: data.detail,
                       //         name: data.name,
                       //         credit: data.credit,
                       //         image: data.imgs
                       //     }
                       //     this.movies = this.integralMovies.image.map((res) => {
                       //         return {
                       //             img: getExtJson().api_host + res
                       //         }
                       //     })
                       //     console.log('type为1的状态的轮播图',this.integralMovies)
                       //     console.log('type为1的状态的轮播图定义新的数据',this.movies)
                       // }
                    }
                })
                wx.hideLoading()
            }
        },
        mounted() {
            Object.assign(this, this.$options.data()) // 清空当前页面数据
            this.getUserName()
            this.getIntegralDetail()
            //下面是为了从订单返回积分商品列表隐藏弹窗
            this.exchangeSucc = false
        },
        onShareAppMessage: function(ops) {
            let that = this
            let openid = that.ext.openid
            return {
                title: '快来看看朋友分享的小程序吧',
                path: '/pages/index?openid_one=' + openid,
                success: function(res) {
                    ;+// 转发成功
                        console.log('转发成功:' + JSON.stringify(res))
                },
                fail: function(res) {
                    // 转发失败
                    console.log('转发失败:' + JSON.stringify(res))
                }
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    .wrap-integral-detail{
        width: 100%
        color #666666
        padding-bottom 120rpx
        box-sizing border-box
        .detail-show{
            width: 100%
            background-color white
            .show{
                img{
                    width: 100%
                    height: 750rpx
                }
            }
            .show-text{
                width: 100%
                padding 10rpx 30rpx
                box-sizing border-box
                font-size 32rpx
            }
            .show-spec{
                width: 100%
                padding 20rpx 30rpx
                box-sizing border-box
                display flex
                align-items center
                justify-content space-between
                .spec-l{
                    font-size 40rpx
                    color #FF0B29
                    .l-p{
                        font-size 20rpx
                    }
                }
                .spec-r{
                    line-height 40rpx
                }
            }
        }
        .detail-type{
            width: 100%
            height: 80rpx
            background-color white
            margin-top 20rpx
            padding 0 30rpx
            box-sizing border-box
            display flex
            align-items center
            justify-content space-between
            .type-left{
                display flex
                .left-one{
                    color: #A0A0A0;
                    margin-right 20rpx
                }
            }
            .type-right{
                img{
                    width: 40rpx
                    height: 8rpx
                }
            }
        }
        .detail-recomm{
            .show-header{
                width: 100%
                height: 62rpx
                font-size 28rpx
                color #666666
                text-align center
                line-height 62rpx
                background url("../../static/icon/header-lr.png")no-repeat 50% 50%
                background-size 270rpx 4rpx
            }
            .recomm-content{
                width: 100%
                background-color white
                padding 0 30rpx
                box-sizing border-box
            }
        }
        .detail-btn{
            width: 100%
            height: 100rpx
            position fixed
            left: 0
            bottom: 0
            z-index 1
            display flex
            .exchange{
                width: 100%
                height: 100%
                background-color #F5A623
                font-size 32rpx
                line-height 100rpx
                color white
                text-align center
            }
        }


    }
</style>
