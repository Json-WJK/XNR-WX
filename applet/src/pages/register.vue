<template>
    <div class="wrap-register">
        <div class="title">
            绑定手机号
        </div>
        <div class="verify">
            <input type="number"
                   v-model="phone"
                   placeholder="请输入手机号"
                   placeholder-class="mNumber">
        </div>
        <div class="verify">
            <input type="number" placeholder="请输入验证码"
                placeholder-class="mNumber"
                v-model="verifyCode"
            >
            <!-- <div class="gain" @click="getVerifyCode">获取验证码</div> -->
            <div>
                <button class="gain"
                        @click="sendCode"
                        :plain="true"
                        :disabled="!showCode"
                        :class="{ disabled : !showCode}">
                    <span v-if="showCode">获取验证码</span>
                    <span v-if="!showCode">{{timeCont}}秒后请重试</span>
                </button>
            </div>
        </div>
        <div class="binding">
            <button class="btn" :disabled="depart" @click="signUp">立即绑定</button>
        </div>
        <!--<div class="skip">-->
            <!--绑定手机号消费可以获得商城积分，<span>跳过绑定</span>-->
        <!--</div>-->
        <!-- 提示 -->
        <wk-toptips ref="toptips"></wk-toptips>
    </div>
</template>

<script>
import { getSmsCode, register } from '@/api'
import wkToptips from '@c/toptips'
import encryption from '../assets/encryption'
export default {
    name: 'register',
    data() {
        return {
            phone: '',
            ext: '',
            showCode: true,
            timeCont: '',
            verifyCode: '',
            depart: false, //按钮点击事件
            timer: null
        }
    },
    components: {
        wkToptips
    },
    methods: {
        signUp() {
            this.depart = true
            register(this.phone, this.verifyCode).then(res => {
                // res.data ? this.$router.go(-1) : ''
                console.log('是否成功注册',res)
                if (res.success == true) {
                    if (res.data == true) {
                        this.$router.go(-1)
                    } else {
                        console.log(res.data);
                        this.$refs.toptips.showToptips({
                            content: res.data,
                            timer: 1500
                        })
                    }
                } else {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
            this.depart = false
        },
        sendCode() {
            let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|19[0-9])[0-9]{8}$/
            if (!reg.test(this.phone)) {
                wx.showToast({
                    title: '手机号有误，请重新输入',
                    icon: 'none',
                    duration: 2000
                })
            } else {
                this.timeCont = 120
                this.showCode = false
                getSmsCode(this.ext.config_id, encryption(this.phone, this.ext.openid))
                this.timer = setInterval(() => {
                    this.timeCont--
                    if (this.timeCont <= 0) {
                        this.showCode = true
                        clearInterval(this.timer)
                        //timer = null
                    }
                }, 1000)
                //console.log(timer)
            }
        }
    },
    mounted() {
        this.ext = wx.getStorageSync('ext')
        this.phone = ''
        this.verifyCode = ''
        this.showCode = true
        clearInterval(this.timer)

    },
    onShow() {

        //Object.assign(this, this.$options.data());
    }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
.wrap-register {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: white;

    .title {
        width: 100%;
        height: 250rpx;
        padding: 92rpx 40rpx 0 40rpx;
        box-sizing: border-box;
        color: #333333;
        font-size: 40rpx;
        font-weight: 500;
    }

    .verify {
        width: 670rpx;
        height: 80rpx;
        margin: 20rpx 0 0 40rpx;
        font-size: 28rpx;
        border-bottom: 1rpx solid #f2f2f2;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .gain {
            border 0 solid white
            font-size: 28rpx;
            color: #F5A623;
            text-align: right;
            background-color white
        }

        .mNumber {
            font-size: 28rpx;
            color: black;
        }
    }

    .binding {
        width: 100%;
        height: 300rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        .btn {
            width: 400rpx;
            height: 80rpx;
            background: #F5A623;
            border-radius: 8rpx;
            font-size: 32rpx;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .skip {
        width: 100%;
        color: #A0A0A0;
        text-align: center;

        span {
            color: #D0021B;
        }
    }
}
</style>
