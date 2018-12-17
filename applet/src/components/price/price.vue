
<style lang="scss">

    .price,
    .price__icon,
    .price__count {
        display: inline-block;
        line-height: 1;
    }

    .price__icon--sup,
    .price__icon--sub {
        font-size: 52%;
    }

    .price__icon--sup {
        vertical-align: super;
        line-height: 1.1;
    }

    .price__icon--del,
    .price__count--del {
        font-weight: normal;
        text-decoration: line-through;
    }

    .count__decimal--small {
        display: inline;
        font-size: 62%;
    }

</style>

<template>
    
    <view :class="[ 'price price__status--' + status, className]">
        <view :class="[ 'price__icon price__icon--' + icon, 'price__icon--' + status ]">{{symbol}}</view>
        <view :class="[ 'count price__count price__count--' + status ]">
            <slot v-if="!price"></slot>

            {{price && decimal !== 'small' ? price : 0}}
            <text v-if="price && decimal === 'small' ">{{price}}</text>
            <text v-if="price && decimal === 'small' " class="count__decimal--small">.{{decimalNum}}</text>
        </view>
    </view>

</template>

<script>

    export default {
        props: {
            status: {
                type: String,
                default: ''
            },
            value: {
                type: [String, Number],
                default: ''
            },
            symbol: {
                type: String,
                default: '￥'
            },
            icon: {
                type: String,
                default: ''
            },
            decimal: {
                type: String,
                default: ''
            },
            className: {
                type: String,
                default: ''
            }
        },
        computed: {
            price(){
                const decimal = this.decimal + ''
                switch (decimal) {
                    
                    // 保留一位小数
                    case '1':
                        return this.getDecimal(this.value, 1);
                        break;

                    // 只显示整数
                    case 'none':
                        return parseInt(this.value);
                        break;

                    // 小数部分缩小
                    case 'small':
                        this.decimalNum = (this.value.toString().split('.')[1] || '00').trim()
                        return parseInt(this.value).toString().trim();
                        break;
                    default:
                        return this.getDecimal(this.value, 2);
                        break;
                }
            }
        },
        methods: {
            getDecimal(priceNum, len, dir) {
                if (!priceNum || !len) {
                    return false;
                }

                dir = dir || 'f';
                priceNum = parseFloat(priceNum, 10);
                len = parseInt(len, 10);

                if (dir === 'f') {
                    var intNumStr = priceNum.toString().split('.')[0];
                    var decimalNumStr = priceNum.toString().split('.')[1] || '00';
                    if (decimalNumStr.length < 2) {
                    decimalNumStr += '0';
                    }
                    return intNumStr + '.' + decimalNumStr.substring(0, len);
                } else {
                    return priceNum.toFixed(len);
                }
            }
        }
    }

</script>

