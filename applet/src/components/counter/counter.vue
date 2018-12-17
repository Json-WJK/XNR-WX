
<style lang="scss">
    .counter {
        display:flex;
        &__number {
            box-sizing:border-box;
            height: 40rpx;
            -webkit-border-radius: 4rpx;
            border-radius: 4rpx;
        }
        &__modify {
            display: inline-block;
            height: 40rpx;
            line-height: 40rpx;
            text-align: center;
            vertical-align: top;
            color: #ff5777;
            font-size:0;
            padding:0;
            background: #dbdbdb;
        }
        &__opt {
            width: 40rpx;
        }
        &__text {
            min-width: 80rpx;
            border: 1px solid #dbdbdb;
            background: #fff;
            color: #000;
            font-size: 28rpx;
            box-sizing:border-box;
            padding: 0 6rpx;
        }
        &__no {
            color: #d2d2d2;
        }
        &__icon{
            font-size: 24rpx;
        }

    }
</style>

<template>
    <view class="counter">
        <view class="counter__number">
            <view 
                class="counter__modify counter__opt" 
                :class="[ number <= min || disabled ? ' counter__no' : '' ]" 
                @tap="minusHandler"
            >
                <text class="counter__icon iconfont icon-jian1"></text>
                <wk-icon :type=" 'jian' " :size=" '50rpx' " :color="'#000'"></wk-icon>
            </view>

            <text 
                class="counter__modify counter__text"
                :class="[ disabled ? ' counter__no' : '' ]"
            >{{number}}</text>

            <view 
                class="counter__modify counter__opt" 
                :class="[ number >= max || disabled ? ' counter__no' : '' ]"
                @tap="addHandler"
            >
                <wk-icon :type=" 'jia' " :size=" '50rpx' " :color="'#000'"></wk-icon>
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
            number: {
                type: [Number, String],
                default: 0
            },
            max: {
                type: [Number, String],
                default: 0
            },
            min: {
                type: [String, Number],
                default: 0
            },
            disabled: {
                type: [Boolean],
                default: false
            }
        },
        watch: {
            number(newVal){
                this.$emit('changenumber', {
                    number: newVal,
                    min: this.min,
                    max: this.max,
                })
            }
        },
        methods: {
            addHandler(e) {
                if (this.max <= this.number || this.disabled) return
                this.number = ++this.number
                this.$emit('changenumber', {
                    e: e,
                    number: this.number,
                    min: this.min,
                    max: this.max,
                    type: 'add'
                })
            },
            minusHandler(e) {
                if (this.min >= this.number || this.disabled) return
                this.number = --this.number
                this.$emit('changenumber', {
                    e: e,
                    number: this.number,
                    min: this.min,
                    max: this.max,
                    type: 'minus'
                })
            },
            resetCurrentNumber(){
                console.log(this.max)
                console.log(this.number)
            }
        },
        
    }

</script>
