
<style lang="scss">
    .dialog{
        &__wrap{
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0; top: 0;
            display: none;
            z-index: 9999;
        }
        &__mask{
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0; left: 0;
            background-color: rgba(0,0,0,.6);
            transition: .3s;
            display: none;
        }
        &__container{
            position: fixed;
            top: 45%; left: 50%;
            width: 80%;
            height: 0;
            font-size: 32rpx;
            overflow: hidden;
            transition: all .2s linear;
            border-radius: 4px;
            background-color: #fff;
            transform: translate3d(-50%,-50%,0);
            color: #333;
            opacity: 0;
        }
        &__header{
            line-height: 76rpx;
            text-align: center;
        }
        &__content{
            position: relative;
            padding: 0 40rpx 20rpx;
            line-height: 1.5;
            min-height: 80rpx;
            &__icon__type{
                padding: 20rpx 40rpx;
            }
            .text{
                text-align: center;
                line-height: 60rpx;
                padding-top: 20rpx;
            }
        }
        &__icon{
            text-align: center;
            line-height: 1;
        }
        &__content__title{
            color: #999;
            font-size: 28rpx;
        }
        &__footer{
            overflow: hidden;
            
        }
        &__footer__row{
            display: flex;
            .dialog__button{
                flex: 1;
                &:after{
                    border-right-width: 1px;
                    border-top-width: 1px;
                }
                &:last-child:after{
                    border-right-width: 0;
                }
            }
        }
        &__footer__col{
            .dialog__button{
                height: 80rpx;
                line-height: 80rpx;
                &:after{
                    border-top-width: 1px;
                }
            }
        }
        &__button{
            line-height: 100rpx;
            height: 100rpx;
            padding: 0 10rpx;
            border-radius: 0;
            margin-bottom: 0;
            background: #fff;
            &:after{
                border-width:0;
                border-radius:0
            }
        }
        &__show {
            display: block;
            .dialog__container{
                opacity:1;
                height:auto;
            }
            .dialog__mask{
                display:block
            }
        }
    }
</style>

<template>

    <view class="dialog__wrap" :class="{ 'dialog__show': show }">
        <!-- 遮罩层 -->
        <view 
            class="dialog__mask" 
            @tap="dialogClick($event, {guid: 'cancel', type: 500})"
        ></view>

        <!-- 内容区 -->
        <view class="dialog__container">
            <!-- 标题 -->
            <view
                v-if="title"
                class="dialog__header"
                :style="{ color: titleColor }"
            >{{ title }}</view>

            <view
                v-if="content || iconType || src"
                class="dialog__content" 
                :class="{ 'dialog__content__title' : title, 'dialog__content__icon__type': iconType}"
                :style="{ color: contentColor }"
            >
                <!-- 图标 -->
                <view class="dialog__icon">
                    <wk-icon :type="iconType" :size="iconSize" :color="iconColor" v-if="iconType && !src"></wk-icon>
                    <img :src="src" v-if="!iconType && src" mode="widthFix" :style=" { width: iconSize + 'rpx' } "/>
                </view>
                <view class="text">{{ content }}</view>
            </view>

            <!-- 父组件传children -->
            <slot v-if="!content"></slot>

            <view
                class="dialog__footer" 
                :class="[ 'dialog__footer__' + buttonMode ]"
                v-if="buttons"
            >
                <block v-for="(item, index) in buttons" :key="index">
                    <button
                        :class=" [ item.class ? item.class : 'dialog__button', item.class ] "
                        @tap="dialogClick($event, {guid: item.guid, type: index})"
                        :style="{ color: item.color }"
                    >{{ item.text }}</button>
                </block>
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
            show: {
                type:Boolean,
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
            buttons: {
                type: Array,
                default: [
                    {
                        guid: 'cancel',
                        text: '取消',
                        color: '#999'
                    },
                    {
                        guid: 'confirm',
                        text: '确定',
                        color: '#0bb72f'
                    },
                ]
            },
            buttonMode: {
                type: String,
                default: 'row' // row行显示 col 列显示
            }
        },
        methods: {
            dialogClick(e, option){
                if(option.guid == 'confirm') {
                    this.$emit('dialogConfirm', e, option)
                }else if(option.guid == 'cancel') {
                    this.$emit('dialogCancel', e, option)
                }
                this.$emit('dialogClick', e, option)
                this.dialogHide()
            },
            dialogShow(options = {}){
                for(let i in options){
                    console.log(options)
                    this[i] = options[i]
                }
                console.log(this)
                if(JSON.stringify(options) == '{}'){
                    this.show = true
                }
            },
            dialogHide(){
                this.show = false
            }
        }
    }

</script>

