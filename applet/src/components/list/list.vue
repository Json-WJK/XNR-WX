
<style lang="scss">
    .list__{
        &body{
            display: flex;
            align-items: center;
            min-height: 90rpx;
            line-height: 1.4;
            // padding: 20rpx 30rpx 20rpx 0;
            // margin-left: 30rpx;
            box-sizing: border-box;
            border-bottom: 1px solid #ececec;
            font-size: 32rpx;
            color: #666;
        }
        &none {
            border: none;
        }
        &image {
            width: 38rpx;
            height: 38rpx;
            margin-right: 30rpx;
        }
        &icon {
            margin-right: 30rpx;
        }
        &title {
            flex: 1;
            &--sub {
                margin-top: 14rpx;
                font-size: 28rpx;
                line-height: 40rpx;
                color: #999;
            }
        }
        &desc {
            &--dot {
                width: 16rpx;
                height: 16rpx;
                margin-right: 18rpx;
                border-radius: 16rpx;
            }
            &--text {
                color: #999;
                font-size: 24rpx;
            }
            &--arrow {
                margin-left: 8rpx;
            }
        }
    }
</style>

<template>
    
    <view class="list__wrap">
        <view :class="['list__body', 'list__' + mode ]" @tap="onClick($event, {options, title})">

            <image v-if="src" class="list__image" :src="src" mode="aspectFill"></image>
            
            <view v-if="!src && icon" class="list__icon">
                <wk-icon :size="38" :type="icon" :color="iconColor"></wk-icon>
            </view>

            <view class="list__title">
                <view class="list__title--main">{{title}}</view>
                <view v-if="detail" class="list__title--sub">{{detail}}</view>
            </view>

            <view v-if="dot" :style="{ background: dotColor }" class="list__desc--dot"></view>

            <slot></slot>

            <view v-if="details" class="list__desc--text" :style=" detailsStyle " >{{details}}</view>

            <view v-if="arrow" class="list__desc--arrow">
                <wk-icon :type=" 'next' " :size="30" :color=" '#c2c2c2' "></wk-icon>
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
            title: { // 标题
                type: String,
                default: ''
            },
            mode: { // 是否🈶️边框
                type: String,
                default: 'none'
            },
            details: {
                type: String,
                default: ''
            },
            src: {
                type: String,
                default: ''
            },
            icon:{ // icon图标
                type: String,
                default: ''
            },
            iconColor: { // 图标颜色
                type: String,
                default: ''
            },
            arrow: { // 右边的箭头
                type: Boolean,
                default: false
            },
            options: {
                type: null,
                default: ''
            },
            detailsStyle: {
                type: String,
                default: ''
            }
        },
        methods: {
            onClick(e, option) {
                this.$emit('listclick', e, option)
            }
        }
    }

</script>

