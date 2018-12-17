
<style lang="scss">
.cart_bar {
    &_wrap {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        display: none;
        &_white {
            width: 100%;
            position: absolute;
            left: 0;
            bottom: -100%;
            background-color: white;
            transition: all 0.3s;
        }
        &_animate {
            bottom: 0;
            transition: all 0.3s 0.1s;
        }
        overflow: hidden;
    }
    &_show {
        display: block;
    }
    &_choice {
        display: flex;
        div {
            display: flex;
            flex: 1;
            height: 98rpx;
            justify-content: center;
            align-items: center;
            font-size: 28rpx;
            color: white;
            background-color: #f44e3e;
        }
        .quick_buy {
            background-color: #f5a623;
            font-size: 28rpx;
        }
    }
    &_sure {
        display: flex;
        width: 100%;
        height: 98rpx;
        background-color: #e24136;
        color: white;
        justify-content: center;
        align-items: center;
        font-size: 36rpx;
    }
    &_topWhite {
        width: 100%;
        box-sizing: border-box;
        padding-left: 30rpx;
        padding-right: 30rpx;
    }
    &_topCont {
        display: flex;
        padding-bottom: 27rpx;
        border-bottom: solid 1px #f5f5f5;
        position: relative;
        > span {
            display: inline-block;
            width: 210rpx;
            height: 210rpx;
            overflow: hidden;
            border-radius: 8rpx;
            margin-top: -45rpx;
            margin-right: 32rpx;
            background: {
                size: cover;
                position: center center;
                repeat: no-repeat;
            }
            background-color: white;
        }
        .shop_name {
            width: 175px;
            font-size: 15px;
            .price_wrap {
                height: 85rpx;
                display: flex;
                align-items: center;
                color: #e24136;
            }
        }
        .del {
            position: absolute;
            right: 0;
            top: 10rpx;
        }
    }
    &_flavor {
        padding: 15px 0 10px 0;
        .flavor_spec {
            padding: 5px 0;
        }
        .spec_name {
            color: #333333;
            font-size: 15px;
            padding: 4px 0;
        }
        .spec_item {
            display: flex;
            flex-wrap: wrap;
            span {
                padding: 8px 13px;
                background-color: #eee;
                color: #333;
                font-size: 12px;
                border-radius: 4px;
                margin-right: 15px;
                margin-bottom: 5px;
            }
            .select {
                background-color: #f16601;
                color: white;
            }
            .disabled {
                background: #f5f5f5;
                color: #bdbdbd;
            }
        }
    }
    &_stock {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30rpx;
        font-size: 30rpx;
        color: #262626;
        div {
            display: flex;
            align-items: center;
            .name {
                margin-right: 4px;
            }
            .stock_num {
                color: #999;
            }
        }
    }
    &_overflow {
        max-height: 40vh;
        overflow-y: scroll;
    }
}
.cart_mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
}
.plus {
    width: 226rpx;
    height: 48rpx;
    border: solid 1px #b6b6b6;
    border-radius: 8rpx;
    display: flex;
    margin-left: 10rpx;
    div {
        width: 80rpx;
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
    }
    .buy_num {
        border-left: solid 1px #b6b6b6;
        border-right: solid 1px #b6b6b6;
        padding: 0 10rpx;
        overflow: hidden;
        input {
            text-align: center;
        }
    }
}
.clear {
    zoom: 1;
}
.clear:after {
    content: '';
    display: block;
    clear: both;
    height: 0;
    overflow: hidden;
}
</style>

<template>
    
    <div 
        class="cart_bar_wrap" 
        :class=" [ openCart ? 'cart_bar_show' : '' ] "
        @click.stop="closeChoice"
    >
        <div 
            class="cart_bar_wrap_white clear" 
            :class="{ 'cart_bar_wrap_animate': openCart }" 
            catchtap="true"
        >


            <div class="cart_bar_topWhite clear">
                <div class="cart_bar_topCont clear">
                    <span :style="{ backgroundImage: 'url(' + icon + ')' }"></span>
                    <div class="shop_name">
                        <div class="price_wrap">
                            <wk-price :value="price"></wk-price>
                        </div>
                        <wk-elip 
                            :content="name"
                            :line="1"
                        ></wk-elip>
                    </div>
                    <div class="del" @click.stop="closeChoice"> 
                        <wk-icon :type=" 'del' " :size="60" :color="'#b0b0b0'"></wk-icon>
                    </div>
                </div>

                <div class="cart_bar_overflow">
                    <div class="cart_bar_flavor">
                        <div 
                            v-for="(item, index) in spec"
                            :key="index"
                            class="flavor_spec"
                        >
                            <div class="spec_name">{{item.name}}</div>
                            <div class="spec_item">
                                <span 
                                    v-for="(spec, specIndex) in item.item" 
                                    :class=" [ spec.selected ? 'select': '', spec.status ? '': 'disabled' ]" 
                                    :key="specIndex"
                                    @click="onSelsct(spec.status, index, specIndex, item.name, spec.name)"
                                >
                                    {{spec.name}}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="cart_bar_stock">
                        <div>
                            <span class="name">购买数量:</span>
                            <wk-counter :min=" 1 " :max=" stock " :number=" number " @changenumber="numberChange"></wk-counter>
                        </div>
                        <div>
                            <span class="name">库存:</span>
                            <span class="stock_num">{{stock}}</span>
                        </div>
                    </div>
                </div>

            </div> 
            <div v-if="type == 1" class="cart_bar_choice">
                <div class="quick_buy" @click.stop="btntap($event, 0)">加入购物车</div>
                <div @click.stop="btntap($event, 1)">立即购买</div>
            </div>
            <div v-if="type == 2" class="cart_bar_sure" @click.stop="btntap($event, 2)">确定</div>
        </div>
        <div class="cart_mask"></div>

    </div>

</template>

<script>

    import wkElip from '@c/elip'
    import wkIcon from '@c/icon'
    import wkCounter from '@c/counter'
    import wkPrice from '@c/price'

    export default {
        components:{
            wkElip,
            wkIcon,
            wkCounter,
            wkPrice
        },
        props: {
            name: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: ''
            },
            stock: {
                type: [String, Number],
                default: ''
            },
            spec: {
                type: Array,
                default: []
            },
            type: {
                type: [String, Number],
                default: 0
            },
            price: {
                type: String,
                default: ''
            },
            number: {
                type: String,
                default: ''
            }
        },
        data(){
            return {
                openCart: false,
                any: ''
        
    
            }
        },
        methods: {
            numberChange(data){
                this.$emit('numberChange', data)
            },
            closeChoice(){
                this.openCart = false
            },
            openChoice(){
                this.openCart = true
            },
            onSelsct(status, index, specIndex, itemName, specName){
                if(status){
                    this.$emit('propstap', index, specIndex, itemName, specName)
                }
            },
            btntap(e, index){
                this.$emit('btntap', e, index)
            }
        }
    }

</script>
