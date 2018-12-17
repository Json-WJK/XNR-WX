
<style lang="scss">

    .cart{
        &_bottom_wrap{
            padding-top: 18px;
        }
        &_bottom_cont{
            display: flex;
            height: 48px;
            background: #445059;
        }
        &_info__btn{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 5px;
            position: relative;
            top: 5px;
            transition: transform .3s;
            .badge{
                padding: 0 4px;
                height: 15px;
                line-height: 15px;
                font-size: 12px;
                background: #ec5e2a;
                color: #fff;
                border-radius: 8px;
                position: absolute;
                left: 70%;
                top: -4px;
            }
        }
        &_totel_price__text{
            flex-grow: 1;
            background: #445059;
            font-size: 13px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            .price{
                color: #ec5e2a;
            }
        }
        &_totel_price__text_disabled{
            color: #999;
            .price{
                color: #999;
            }
        }
        &_payment__btn{
            width: 120px;
            background-color: #f5a623;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #f5f5f5;
            font-size: 17px;
        }
        &_payment__btn_disabled{
            background-color: #bbb;
            color: #fff;
        }
    }
    .animation{
        transform: scale(.9)
    }

</style>

<template>

    <div class="cart_bottom_wrap">
        <div class="cart_bottom_cont">
            <div
                class="cart_info__btn"
                :class=" [ badgeAnimation ? 'animation' : ''] "
                @click="leftBtn"
            >
                <div class="badge" v-if="badgeNumber">
                    {{badgeNumber}}
                </div>
                <wk-icon :type=" 'ai66' " :size="84" :color=" disabled ? '#bbb' : '#f5a623' "></wk-icon>
            </div>

            <div
                class="cart_totel_price__text"
                :class=" [ disabled ? 'cart_totel_price__text_disabled' : '']"
                @click="leftBtn"
            >
                <div>
                    已选择{{badgeNumber}}件商品， <wk-price :value="price"></wk-price>
                </div>
            </div>

            <div
                class="cart_payment__btn"
                :class=" [ disabled ? 'cart_payment__btn_disabled' : '' ] "
                @click="rightBtn"
            >
                <div>去结算</div>
            </div>
        </div>
    </div>

</template>

<script>

    import wkIcon from '@c/icon'
    import wkPrice from '@c/price'

    export default {

        components: {
            wkIcon,
            wkPrice
        },
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            price: {
                type: [String, Number],
                default: 0
            },
            badge: {
                type: Number,
                default: 0
            },
            overflow: {
                type: Number,
                default: 99
            }
        },
        data(){
            return {
                badgeAnimation: false
            }
        },
        computed: {
            badgeNumber(){
                return this.badge > this.overflow ? `${this.overflow}+` : this.badge
            }
        },
        watch: {
            badgeNumber(){
                this.badgeAnimation = true
                setTimeout(() => {
                    this.badgeAnimation = false
                }, 300);
            }
        },
        methods: {
            leftBtn(e){
                if(this.disabled) return
                this.$emit('leftclick', e)
            },
            rightBtn(e){
                this.$emit('rightclick', e)
            },
        }

    }

</script>
