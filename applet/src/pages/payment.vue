
<style lang="scss">
page {
    background: #f5f5f5;
}

.foods {
    &_contain {
        padding-bottom: 48px;
    }
    &_ft {
        width: 100%;
        height: 48px;
        line-height: 48px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 9;

        .total_price {
            font-size: 13px;
            margin-left: 15px;
            color: #333;
            .price {
                color: #ec5e2a;
            }
        }

        .payment {
            width: 120px;
            background: #09f;
            color: #fff;
            font-size: 17px;
            text-align: center;
        }
    }

    &_selected_list_wrap {
        width: 100%;
        height: calc(100vh - 48px);
        background: rgba(0, 0, 0, 0.4);
        z-index: 9;
        position: absolute;
        left: 0;
        top: 0;
    }
    &_selected_list {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #fff;
    }
    &_selected_item {
        display: flex;
        height: 52px;
        margin-left: 15px;
        padding-right: 15px;
        align-items: center;
        border-bottom: 1px solid #eee;
        background: #fff;
        .name {
            width: 175px;
            font-size: 16px;
        }
        .price {
            flex: 1;
            font-size: 15px;
        }
        .number {
            width: 65px;
        }
    }
    &_selected_title {
        padding: 0 15px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        background: #ececee;
        color: #666;
    }
    &_selected_ft {
        height: 23px;
        background: #f8f8f8;
    }
    &_selected_content {
        max-height: 240px;
        overflow-y: scroll;
    }
    &_order_wrap {
        margin: 10px 15px;
        background: #fff;
        border-radius: 5px;
        padding: 0 10px;
        box-sizing: border-box;
    }
    &_order_seller {
        font-size: 15px;
        height: 47px;
        line-height: 47px;
        color: #333;
        border-bottom: 1px solid #f5f5f5;
        font-weight: 500;
    }
    &_order_tablesid {
        font-size: 15px;
        height: 47px;
        line-height: 47px;
        color: #333;
        &_number {
            float: right;
        }
    }
    &_order_item {
        display: flex;
        height: 33px;
        align-items: center;
        .name {
            width: 198px;
            font-size: 13px;
            color: #333;
        }
        .number {
            flex: 1;
            font-size: 11px;
            color: #b6b6b6;
        }
        .order_price {
            width: 80px;
            text-align: right;
            color: #333;
            font-size: 13px;
        }
    }
    &_order_outer_wrap {
        padding: 8px 0;
        margin: 8px 0;
        border-top: 1px dotted #eee;
        border-bottom: 1px dotted #eee;
    }
    &_order_outer {
        display: flex;
        justify-content: space-between;
        height: 27px;
        line-height: 27px;
        .name {
            width: 198px;
            font-size: 13px;
            color: #333;
        }
        .outer_price {
            width: 80px;
            text-align: right;
            color: #333;
            font-size: 13px;
        }
    }
    &_repast_methods {
        display: flex;
        justify-content: space-around;
        padding-bottom: 16px;
        border-bottom: 1px solid #eee;
        li {
            width: 92px;
            height: 35px;
            line-height: 35px;
            text-align: center;
            box-sizing: border-box;
            border: 1px solid #09f;
            font-size: 14px;
            border-radius: 5px;
            color: #09f;
            transition: all 0.3s;
            &.selected_methods {
                width: 120px;
                background: #09f;
                color: #fff;
            }
        }
    }
    &_public_class {
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;
        color: #333;
        border-bottom: 1px solid #eee;
        &:last-child {
            border-bottom: 0;
        }
        .color999 {
            color: #999;
        }
    }
    &_methods_text {
        .payment_icon {
            display: block;
            width: 100px;
            height: 23px;
            background: {
                image: url(../../static/img/wx-payment.png);
                size: cover;
            }
        }
    }
    &_out_address_wrap {
        // 外卖附加
        margin: 10px 15px;
        background: #fff;
        border-radius: 5px;
        box-sizing: border-box;
    }
    &_out_address {
        min-height: 35px;
        padding: 15px 0;
        display: flex;
        .address {
            width: 30px;
            line-height: 30px;
            text-align: center;
            color: #666;
        }
        .main_info {
            flex: 1;
            font-size: 14px;
            line-height: 1.5;
            .user_name {
                line-height: 35px;
                font-size: 14px;
                color: #333;
                display: flex;
                justify-content: space-between;
            }
            .user_address {
                font-size: 14px;
                color: #888;
            }
        }
        .next {
            width: 53px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .not_selected {
            line-height: 35px;
        }
    }
    &_out_time {
        display: flex;
        height: 50px;
        line-height: 50px;
        .time {
            width: 30px;
            text-align: center;
            color: #666;
        }
        .main {
            flex: 1;
            padding-right: 15px;
            font-size: 14px;
            border-top: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            .book_time {
                color: #ec5e2a;
            }
        }
    }
    &_reserve_wrap {
        margin: 10px 15px;
        background: #fff;
        border-radius: 5px;
        box-sizing: border-box;
    }
    &_reserve_item {
        height: 44px;
        line-height: 44px;
        display: flex;
        align-items: center;
        .icon {
            width: 35px;
            text-align: center;
        }
        .cont {
            flex: 1;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #eee;
            margin-right: 16px;
            .outer {
                color: #707070;
                font-size: 12px;
            }
        }
    }
}

.reserve_prick_time {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    .prick_cont {
        width: 80%;
    }
    .title {
        line-height: 30px;
        background: #fff;
        color: #333;
        text-align: center;
        font-size: 14px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .tools {
        display: flex;
        background: #fff;
        border-top: 1px solid #eee;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        overflow: hidden;
        button {
            flex: 1;
            background: #fff;
            font-size: 14px;
            color: #0bb72f;
            &:nth-child(1) {
                border-right: 1px solid #eee;
                color: #999;
            }
            &:after {
                content: '';
                border: 0;
            }
        }
    }
    .tel {
        height: 80px;
        display: flex;
        background: #fff;
        justify-content: center;
        align-items: center;
        input {
            width: 80%;
            padding: 2px 8px;
            border: 1px solid #eee;
            font-size: 14px;
        }
    }
}
.picker {
    &__view {
        height: 400rpx;
        background: #fff;
        line-height: 60rpx;
        &__mask {
            background: #fff;
            color: #333;
        }
        &__column {
            line-height: 34px;
            text-align: center;
        }
    }
}
</style>

<template>
    
    <div class="foods_contain">

        <!-- 日期选择 -->
        <div class="reserve_prick_time" catchtouchmove="true" v-if="reserveDateBoxStatus">
            <div class="prick_cont">
                <div class="title">
                    选择日期
                </div>
                <picker-view 
                    indicator-style="height: 50px;" 
                    class="picker__view" 
                    :value="selectedReserveDate" 
                    @change="dateChange"
                >
                    <picker-view-column class="picker__view__column">
                        <view v-for="(item, index) in years" :key="index" style="line-height: 50px">{{item}}</view>
                    </picker-view-column>
                    <picker-view-column class="picker__view__column">
                        <view v-for="(item, index) in months" :key="index" style="line-height: 50px">{{item}}</view>
                    </picker-view-column>
                    <picker-view-column class="picker__view__column">
                        <view v-for="(item, index) in days" :key="index" style="line-height: 50px">{{item}}</view>
                    </picker-view-column>
                </picker-view>
                <div class="tools">
                    <button @click="cancelDate">取消</button>
                    <button @click="confimDate">确定</button>
                </div>
            </div>
        </div>

        <!-- 时间选择 -->
        <div class="reserve_prick_time" catchtouchmove="true" v-if="reserveTimeBoxStatus">
            <div class="prick_cont">
                <div class="title">
                    选择时间
                </div>
                <picker-view 
                    indicator-style="height: 50px;" 
                    class="picker__view" 
                    :value="selectedReserveTime" 
                    @change="timeChange"
                >
                    <picker-view-column class="picker__view__column">
                        <view v-for="(item, index) in hours" :key="index" style="line-height: 50px">{{item}}</view>
                    </picker-view-column>
                    <picker-view-column class="picker__view__column">
                        <view style="line-height: 50px"> : </view>
                    </picker-view-column>
                    <picker-view-column class="picker__view__column">
                        <view v-for="(item, index) in minutes" :key="index" style="line-height: 50px">{{item}}</view>
                    </picker-view-column>
                </picker-view>
                <div class="tools">
                    <button @click="cancelTime">取消</button>
                    <button @click="confimTime">确定</button>
                </div>
            </div>
        </div>

        <!-- 人数选择 -->
        <div class="reserve_prick_time" catchtouchmove="true" v-if="reservePeopleBoxStatus">
            <div class="prick_cont">
                <div class="title">
                    选择人数
                </div>
                <picker-view 
                    indicator-style="height: 50px;" 
                    class="picker__view" 
                    :value="selectedReservePeople" 
                    @change="peopleChange"
                >
                    <picker-view-column class="picker__view__column">
                        <view v-for="(item, index) in peopleNumbers" :key="index" style="line-height: 50px">{{item}}</view>
                    </picker-view-column>
                    <picker-view-column class="picker__view__column">
                        <view style="line-height: 50px">人</view>
                    </picker-view-column>
                </picker-view>
                <div class="tools">
                    <button @click="cancelPeople">取消</button>
                    <button @click="confimPeople">确定</button>
                </div>
            </div>
        </div>

        <!-- 手机号 -->
        <div class="reserve_prick_time" catchtouchmove="true" v-if="reserveTelBoxStatus">
            <div class="prick_cont">
                <div class="title">
                    请输入手机号
                </div>
                <div class="tel">
                    <input v-model="tel" placeholder="请输入手机号" maxlength="11"/>
                </div>
                <div class="tools">
                    <button @click="cancelTel">取消</button>
                    <button @click="confimTel">确定</button>
                </div>
            </div>
        </div>

        <!-- 姓名 -->
        <div class="reserve_prick_time" catchtouchmove="true" v-if="reserveNameBoxStatus">
            <div class="prick_cont">
                <div class="title">
                    请输入姓名
                </div>
                <div class="tel">
                    <input v-model="inputUsername" placeholder="请输入姓名" maxlength="11"/>
                </div>
                <div class="tools">
                    <button @click="cancelName">取消</button>
                    <button @click="confimName">确定</button>
                </div>
            </div>
        </div>

        

        <!-- 订单菜品 -->
        <div class="foods_order_wrap">

            <div class="foods_order_seller">
                {{sellerName}}
            </div>
  
            <div v-if="tablesId" class="foods_order_tablesid">
                <span>桌号</span>
                <span class="foods_order_tablesid_number">{{tablesId}}</span> 
            </div>

            <div 
                v-for="(item, index) in selectedFoods"
                :key="index"
                class="foods_order_item"
            >

                <div 
                    class="name"
                >
                    {{item.name}}
                </div>

                <div 
                    class="number"
                >
                    x{{item.number}}
                </div>

                <div 
                    class="order_price"
                >
                    <wk-price :value=" item.price * 100 * item.number / 100" :icon=" 'sub' "></wk-price>
                </div>

            </div>

            <div class="foods_order_outer_wrap">
                <div class="foods_order_outer">

                    <div class="name">
                        餐盒费
                    </div>

                    <div class="outer_price">
                        <wk-price :value="boxPrice" :icon=" 'sub' "></wk-price>
                    </div>

                </div>

                <div class="foods_order_outer">

                    <div class="name">
                        送餐费
                    </div>

                    <div class="outer_price">
                        <wk-price :value="outerPrice" :icon=" 'sub' "></wk-price>
                    </div>

                </div>
            </div>

            <!-- 就餐方式 -->
            <ul class="foods_repast_methods">
                <li :class=" [ selectedMethods === 0 ? 'selected_methods' : ''] " @click="selectedRepast(0)">堂食</li>
                <li :class=" [ selectedMethods === 1 ? 'selected_methods' : ''] " @click="selectedRepast(1)">外卖</li>
                <li :class=" [ selectedMethods === 2 ? 'selected_methods' : ''] " @click="selectedRepast(2)" v-if="getReserve">预定</li>
            </ul>

            <div class="foods_public_class">
                <span>订单备注</span>
                <span class="color999" @click="toRemarks">
                    {{viewRemarks}}
                    <wk-icon :type=" 'next' " :size="26"></wk-icon>
                </span>
            </div>
            <!-- <div class="foods_public_class foods_methods_text">
                <span>支付方式</span>
                <span class="payment_icon"></span>
            </div> -->

        </div>

        <!-- 外卖附加信息 -->
        <div class="foods_out_address_wrap" v-if="selectedMethods == 1">
            <div class="foods_out_address" @click="openAddress">
                <div class="address">
                    <wk-icon :type=" 'address' " :size="30"></wk-icon>
                </div>
                <div class="main_info">
                    <div class="not_selected" v-if="!userName && !userAddress">选择送货地址</div>
                    <div v-if="userName" class="user_name">
                        <span>{{userName}}</span>
                        <span>{{userTel}}</span>
                    </div>
                    <div v-if="userAddress" class="user_address">{{userAddress}}</div>
                </div>
                <div class="next">
                    <wk-icon :type=" 'next' " :size="30"></wk-icon>
                </div>
            </div>
            <div class="foods_out_time">
                <div class="time">
                    <wk-icon :type=" 'shijian' " :size="30"></wk-icon>
                </div>
                <div class="main">
                    <div>预计送达时间</div>
                    <div class="book_time">
                        {{bookTime}}
                    </div>
                </div>
            </div>
        </div>

        <!-- 预定附加信息 -->
        <div class="foods_reserve_wrap" v-if="selectedMethods == 2">
            <div class="foods_reserve_item">
                <div class="icon">
                    <wk-icon :type=" 'date' " :size="26" :color=" '#c0c0c0' "></wk-icon>
                </div>
                <div class="cont">
                    <div>预定日期</div>
                    <div class="outer" @click="openDate">
                        {{reserveDate}}
                        <wk-icon :type=" 'next' " :size="24"></wk-icon>     
                    </div>
                </div>
            </div>
            <div class="foods_reserve_item">
                <div class="icon">
                    <wk-icon :type=" 'shijian' " :size="26" :color=" '#c0c0c0' "></wk-icon>
                </div>
                <div class="cont">
                    <div>预定时间</div>
                    <div class="outer" @click="openTime">
                        {{reserveTime}}
                        <wk-icon :type=" 'next' " :size="24"></wk-icon>     
                    </div>
                </div>
            </div>
            <div class="foods_reserve_item">
                <div class="icon">
                    <wk-icon :type=" 'peoples' " :size="26" :color=" '#c0c0c0' "></wk-icon>
                </div>
                <div class="cont">
                    <div>就餐人数</div>
                    <div class="outer" @click="openPeople">
                        {{people}}人
                        <wk-icon :type=" 'next' " :size="24"></wk-icon>     
                    </div>
                </div>
            </div>
            <div class="foods_reserve_item">
                <div class="icon">
                    <wk-icon :type=" 'mobile' " :size="26" :color=" '#c0c0c0' "></wk-icon>
                </div>
                <div class="cont">
                    <div>联系电话</div>
                    <div class="outer" @click="openTel">
                        {{mobile || '请输入手机号'}}
                        <wk-icon :type=" 'next' " :size="24"></wk-icon>     
                    </div>
                </div>
            </div>
            <div class="foods_reserve_item">
                <div class="icon">
                    <wk-icon :type=" 'member' " :size="26" :color=" '#c0c0c0' "></wk-icon>
                </div>
                <div class="cont">
                    <div>联系人</div>
                    <div class="outer" @click="openName">
                        {{reserveUsername || '请输入姓名'}}
                        <wk-icon :type=" 'next' " :size="24"></wk-icon>
                    </div>
                </div>
            </div>
        </div>

        <div class="foods_ft">
            <div class="total_price">
                合计金额 <wk-price :value="totalPrice"></wk-price>
            </div>
            <div class="payment" @click="paymentFn1">
                去结算
            </div>
        </div>

        <wk-toptips ref="toptips"></wk-toptips>    

        <wk-dialog-pay :show=isDialog :title=dialogTitle
					:buttons=buttons :buttonMode=buttonMode
                    :balance=balance :balanceNo=balanceNo 
                    @dialogpayClick=dialogpayClick @topUp=topUp>                    
        </wk-dialog-pay>
        <!-- @dialogHuiyuanka=paymentFn @dialogWechat=paymentFn -->
    </div>

</template>

<script>
import { getMerchant, getRestaurants, payment, getVipCard } from '@/api'
import wkCountPicker from '@c/count-picker'
import wkCartBottom from '@c/cart-bottom'
import wkPrice from '@c/price'
import wkIcon from '@c/icon'
import wkList from '@c/list'
import moment from 'moment'
import wkToptips from '@c/toptips'
import wkDialogPay from '@c/dialog-pay'
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'
import wx from 'wx'

export default {
    components: {
        wkCountPicker,
        wkCartBottom,
        wkPrice,
        wkIcon,
        wkList,
        wkToptips,
        wkDialogPay
    },
    computed: {
        ...mapState([
            // vuex选中的商品状态
            'selectedFoods',
            'remarks'
        ]),
        getReserve() {
            return this.reserve
        },
        viewRemarks() {
            return this.remarks.length > 8 ? `${this.remarks.substr(0, 8)}...` : this.remarks
        },
        disabledBottom() {
            // 底部购物车是否可用
            return !this.selectedFoods.length
        },
        badge() {
            // 底部购物车数量
            return this.selectedFoods.reduce((current, prev) => current + prev.number, 0)
        },
        abnorType() {
            // 错误流
            if (this.requestStatus === 404) {
                return 'DATA'
            } else if (this.requestStatus === 1) {
                return 'REQUEST_ERROR'
            } else {
                return ''
            }
        },
        totalPrice() {
            // 总价计算
            if (this.dinerType == 1) {
                return (
                    this.selectedFoods.reduce(
                        (current, prev) =>
                            current +
                            prev.price * 100 * prev.number +
                            prev.lunchBox * 100 * prev.number,
                        this.outerPrice * 100
                    ) / 100
                )
            } else {
                return (
                    this.selectedFoods.reduce(
                        (current, prev) => current + prev.price * 100 * prev.number,
                        0
                    ) / 100
                )
            }
        },
        selectedMethods() {
            // 0 堂食 1 外卖 2 预定
            if (this.dinerType == 0) {
                wx.setStorageSync('dinerType', 0)
                return 0
            } else if (this.dinerType == 1) {
                wx.setStorageSync('dinerType', 1)
                return 1
            } else if (this.dinerType == 2) {
                wx.setStorageSync('dinerType', 2)
                return 2
            }
        },
        boxPrice() {
            if (this.dinerType == 1) {
                return (
                    this.selectedFoods.reduce(
                        (current, prev) => current + prev.lunchBox * 100 * prev.number,
                        0
                    ) / 100
                )
            } else {
                return 0
            }
        },
        outerPrice() {
            if (this.dinerType == 1) {
                return this.givePrice
            } else {
                return 0
            }
        }
    },
    data() {
        return {
            dinerType: null,
            sellerName: '',
            givePrice: 0,
            userName: '',
            userAddress: '',
            userTel: '',
            reserveDate: '',
            selectedReserveDate: [0, 0, 0],
            reserveDateBoxStatus: false,
            years: [],
            months: [],
            days: [],
            minutes: [],
            hours: [],
            reserveTimeBoxStatus: false,
            selectedReserveTime: [0, 0, 0],
            reserveTime: '',
            peopleNumbers: [],
            reservePeopleBoxStatus: false,
            people: 1,
            selectedReservePeople: [0, 0],
            reserveTelBoxStatus: false,
            tel: '',
            mobile: '',
            ext: null,
            outFoodTime: 40,
            bookTime: '00 : 00',
            reserveNameBoxStatus: false,
            reserveUsername: '',
            inputUsername: '',
            tablesId: 0,
            vipIsOpen: false, //是否开通会员卡
            reserve: 0, //是否支持预定
            isDialog: false, //模态是否显示
            dialogTitle: '支付方式',
            buttonMode: 'col',
            balance: '',
            balanceNo: false,
            user_info_id: '',
            paymentData: {},
            restaurantId: 0,
            isOrder: false
        }
    },
    methods: {
        ...mapActions(['removeSelectedFoods']),
        toRemarks() {
            // 跳转备注
            this.$router.push({
                path: '/pages/remarks'
            })
        },
        selectedRepast(number) {
            // 切换就餐方式
            this.dinerType = number
        },
        topUp() {
            let url = encodeURIComponent(
                `${this.ext.api_host}/mp/member-card.html?openid=${this.ext.openid}&config_id=${
                    this.ext.config_id
                }&from=1&islogin=1`
            )
            console.log(url)
            this.$router.push({
                path: `/pages/vip-card-web-view?url=${url}`
            })
        },
        paymentFn1() {
            _.throttle(this.paymentFn, 1000)
        },
        paymentFn() {
            console.log(1112)

            // 支付
            let paymentData = {
                product: this.selectedFoods.map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quanty: item.number,
                        images: item.icon,
                        container: item.lunchBox
                    }
                }), // 菜品
                delivery: this.dinerType, // 就餐方式
                amount: this.totalPrice, // 总价
                source: '小程序', // 来源
                config_id: this.ext.config_id, // 配置id
                tables_id: this.tablesId, // 桌号
                openid: this.ext.openid, // openid
                user_info_id: this.user_info_id, //会员ID
                explain: this.remarks == '口味、偏好等要求' ? '' : this.remarks, // 备注
                restaurant_id: this.restaurantId,
                subtotal:
                    this.dinerType == 1
                        ? (this.totalPrice * 100 - this.boxPrice * 100 - this.outerPrice * 100) /
                          100
                        : this.totalPrice // 小记
            }
            if (this.dinerType == 1) {
                // 外卖需要的其他参数
                paymentData.delivery_site = this.userAddress
                paymentData.delivery_price = this.outerPrice
                paymentData.username = this.userName
                paymentData.userphone = this.userTel
                paymentData.container = this.boxPrice // 餐盒费
                paymentData.book_time = this.bookTime // 预计送达时间
            } else if (this.dinerType == 2) {
                // 预定的其他参数
                paymentData.username = this.reserveUsername
                paymentData.userphone = this.mobile
                paymentData.book_date = this.reserveDate
                paymentData.book_time = this.reserveTime
                paymentData.peoples = this.people // 人数
            }
            // 商品不能为空
            if (paymentData.product.length == 0) return
            // 外卖地址不能为空
            if (this.dinerType == 1) {
                if (!paymentData.delivery_site) {
                    this.$refs.toptips.showToptips({
                        content: '请选择送餐地址',
                        timer: 1500
                    })
                    return
                }
            }
            // 预定人和电话不能为空
            if (this.dinerType == 2) {
                if (!paymentData.username) {
                    this.$refs.toptips.showToptips({
                        content: '请输入预定人姓名',
                        timer: 1500
                    })
                    return
                } else if (!paymentData.userphone) {
                    this.$refs.toptips.showToptips({
                        content: '请输入手机号',
                        timer: 1500
                    })
                    return
                }
            }
            this.paymentData = paymentData

            if (this.vipIsOpen) {
                this.isDialog = true
                this.balance < this.paymentData.amount
                    ? (this.balanceNo = true)
                    : (this.balanceNo = false)
            } else {
                if (!this.isOrder) {
                    this.isOrder = true
                    payment(this.paymentData).then(result => {
                        if (result.success) {
                            wx.requestPayment({
                                timeStamp: result.data.timeStamp,
                                nonceStr: result.data.nonceStr,
                                package: result.data.package,
                                signType: result.data.signType,
                                paySign: result.data.paySign,
                                success: res => {
                                    let orderId = result.data.orderId
                                    this.$router.replace({
                                        path: `/pages/payment-success?code=${orderId}`
                                    })
                                    setTimeout(() => {
                                        // 产生订单后清空购物车
                                        this.removeSelectedFoods()
                                    }, 300)
                                },
                                fail: () => {
                                    this.$refs.toptips.showToptips({
                                        content: '支付失败, 请在我的订单中重新支付',
                                        timer: 1500
                                    })
                                    // 提示结束后跳转回上一页
                                    let timer = setTimeout(() => {
                                        this.$router.back()
                                        clearTimeout(timer)
                                        // 产生订单后清空购物车
                                        this.removeSelectedFoods()
                                    }, 1500)
                                }
                            })
                        } else {
                            this.$refs.toptips.showToptips({
                                content: result.data.message,
                                timer: 1500
                            })
                            // 提示结束后跳转回上一页
                            let timer = setTimeout(() => {
                                this.$router.back()
                                clearTimeout(timer)
                                // 产生订单后清空购物车
                                this.removeSelectedFoods()
                            }, 1500)
                        }
                    })
                }
            }
        },

        dialogpayClick(e, option) {
            if (option.guid === 'wechat' && option.type !== 500) {
                // 微信支付
                this.paymentData.pay_type = '微信'
            } else if (option.guid === 'huiyuanka' && option.type !== 500) {
                // 会员卡支付
                this.paymentData.pay_type = '会员卡'
            } else {
                this.isDialog = false
                return
            }
            if (!this.isOrder) {
                this.isOrder = true
                payment(this.paymentData)
                    .then(result => {
                        console.log(result)

                        if (result.success) {
                            let orderId = result.data.orderId
                            if (option.guid === 'huiyuanka') {
                                this.$refs.toptips.showToptips({
                                    content: '会员卡支付中',
                                    timer: 1000
                                })
                                this.isDialog = false

                                let timer = setTimeout(() => {
                                    if (result.data.code === 2000) {
                                        // 会员支付成功跳转
                                        this.$router.replace({
                                            path: `/pages/payment-success?code=${orderId}`
                                        })
                                    }
                                    // 清空购物车
                                    this.removeSelectedFoods()
                                    clearTimeout(timer)
                                }, 1000)
                                return
                            }

                            wx.requestPayment({
                                timeStamp: result.data.timeStamp,
                                nonceStr: result.data.nonceStr,
                                package: result.data.package,
                                signType: result.data.signType,
                                paySign: result.data.paySign,
                                success: res => {
                                    let orderId = result.data.orderId
                                    this.$router.replace({
                                        path: `/pages/payment-success?code=${orderId}`
                                    })
                                    setTimeout(() => {
                                        // 产生订单后清空购物车
                                        this.removeSelectedFoods()
                                    }, 300)
                                },
                                fail: () => {
                                    this.$refs.toptips.showToptips({
                                        content: '支付失败, 请在我的订单中重新支付',
                                        timer: 1500
                                    })
                                    // 提示结束后跳转回上一页
                                    let timer = setTimeout(() => {
                                        this.$router.back()
                                        clearTimeout(timer)
                                        // 产生订单后清空购物车
                                        this.removeSelectedFoods()
                                    }, 1500)
                                }
                            })
                        } else {
                            this.$refs.toptips.showToptips({
                                content: result.data.message,
                                timer: 1000
                            })
                            this.isDialog = false
                            // 提示结束后跳转回上一页
                            let timer = setTimeout(() => {
                                this.$router.back()
                                clearTimeout(timer)
                                // 产生订单后清空购物车
                                this.removeSelectedFoods()
                            }, 1000)
                        }
                    })
                    .catch(err => {})
            }
        },
        openAddress() {
            wx.chooseAddress({
                success: res => {
                    this.userName = res.userName
                    this.userTel = res.telNumber
                    this.userAddress = `${res.provinceName}${res.cityName}${res.countyName}${
                        res.detailInfo
                    }`
                }
            })
        },
        openDate() {
            this.reserveDateBoxStatus = true
        },
        dateChange(e) {
            // 日期
            this.selectedReserveDate = e.mp.detail.value
        },
        confimDate() {
            this.reserveDate = this.selectedReserveDate
                .map((item, index) => {
                    if (index === 0) return this.years[item]
                    else if (index === 1) return this.months[item]
                    if (index === 2) return this.days[item]
                })
                .join('-')
            this.reserveDateBoxStatus = false
        },
        cancelDate() {
            this.reserveDateBoxStatus = false
        },
        openTime() {
            this.reserveTimeBoxStatus = true
        },
        timeChange(e) {
            // 日期
            this.selectedReserveTime = e.mp.detail.value
        },
        confimTime() {
            this.reserveTime = this.selectedReserveTime
                .map((item, index) => {
                    if (index === 0) return this.hours[item]
                    else if (index === 1) return ':'
                    else if (index === 2) return this.minutes[item]
                })
                .join('')
            this.reserveTimeBoxStatus = false
        },
        cancelTime() {
            this.reserveTimeBoxStatus = false
        },
        openPeople() {
            this.reservePeopleBoxStatus = true
        },
        peopleChange(e) {
            this.selectedReservePeople = e.mp.detail.value
        },
        cancelPeople() {
            this.reservePeopleBoxStatus = false
        },
        confimPeople() {
            this.people = this.peopleNumbers[this.selectedReservePeople[0]]
            this.reservePeopleBoxStatus = false
        },
        openTel() {
            this.reserveTelBoxStatus = true
        },
        confimTel() {
            let phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
            if (phoneReg.test(this.tel)) {
                this.mobile = this.tel
                this.reserveTelBoxStatus = false
            } else {
                this.$refs.toptips.showToptips({
                    content: '手机号错误',
                    timer: 1500
                })
            }
        },
        cancelTel() {
            this.reserveTelBoxStatus = false
        },
        openName() {
            this.reserveNameBoxStatus = true
        },
        confimName() {
            this.reserveUsername = this.inputUsername
            this.reserveNameBoxStatus = false
        },
        cancelName() {
            this.reserveNameBoxStatus = false
        }
    },
    mounted() {
        // 设置预定时间限制
        // let currentTime = +moment().format('X')
        // let endTime = +moment()
        //     .add(7, 'days')
        //     .format('X')
        // let Y = [],
        //     M = [],
        //     D = []

        // while (currentTime <= endTime) {
        //     let thatTime = moment(currentTime * 1000)

        //     Y.push(thatTime.format('YYYY'))
        //     M.push(thatTime.format('MM'))
        //     D.push(thatTime.format('DD'))

        //     currentTime += 86400
        // }

        // this.years = [...new Set(Y)]
        // this.months = [...new Set(M)]
        // this.days = [...new Set(D)]

        // // 初始化预定时间
        // this.reserveDate = moment().format('YYYY-MM-DD')

        // // 初始化就餐方式
        // this.dinerType = wx.getStorageSync('dinerType')

        // // 设置小时数
        // for (let i = 0; i < 24; i++) {
        //     this.hours.push(i < 10 ? `0${i}` : `${i}`)
        // }

        // // 设置分钟数
        // for (let i = 0; i < 60; i++) {
        //     this.minutes.push(i < 10 ? `0${i}` : `${i}`)
        // }

        // // 初始化预定时间
        // this.selectedReserveTime = [moment().hour(), 0, moment().minute()]
        // this.reserveTime = this.selectedReserveTime
        //     .map((item, index) => {
        //         if (index === 0) return this.hours[item]
        //         else if (index === 1) return ':'
        //         else if (index === 2) return this.minutes[item]
        //     })
        //     .join('')

        // // 设置人数
        // for (let i = 1; i < 100; i++) {
        //     this.peopleNumbers.push(i)
        // }

        // // 设置外卖送达时间
        // this.bookTime = moment()
        //     .add(this.outFoodTime, 'minute')
        //     .format('HH : mm')

        this.ext = wx.getStorageSync('ext')

        // 获取商家信息
        getRestaurants().then(res => {
            this.givePrice = res.data[0].delivery_price
            this.sellerName = res.data[0].name
            this.reserve = Number(res.data[0].reserve)
            // this.reserve = 0
            // console.log(this.reserve)
        })

        // 获取桌号
        this.tablesId = wx.getStorageSync('tablesId')

        // 获取会员卡余额
        getVipCard().then(res => {
            this.user_info_id = res.data.user_info_id
            this.balance = res.data.balance
        })

        // 商家是否支持会员卡
        this.vipIsOpen = wx.getStorageSync('vipIsOpen')

        this.restaurantId = wx.getStorageSync('restaurant').id
        console.log(this.restaurantId)
    },
    onShow() {
        getVipCard().then(res => {
            this.user_info_id = res.data.user_info_id
            this.balance = res.data.balance
        })
    },
    onShareAppMessage() {}
}
</script>

