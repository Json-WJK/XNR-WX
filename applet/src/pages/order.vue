
<style lang="scss">
page {
    background: #f5f5f5;
}

.order {
    &_tabbar {
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 99;
        background: #fff;
    }
    &_wrap {
        padding-top: 35px;
        padding-bottom: 20px;
    }
    &_list {
        padding: 0 15px;
        &_item {
            padding-top: 20px;
            .order-header{
                width: 100%;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #eee;
                .item_title {
                    line-height: 25px;
                    color: #333;
                    font-size: 12px;
                    padding-top: 8px;
                }
                .item_time{
                    padding-top: 8px;
                    line-height: 25px;
                    color: #e31436;
                }
            }
        }
        &_foods {
            padding: 0 14px;
            background: #fff;
            border-radius: 6px;
            .order_status_title {
                display: flex;
                justify-content: space-between;
                line-height: 18px;
                padding: 15px 0;
                span:first-child {
                    color: #333;
                    font-size: 18px;
                }
                span:last-child {
                    color: #7998a4;
                    font-size: 12px;
                    vertical-align: text-bottom;
                }
            }
            .order_list_foods_item {
                display: flex;
                padding: 10px 0;
                .foods_info {
                    flex: 1;
                    padding-left: 12px;
                    .title {
                        display: flex;
                        justify-content: space-between;
                        color: #333;
                        font-size: 14px;
                        margin-bottom: 6px;
                    }
                    .number {
                        font-size: 12px;
                        color: #999;
                        text-align: right;
                    }
                }
                .order_icon {
                    width: 55px;
                    height: 55px;
                    background: {
                        size: cover;
                        repeat: no-repeat;
                        position: center center;
                    }
                }
            }
            .order_total_price {
                height: 56px;
                line-height: 56px;
                font-size: 12px;
                border-top: 1px solid #eee;
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .price {
                    color: #e31436;
                }
                .pay_btn {
                    width: 80px;
                    height: 32px;
                    line-height: 32px;
                    padding: 0;
                    font-size: 14px;
                    color: #fff;
                    background: linear-gradient(to right, #fa3e5d, #e31436);
                    &:after {
                        content: '';
                        border: 0;
                    }
                }
            }
        }
    }
}
</style>

<template>

    <div class="order_wrap">

        <div class="order_tabbar">
            <wk-navbar
            :defaultIndex="defaultIndex"
            :labelData="labelData"
            :border="false"
            :selectedColor=" '#F5A623' "
            @tabchange="tabchange"></wk-navbar>
        </div>

        <div class="order_list" v-if="loadingStatus && !abnorType">
            <div
                class="order_list_item"
                v-for="(item, index) in ordersList"
                :key="index"
                @click="toOrderDetail(item.orderId)"
            >

                <div class="order_list_foods">
                    <div class="order-header">
                        <div class="item_title" @click="gogogo">
                            订单编号: {{item.orderId}}
                        </div>
                        <div class="item_time" v-if="item.orderStatus === '未支付'">
                            <zk-time-down :endTime=item.endTime></zk-time-down>
                        </div>
                    </div>
                    <!-- 外卖预订 -->
                    <!-- <div class="order_status_title">
                        <span>{{dinerTypeText[item.type]}}</span>
                        <span>{{item.orderStatus}}</span>
                    </div> -->
                    <div class="order_list_foods_item" v-for="(foods, key) in item.foodsList" :key="key">
                        <div class="order_icon" :style="{ 'background-image': 'url(' + foods.icon + ')'}"></div>
                        <div class="foods_info">
                            <div class="title">
                                <div>{{foods.name}}</div>
                                <div>
                                    <wk-price :value="foods.price" :icon=" 'sub' "></wk-price>
                                </div>
                            </div>
                            <div class="number">x{{foods.number}}</div>
                        </div>
                    </div>
                    <div class="order_total_price">
                        <div>
                            应付金额: <wk-price :value="item.totalPrice"></wk-price>
                        </div>
                        <div @click.stop="cancelOrderBtn(item.orderId,1)" v-if="item.orderStatus === '未支付'">
                            取消订单
                        </div>
                        <div @click.stop="cancelOrderBtn(item.orderId,2)" v-if="item.orderStatus === '待接单'|| item.orderStatus ==='待配送'||item.orderStatus ==='待收货'||item.orderStatus ==='正常'">
                            取消订单
                        </div>
                        <div v-if="item.orderStatus === '未支付'">
                            <button class="pay_btn" @click.stop="paymentAgain(item.orderId)">去付款</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="loadingStatus && abnorType">
            <wk-abnor :type="abnorType"></wk-abnor>
        </div>

        <wk-toptips ref="toptips"></wk-toptips>

        <wk-loading ref="loading"></wk-loading>

        <wk-dialog-pay :show=isDialog :title=dialogTitle
					:buttons=buttons :buttonMode=buttonMode
                    :balance=balance :balanceNo=balanceNo
                    @dialogpayClick=dialogpayClick @topUp=topUp>
        </wk-dialog-pay>
        <tab-ber name="tab1"></tab-ber>
    </div>
</template>

<script>
import tabBer from '../components/tabBer/tabBer.vue'
import { getOrderList, payment, getVipCard, getOrderInfo, cancelOrder, getExtJson } from '@/api'
import wkNavbar from '@c/navbar'
import wkPrice from '@c/price'
import wkToptips from '@c/toptips'
import wkAbnor from '@c/abnor'
import wkLoading from '@c/loading'
import wkDialogPay from '@c/dialog-pay'
import wkCountDown from '@c/count-down'
// import CountDown from '@/assets/count-down'
import CountDown from 'vue2-countdown'
import zkTimeDown from '../components/zkTimeDown/zkTimeDown'

export default {
    components: {
        wkNavbar,
        wkPrice,
        wkToptips,
        wkAbnor,
        wkLoading,
        wkDialogPay,
        wkCountDown,
        CountDown,
        zkTimeDown,
        tabBer
    },
    data() {
        return {
            labelData: [
                {
                    title: '未付款'
                },
                {
                    title: '未确认'
                },
                {
                    title: '已确认'
                },
                {
                    title: '全部订单'
                }
            ],
            filter: ['未支付', '待接单,待配送,待收货,正常', '已完成,已取消', ''],
            // dinerTypeText: ['堂食', '外卖', '预定'],
            ordersList: [],
            ext: null,
            tabbarIndex: NaN,
            loadingStatus: false,
            requestStatus: 200,
            defaultIndex: '',
            id: 0,    // 订单ID
            pay_method: null,
            user_info_id: '',
            isDialog: false, //模态是否显示
            dialogTitle: '支付方式',
            buttonMode: 'col',
            balance: '',
            balanceNo: false,
            restaurant_phone: '', // 当前商家电话
            countDown: 1800,
            flagTime: null,
        }
    },
    computed: {
        abnorType() {
            // 0	网络错误
            // 1	请求超时
            // 2	文件下载成功，但保存失败，此错误只出现node环境下
            // >=200	http请求状态码
            console.log(this.requestStatus)
            if (this.requestStatus === 0 || this.requestStatus === 1) {
                return 'REQUEST_ERROR'
            } else if (this.requestStatus === 404) {
                return 'DATA'
            }
            return ''
        }
    },
    methods: {
        //倒计时结束取消订单
        countDownTime(id, status) {

            if (status == 1) {
                // 未支付
                //let that = this
                cancelOrder(id).then(res => {
                    if (res.success) {
                        // 更新未支付订单
                        this.ordersList.length = 0
                        this.getOrders()
                    }
                })
            }

            // this.ordersList.forEach((i) => {
            //     this.nowTime = new Date();
            //     console.log(this.newTime)
            // })
            //const endTime = new Date(this.endTime)

            //let leftTime = parseInt((endTime.getTime()-nowTime.getTime())/1000)
            // if(leftTime <= 0){
            //     cancelOrder(id).then(res => {
            //         if (res.success) {
            //             // 更新未支付订单
            //             this.ordersList.length = 0
            //             this.getOrders()
            //         }
            //     })
            // }
        },

        countDownE_cb(e) {
            console.log(e)
            cancelOrder(e).then(res => {
                console.log(res)
            })
        },
        countDownS_cb(e) {
            console.log(e)
        },
        tabchange(e) {
            this.tabbarIndex = e.index
            this.ordersList.length = 0
            this.getOrders()
        },
        toOrderDetail(id) {
            this.$router.push({
                path: `/pages/order-detail?id=${id}`
            })
        },
        cancelOrderBtn(id, status) {
            if (status == 1) {
                // 未支付
                let that = this
                wx.showModal({
                    title: '确定要取消订单吗?',
                    success: function(res) {
                        if (res.confirm) {
                            //console.log('用户点击确定')
                            cancelOrder(id).then(res => {
                                if (res.success) {
                                    // 更新未支付订单
                                    that.ordersList.length = 0
                                    that.getOrders()
                                }
                            })
                        } else if (res.cancel) {
                            //console.log('用户点击取消')
                        }

                    },
                    fail: function(res) {
                        console.log(res)
                    }
                })
            } else if (status == 2) {
                // 未确认
                getOrderInfo(id).then(res => {
                    new Promise((resolve, reject) => {
                        this.restaurant_phone = res.data.restaurant_phone
                        resolve(this.restaurant_phone)
                    }).then(phone => {
                        console.log(phone)

                        wx.showModal({
                            title: '如需取消，请联系商家',
                            content: phone,
                            confirmText: '呼叫',

                            success: function(res) {
                                if (res.confirm) {
                                    wx.makePhoneCall({
                                        phoneNumber: phone,
                                        success: function() {
                                            console.log('拨打电话成功！')
                                        },
                                        fail: function() {
                                            console.log('拨打电话失败！')
                                        }
                                    })
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            },
                            fail: function(res) {
                                console.log(res)
                            }
                        })
                    })
                })
            }
        },
        paymentAgain(id) {
            this.id = id
            if (this.vipIsOpen && this.user_info_id) {
                this.isDialog = true
                getOrderInfo(id).then(res => {
                    this.restaurant_id = res.data.restaurant_id
                    wx.setStorageSync('currentOrder', res.data)
                    this.balance < res.amount ? (this.balanceNo = true) : (this.balanceNo = false)
                })
            } else {
                payment({
                    id: this.id,
                    config_id: this.ext.config_id,
                    openid: this.ext.openid,
                    user_info_id: this.user_info_id,
                    restaurant_id: this.restaurant_id
                }).then(result => {
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
                        }, 1500)
                    }
                })
            }
        },
        dialogpayClick(e, option) {
            if (option.guid === 'wechat' && option.type !== 500) {
                // 微信支付
                this.pay_method = '微信'
            } else if (option.guid === 'huiyuanka' && option.type !== 500) {
                // 会员卡支付
                this.pay_method = '会员卡'
            } else {
                this.isDialog = false
                return
            }

            payment({
                id: this.id,
                config_id: this.ext.config_id,
                openid: this.ext.openid,
                user_info_id: this.user_info_id,
                restaurant_id: this.restaurant_id,
                pay_type: this.pay_method
            })
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
                            },
                            fail: () => {
                                this.$refs.toptips.showToptips({
                                    content: '支付失败, 请在我的订单中重新支付',
                                    timer: 1500
                                })
                            }
                        })
                    } else {
                        this.$refs.toptips.showToptips({
                            content: result.data.message,
                            timer: 1500
                        })
                        this.isDialog = false
                        // 提示结束后跳转回上一页
                        let timer = setTimeout(() => {
                            this.$router.back()
                            clearTimeout(timer)
                        }, 1500)
                    }
                })
                .catch(err => {})
        },
        getOrders() {
            getOrderList(this.filter[this.tabbarIndex])
                .then(result => {
                    this.$refs.loading.hide()
                    this.loadingStatus = true
                    if (!result.success || !result.data.items.length) {
                        this.requestStatus = 404
                        return
                    } else {
                        this.requestStatus = 200
                    }
                    console.log(result.data.items)

                    this.ordersList.push(
                        ...result.data.items.map(item => {
                            return {
                                orderId: item.id,
                                type: item.delivery,
                                orderStatus: item.status,
                                // createdTime: new Date().getTime() / 1000,
                                // endTime: item.created_at,
                                endTime: (new Date(item.created_at).getTime() + 1800000),
                                currentTime: new Date().getTime() / 1000,
                                startTime: new Date(item.created_at).getTime() / 1000,
                                foodsList: item.foods.map(foods => {
                                    return {
                                        icon:
                                            foods.image.indexOf('http') == -1
                                                ? `${this.ext.img_host}${foods.image}`
                                                : foods.image,
                                        name: foods.name,
                                        price: foods.price,
                                        number: foods.quanty
                                    }
                                }),
                                totalPrice: item.amount
                            }
                        })
                    )
                    console.log('获取的订单',this.ordersList)
                    //倒计时结束 自动取消未支付订单
                    this.ordersList.forEach((i) => {
                        console.log(i)
                        if(i.orderStatus === '未支付') {
                            const currentTime = new Date().getTime();
                            if(currentTime >= i.endTime) {
                                console.log(121221)
                                this.countDownTime(i.orderId, 1)
                            }
                        }

                    })
                })
                .catch(err => {
                    this.$refs.loading.hide()
                    this.loadingStatus = true
                    this.requestStatus = 1
                })
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
        }
    },
    mounted() {
        Object.assign(this, this.$options.data()) // 清空当前页面数据
        //this.countDownTime()//倒计时未支付订单
        this.ext = getExtJson()
        this.defaultIndex = Number(this.$mp.query.id) || 0
        this.getOrders()
        getVipCard().then(res => {
            this.balance = res.data.balance
            this.user_info_id = res.data.user_info_id
        })

        // getVipCard().then(res => {
        //     this.balance = res.data.balance
        //     this.user_info_id = res.data.user_info_id
        // })
        // 商家是否支持会员卡
        this.vipIsOpen = wx.getStorageSync('vipIsOpen')
    },
}
</script>
