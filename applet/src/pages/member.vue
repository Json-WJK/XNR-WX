<template>
    <div class="wrap-member">
        <div class="member-header">

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
        <div class="member-content">
            <div class="content-bar" @click="toMyOrder">
                <div class="bar-left">
                    <div><wk-icon type="dingdan" size="40" color="#F5A623"></wk-icon></div>
                    <div class="text">我的订单</div>
                </div>
                <div>
                    <wk-icon type="youjiantou" size="40" color="#A0A0A0"></wk-icon>
                </div>
            </div>
            <div class="content-bar" @click="toCoupon">
                <div class="bar-left">
                    <div><wk-icon type="youhuiquan" size="40" color="#F5A623"></wk-icon></div>
                    <div class="text">我的优惠券</div>
                </div>
                <div>
                    <wk-icon type="youjiantou" size="40" color="#A0A0A0"></wk-icon>
                </div>
            </div>
            <div class="content-bar" @click="toVIP">
                <div class="bar-left">
                    <div><wk-icon type="huiyuan" size="40" color="#F5A623"></wk-icon></div>
                    <div class="text">我的会员</div>
                </div>
                <div>
                    <wk-icon type="youjiantou" size="40" color="#A0A0A0"></wk-icon>
                </div>
            </div>
            <div class="content-bar" @click="goPhone">
                <div class="bar-left">
                    <div><wk-icon type="htmal5icon31" size="40" color="#F5A623"></wk-icon></div>
                    <div class="text">我的客服</div>
                </div>
                <div class="bar-right">
                    <div>031-3802-2777</div>
                    <div><wk-icon type="youjiantou" size="40" color="#A0A0A0"></wk-icon></div>
                </div>
            </div>
        </div>
        <wk-toptips ref="toptips"></wk-toptips>
        <tab-ber name="tab1"></tab-ber>
    </div>
</template>

<script>
import tabBer from '../components/tabBer/tabBer.vue'
import wkIcon from '../components/icon/icon'
import wkToptips from '@c/toptips'
import { getVipCard, isLogin } from '@/api'

export default {
    name: 'member',
    data() {
        return {
            ext: {},
            login: false
        }
    },
    components: {
        wkIcon,
        wkToptips,
        tabBer
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
        toCoupon() {
            this.$router.push({ path: '/pages/coupon' })
        },
        toVIP() {
            if (!this.vipIsOpen) {
                this.$refs.toptips.showToptips({
                    content: '商家未开通此服务,敬请期待',
                    timer: 1500
                })
                return
            } else if (!this.login) {
                this.$router.push({
                    path: `/pages/register`
                })
                return
            }

            let url = encodeURIComponent(
                `${this.ext.api_host}/mp/member-card.html?openid=${this.ext.openid}&config_id=${
                    this.ext.config_id
                }&from=1&islogin=1`
            )
            console.log(url)
            this.$router.push({
                path: `/pages/vip-card-web-view?url=${url}`
            })
        },
        goPhone() {
            wx.makePhoneCall({
                phoneNumber: '03138022777',
                success: function() {
                    console.log('拨打电话成功！')
                },
                fail: function() {
                    console.log('拨打电话失败！')
                }
            })
        },
        toMyOrder() {
            this.$router.push({
                path: '/pages/order',
                isTab: true
            })
        }
    },
    mounted() {
        this.vipIsOpen = wx.getStorageSync('vipIsOpen')
        this.ext = wx.getStorageSync('ext')
    },
    onShow() {
        isLogin().then(res => {
            console.log('获取登录状态', res)
            this.login = res.data
            if (res.data) {
                wx.setStorageSync('login', res.data)
            }
            console.log('登陆之后给login从新赋值', this.login)
        })
    }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
.wrap-member {
    width: 100%;

    .member-header {
        height: 140rpx;
        background-color: white;

        .header-top {
            height: 140rpx;
            padding: 0 30rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;

            .header-avatar {
                width: 100rpx;
                height: 100rpx;
                border-radius: 50%;
                margin-right: 20rpx;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
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
    }

    .member-content {
        width: 100%;
        margin-top: 20rpx;
        background-color: white;

        .content-bar {
            width: 100%;
            height: 80rpx;
            border-bottom: 1rpx solid #f2f2f2;
            font-size: 28rpx;
            padding: 0 30rpx;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .bar-left {
                display: flex;

                .text {
                    margin-left: 20rpx;
                }
            }

            .bar-right {
                display: flex;
                align-items: center;
                color: #A0A0A0;
            }
        }
    }
}
</style>
