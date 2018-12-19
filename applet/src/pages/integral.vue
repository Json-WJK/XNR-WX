<template>
    <div class="wrap-integral">
        <div class="integral-header">
            <div class="header-left">
                <section class="header-top" @click="toLogin" v-if="!login">
                    <div class="header-avatar">
                        <wk-icon type="touxiang-shi" size="120" color="#A0A0A0"></wk-icon>
                    </div>
                    <div class="header-user" >
                        <div class="login">登录</div>
                        <div class="phone">{{transformPhone}}</div>
                    </div>
                </section >
                <section class="header-top" v-else>
                    <div class="member-header-avatar" >
                        <open-data type="userAvatarUrl"></open-data>
                    </div>
                    <div class="header-user">
                        <div class="name">
                            <open-data type="userNickName"></open-data>
                        </div>
                        <div class="phone">{{transformPhone}}</div>
                    </div>
                </section>
            </div>
            <div class="header-right" v-if="integralAll == null">
                <div>暂无积分</div>
                <div><wk-icon type="youjiantou" size="46" color="#A0A0A0"></wk-icon></div>
            </div>
            <div class="header-right" @click="goInList" v-else>
                <div>{{ integralAll }}积分</div>
                <div><wk-icon type="youjiantou" size="46" color="#A0A0A0"></wk-icon></div>
            </div>
        </div>
        <product-show :integralList="integralList" @go-detail="goIntegralDetail"></product-show>
        <!-- <tab-ber name="tab1"></tab-ber> -->
    </div>
</template>

<script>
    import tabBer from '../components/tabBer/tabBer.vue'
    import wkIcon from '../components/icon/icon'
    import productShow from '../components/product-show/product-show'
    import { getIntegralList,getIntegralDetailed } from '../api/api'
    import { getVipCard, isLogin } from '@/api'
    import Ext from '../api/ext'
    const getExtJson = () => new Ext()
    export default {
        name: "integral",
        components: {
            wkIcon,
            productShow,
            tabBer
        },
        data() {
            return {
                integralList: [],
                //积分总数
                integralAll:0,
                page: 1,
                login: false,
            }
        },
        computed: {
            transformPhone() {
                return this.login
                    ? this.login.replace(this.login.substring(3, 7), '****')
                    : '***********'
            }
        },
        methods: {
            toLogin() {
                this.$router.push({
                    path: `/pages/register`
                })
            },
            goInList() {
                this.$router.push({path: '/pages/integral-list'})
            },
            goIntegralDetail(index) {
                this.$router.push({
                    path: '/pages/integral-detail',
                    query: {
                        mobile: this.login,
                        id:this.integralList[index].id,
                        type: this.integralList[index].type,
                        goods_id: this.integralList[index].goods_id,
                    }
                })
            },
            getIntegralGoodsList() {
                wx.showLoading({
                    title:'加载中...'
                })
                getIntegralList(this.page).then((res) => {
                    console.log('这里是获取后台的积分商品列表',res)
                    if(res.success == true) {
                        //获取积分总数
                        this.integralAll = res.data.credit

                        let data = res.data
                        this.integralList.push(...data.items.map((item) => {
                            return {
                                image: getExtJson().api_host + item.image,
                                integral: item.integral,
                                id: item.id,
                                type: item.type,
                                goods_id: item.goods_id,
                                shopname: item.shopname
                            }
                        }))
                        this.maxPage = res.data._meta.pageCount
                        console.log('获取积分明细最大分页',this.maxPage)
                        console.log('积分列表获取的数据',this.integralList)
                    }
                })
                wx.hideLoading()
            }
        },
        onPullDownRefresh:function() {
            wx.showNavigationBarLoading() //在标题栏中显示加载
            this.getIntegralGoodsList()
            Object.assign(this, this.$options.data()) // 清空当前页面数据
            isLogin().then(res => {
                console.log('获取登录状态',res)
                this.login = res.data
                console.log('登陆之后给login从新赋值',this.login)
            })
            setTimeout(function() {
                wx.hideNavigationBarLoading() //完成停止加载

                wx.stopPullDownRefresh() //停止下拉刷新

            },1500);

        },
        onReachBottom() {
            this.page++
            if(this.page <= this.maxPage){
                this.getIntegralGoodsList()
            }else{
                this.page = this.maxPage
            }
        },
        mounted() {
            Object.assign(this, this.$options.data()) // 清空当前页面数据
            this.getIntegralGoodsList()
            isLogin().then(res => {
                console.log('获取登录状态',res)
                this.login = res.data
                console.log('登陆之后给login从新赋值',this.login)
            })
        },
        onShow() {
            //为了解决登陆之后返回的时候显示积分总数
            getIntegralList(this.page).then((res) => {
                if(res.success == true) {
                    //获取积分总数
                    this.integralAll = res.data.credit
                }
            })
            isLogin().then(res => {
                console.log('获取登录状态',res)
                this.login = res.data
                console.log('登陆之后给login从新赋值',this.login)
            })
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
    .wrap-integral{
        width: 100%
        .integral-header{
            width: 100%
            height: 140rpx
            padding 0 30rpx
            box-sizing border-box
            background-color white
            display flex
            justify-content space-between
            .header-top{
                //height: 140rpx;
                padding 20rpx 0
                box-sizing border-box
                display: flex;
                align-items: center;
                .header-avatar{
                    width: 100rpx;
                    height: 100rpx;
                    border-radius: 50%;
                    margin-right: 20rpx;
                    overflow hidden
                    display flex
                    align-items center
                    justify-content center
                }
                .member-header-avatar {
                    width: 100rpx;
                    height: 100rpx;
                    border-radius: 50%;
                    margin-right: 20rpx;
                    overflow: hidden;
                }

                .header-user {
                    height: 100rpx;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;

                    .name {
                        font-size: 32rpx;
                        color: #333333;
                    }

                    .login {
                        font-size: 32rpx;
                        color: #F5A623;
                    }

                    .phone {
                        color: #666666;
                    }
                }
            }

            .header-right{
                height: 140rpx
                line-height 140rpx
                display flex
                align-items center
                font-size: 32rpx;
                color: #333333;
            }
        }
    }
</style>
