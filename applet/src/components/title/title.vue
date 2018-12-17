
<style lang="scss">
    .title{
        &__wrap{
            height: 98rpx;
            padding: 0 20rpx;
            position: relative; 
        }
        &__cont{
            width: calc(100% - 40rpx);
            position: absolute;
            left: 20rpx; top: 50%;
            transform: translateY(-50%);
            line-height: 1;
            &.textCenter{
                text-align: center;
                .title__text{
                    padding: 0 .3em;
                }
                .title__icon{
                    display: none;
                }
            }
        }
        &__text{
            background: #fff;
            color: #606060;
            position: relative;
        }
        &__icon{
            width: 4px;
            height: 100%;
            background: #9388ff;
            position: absolute;
            left: -20rpx;top: 0;
        }
        &__line{
            width: 300rpx;
            height: 2rpx;
            background: #606060;
            position: absolute;
            left: 50%; top: 50%;
            transform: translate(-50%, -50%);
        }
        &__more{
            position: absolute;
            top: 0; right: 0;
        }
    }
</style>

<template>

    <view class="title__wrap">
        <view class="title__cont" :class="{ textCenter: line }" :style="{ 'font-size': fontSize + 'rpx', color: color }">
            <view class="title__icon" :style="iconStyle" v-if="icon"></view>
            <view class="title__line" v-if="line" :style="lineStyle"></view>
            <text class="title__text" :style="{ 'font-size': fontSize + 'rpx', color: color }">{{content}}</text>
            <view class="title__more" :style="{ color: moreColor }" @tap="moreTap" v-if=" more ">
                <text>{{more}}</text>
                <wk-icon :type=" 'next' "></wk-icon>
            </view>
        </view>
    </view>

</template>

<script>

    import wkIcon from '@c/icon'

    export default {
        components: {
            wkIcon
        },
        props: {
            content: {
                type: String,
                default: ''
            },
            fontSize: {
                type: [String, Number],
                default: 32
            },
            color: {
                type: String,
                default: ''
            },
            icon: {
                type: [String, Boolean],
                default: false
            },
            iconStyle: {
                type: String,
                default: ''
            },
            line: {
                type: Boolean,
                default: false
            },
            lineStyle: {
                type: String,
                default: ''
            },
            more: {
                type: String,
                default: ''
            },
            moreColor: {
                type: String,
                default: '#666'
            }
        },
        methods: {
            moreTap(){
                this.$emit('moretap')
            }
        }
    }

</script>

