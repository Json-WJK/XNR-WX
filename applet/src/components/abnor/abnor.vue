<style lang="scss">
    .abnor {
        position: relative;
        display: block;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        overflow: hidden
    }
    .abnor_box {
        position: absolute;
        display: flex;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        flex-direction: column;
        justify-content: center;
        align-items: center
    }
    .abnor_btn {
        min-width: 228rpx;
        height: 66rpx;
        margin-top: 30rpx;
        padding: 0 30rpx;
        background-color: #ff5777;
        border: 0 none;
        border-radius: 2rpx;
        color: #fff;
        font-size: 28rpx;
        text-align: center;
        overflow: hidden;
        line-height: 66rpx
    }
    .abnor_btn:active {
        background-color: #f5456e
    }
    .abnor_image {
        width: 514rpx;
        background: transparent no-repeat;
        background-size: cover
    }
    .abnor_text {
        margin-top: 30rpx;
        color: #333;
        font-size: 28rpx
    }
    .abnor_tip {
        margin-top: 20rpx;
        color: #666;
        font-size: 24rpx
    }
</style>

<template>
    
    <view class="abnor">
        <view class="abnor_box">
            <image class="abnor_image" v-if="abnor_image" :src="abnor_image" mode="widthFix"></image>
            <view class="abnor_text" v-if="abnor_title">{{abnor_title}}</view>
            <view class="abnor_tip" v-if="abnor_tip">{{abnor_tip}}</view>
            <view class="abnor_btn" v-if="abnor_button" @tap="emitAbnorTap">{{abnor_button}}</view>
        </view>
    </view>

</template>

<script>

    import config from './config'

    export default {
        data() {
            return {
                abnor_image: '',
                abnor_title: '',
                abnor_button: '',
                abnor_tip: ''
            }
        },
        props: {
            type: {
                type: String,
                default: ''
            },
            image: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            tip: {
                type: String,
                default: ''
            },
            button: {
                type: String,
                default: ''
            }
        },
        methods: {
            emitAbnorTap(e){
                this.$emit('abnortap', e)
            },
            setAbnorData(){
                if(this.type && config[this.type]){
                    this.abnor_image = this.image || config[this.type].image
                    this.abnor_title = this.title || config[this.type].title
                    this.abnor_button = this.button || config[this.type].button
                    this.abnor_tip = this.tip || config[this.type].tip
                }
            }
        },
        watch: {
            type(){
                this.setAbnorData()
            }
        },
        mounted(){
            this.setAbnorData()
        }
    }

</script>
