
<style lang="scss">
.dialogpay {
    &__wrap {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: none;
        z-index: 9999;
    }
    &__mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.6);
        transition: 0.3s;
        display: none;
    }
    &__container {
        position: fixed;
        left: 50%;
        bottom: -165rpx;
        width: 100%;
        height: 0;
        font-size: 32rpx;
        overflow: hidden;
        transition: all 0.2s linear;
        border-radius: 4px;
        background-color: #fff;
        transform: translate3d(-50%, -50%, 0);
        color: #333;
        opacity: 0;
    }
    &__header {
        line-height: 100rpx;
        text-align: center;
        height: 100rpx;
    }
    &__content {
        position: relative;
        padding: 0 40rpx 20rpx;
        line-height: 1.5;
        min-height: 80rpx;
        &__icon__type {
            padding: 20rpx 40rpx;
        }
        .text {
            text-align: center;
            line-height: 60rpx;
            padding-top: 20rpx;
        }
    }
    &__icon {
        text-align: center;
        line-height: 1;
    }
    &__content__title {
        color: #999;
        font-size: 28rpx;
    }
    &__footer {
        overflow: hidden;
    }
    &__footer__row {
        display: flex;
        .dialogpay__button {
            flex: 1;
            &:after {
                border-right-width: 1px;
                border-top-width: 1px;
            }
            &:last-child:after {
                border-right-width: 0;
            }
        }
    }
    &__footer__col {
        position: relative;
        .dialogpay__button {
            height: 120rpx;
            line-height: 120rpx;
            &:after {
                border-top-width: 1px;
            }
        }
        .top-up {
            position: absolute;
            top: 5rpx;
            right: 20rpx;
            width: 170rpx;
            height: 120rpx;
            line-height: 120rpx;
            font-size: 28rpx;
            color: #34a5ff;
            text-align: center;
        }
    }
    &__button {
        position: relative;
        line-height: 100rpx;
        height: 100rpx;
        padding: 0 10rpx;
        border-radius: 0;
        margin-bottom: 0;
        background: #fff;
        img {
            position: absolute;
            left: 50rpx;
            top: 40rpx;
            height: 40rpx;
            width: 160rpx;
        }
        &:after {
            border-width: 0;
            border-radius: 0;
        }
        .balance {
            position: absolute;
            font-size: 24rpx;
            left: 230rpx;
            top: 5rpx;
        }
    }

    &__button:nth-child(2) {
        img {
            position: absolute;
            left: 50rpx;
            top: 35rpx;
            width: 190rpx;
        }
    }
    &__show {
        display: block;
        .dialogpay__container {
            opacity: 1;
            height: auto;
        }
        .dialogpay__mask {
            display: block;
        }
    }
}
</style>

<template>

    <view class="dialogpay__wrap" :class="{ 'dialogpay__show': show }">
        <!-- 遮罩层 -->
        <view 
            class="dialogpay__mask" 
            @tap="dialogpayClick($event, {guid: 'cancel', type: 500})"
        ></view>

        <!-- 内容区 -->
        <view class="dialogpay__container">
            <!-- 标题 -->
            <view
                v-if="title"
                class="dialogpay__header"
                :style="{ color: titleColor }"
            >{{ title }}</view>

            <view
                v-if="content || iconType || src"
                class="dialogpay__content" 
                :class="{ 'dialogpay__content__title' : title, 'dialogpay__content__icon__type': iconType}"
                :style="{ color: contentColor }"
            >
                <!-- 图标 -->
                <view class="dialogpay__icon">
                    <wk-icon :type="iconType" :size="iconSize" :color="iconColor" v-if="iconType && !src"></wk-icon>
                    <img :src="src" v-if="!iconType && src" mode="widthFix" :style=" { width: iconSize + 'rpx' } "/>
                </view>
                <view class="text">{{ content }}</view>
            </view>

            <!-- 父组件传children -->
            <slot v-if="!content"></slot>

            <view
                class="dialogpay__footer" 
                :class="[ 'dialogpay__footer__' + buttonMode ]"
                v-if="buttons"
            >
                <block v-for="(item, index) in buttons" :key="index">
                    <button
                        :class=" [ item.class ? item.class : 'dialogpay__button', item.class ] "
                        @tap="dialogpayClick($event, {guid: item.guid, type: index})"
                        :style="{ color: item.color }"
                    >
                    <img :src="item.src" v-if="item.src" mode="widthFix"/>
                    <span class="balance" v-if="balance">(剩余&yen;{{balance}})<span v-if="balanceNo">余额不足</span></span>
                    </button>
                   
                </block>
                    <span class="top-up" v-if="balanceNo" @tap="topUp($event)">去充值</span>
            </view>
        </view>

    </view>

</template>

<script>
import wkIcon from '@c/icon'

export default {
    data() {   
        any: ''   
    },
    components: {
        wkIcon
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        titleColor: {
            type: String,
            default: '#333'
        },
        content: {
            type: String,
            default: ''
        },
        contentColor: {
            type: String,
            default: '#999'
        },
        iconType: {
            type: String,
            default: ''
        },
        iconSize: {
            type: [String, Number],
            default: 130
        },
        iconColor: {
            type: String,
            default: '#10d038'
        },
        src: {
            type: String,
            default: ''
        },
        balance: {
            type: [String, Number],
            default: ''
        },
        balanceNo: {
            type: Boolean,
            default: false
        },
        buttons: {
            type: Array,
            default: [
                {
                    guid: 'huiyuanka',
                    text: '',
                    color: '#f00',
                    src: '../static/img/member-payment.png'
                },
                {
                    guid: 'wechat',
                    text: '',
                    color: '#fff',
                    src: '../static/img/wx-payment.png'
                }
            ]
        },
        buttonMode: {
            type: String,
            default: 'row' // row行显示 col 列显示
        }
    },
    methods: {
        dialogpayClick(e, option) {
            if (option.guid == 'huiyuanka') {
                this.$emit('dialogpayHuiyuanka', e, option)
            } else if (option.guid == 'wechat') {
                this.$emit('dialogpayWechat', e, option)
            }
            this.$emit('dialogpayClick', e, option)
            this.dialogpayHide()
        },
        topUp(e) {
            this.$emit('topUp', e)
        },
        dialogpayShow(options = {}) {
            for (let i in options) {
                console.log(options)
                this[i] = options[i]
            }
            console.log(this)
            if (JSON.stringify(options) == '{}') {
                this.show = true
            }
        },
        dialogpayHide() {
            this.show = false
        }
    }
}
</script>

