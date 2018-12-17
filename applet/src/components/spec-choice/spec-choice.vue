
<style lang="scss">

    .cart_bar{
        &_wrap{
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0;
            top: 0;
            display: none;
            &_white{
                width: 600rpx;
                height: 600rpx;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

                background-color: white;
                transition:all .3s;
            }
            &_animate{
                bottom:150rpx;
                transition:all .3s .1s;
            }
            overflow: hidden;
        }
        &_show{
            display: block;
        }
        &_choice{
            height: 60rpx;
            width: 240rpx;
            position: absolute;
            bottom: 20rpx;
            left:50%;
            transform: translateX(-50%);

            div{
                display: flex;
                flex: 1;
                height: 60rpx;
                width: 240rpx;
                border-radius: 8rpx;
                justify-content: center;
                align-items: center;
                font-size: 24rpx;
                color: white;
                background-color: #f5a623;
            }
            .quick_buy{
                background-color: #ffa8a2;
            }
        }
        &_sure{
            display: flex;
            width: 100%;
            height: 98rpx;
            background-color: #e24136;
            color: white;
            justify-content: center;
            align-items: center;
            font-size: 36rpx;
        }
        &_topWhite{
            width: 100%;
            box-sizing: content-box;
            padding:30rpx;

        }
        &_topCont{
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
                background-color:white;
            }
            
            .del{
                position: absolute;
                right: 0;
                top: 10rpx;
            }
        }
        &_flavor{
            .flavor_spec{
                padding: 5px 0;
            }
            .spec_name{
                color:#333333;
                font-size: 12px;
                padding: 4px 0;
            }
            .spec_item{
                display: flex;
                flex-wrap:wrap;
                margin-top:10rpx;
                span{
                    padding: 4px 8px;
                    color:#333;
                    font-size: 12px;
                    border-radius: 4px;
                    margin-right: 15px;
                    margin-bottom: 5px;
                    border: 1px solid #dbdbdb;
                }
                .select{
                    background-color:#f16601;
                    color:white;
                }
                .disabled{
                    background: #f5f5f5;
                    color: #bdbdbd;
                }
            }
        }
        &_stock{
            display: flex;
            width: 90%;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30rpx;
            margin-top: 20rpx;
            font-size: 24rpx;
            color: #262626;
        }
        &_overflow {
            // max-height: 50vh;
            height: 600rpx;
            width: 600rpx;
            overflow-y: auto;
            .shop_name{
                width: 175px;
                font-size:12px;
                .price_wrap{
                    height: 60rpx;
                    display: flex;
                    align-items: center;
                    color: #e24136;
                    .stock{
                        align-items: center;
                        margin-left: 50rpx;
                        color: #666;
                        .name{
                            margin-right: 4px;
                        }
                        .stock_num{
                            color: #999;
                        }
                    }
                }
            }          
        }
    }
    .cart_mask{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.7);
    }
    .plus{
        width: 226rpx;
        height: 48rpx;
        border:solid 1px #b6b6b6;
        border-radius: 8rpx;
        display: flex;
        margin-left: 10rpx;
        div{
            width:80rpx;
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
        }
        .buy_num{
            border-left: solid 1px #b6b6b6;
            border-right: solid 1px #b6b6b6;
            padding:0 10rpx;
            overflow: hidden;
            input{
                text-align: center;
            }
        }
    }
    .clear { zoom:1; }
    .clear:after { content:""; display:block; clear:both; height:0; overflow:hidden; }

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
                <!-- <div class="cart_bar_topCont clear">
                    <span :style="{ backgroundImage: 'url(' + icon + ')' }"></span>
                    
                    <div class="del" @click.stop="closeChoice"> 
                        <wk-icon :type=" 'del' " :size="60" :color="'#b0b0b0'"></wk-icon>
                    </div>
                </div> -->

                <div class="cart_bar_overflow">
                    <div class="shop_name">
                        <wk-elip 
                            :content="name"
                            :line="1"
                        ></wk-elip>
                        <div class="price_wrap">
                            <wk-price :value="price"></wk-price>

                            <div class="stock">
                                <span class="name">库存:</span>
                                <span class="stock_num">{{stock}}</span>
                            </div>
                        </div>
                        
                    </div>
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
                        <span class="name">购买数量:</span>
                        <wk-counter :min=" 1 " :max=" stock " :number=" number " @changenumber="numberChange"></wk-counter>
                    </div>
                </div>
                <div v-if="type == 1" class="cart_bar_choice">
                    <div @click.stop="btntap($event, 1)">加入购物车</div>
                </div>
            </div> 

            <!-- <div v-if="type == 2" class="cart_bar_sure" @click.stop="btntap($event, 2)">确定</div> -->
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
                openCart: false
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
