
<style lang="scss">
.take_foods_code_wrap {
    padding: 90px 0;
}
.take_foods_code {
    width: 100px;
    height: 100px;
    margin: auto;
    border-radius: 50%;
    background: #059bfe
        linear-gradient(60deg, rgba(255, 255, 255, 0.3), transparent);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-shadow: 2px 2px 10px 2px #cbdde9;
    .code_tit {
        font-size: 15px;
    }
    .code {
        font-size: 30px;
    }
}
.button_wrap {
    button {
        width: 200px;
        height: 49px;
        line-height: 49px;
        color: #fff;
        margin-bottom: 20px;
        box-shadow: 0 0 10px 2px #e8e8e8;
        &:after {
            content: '';
            border: 0;
        }
        &:first-child {
            background-image: linear-gradient(to right, #2ca7f9, #09f);
        }
        &:last-child {
            background-image: linear-gradient(to right, #f37a4d, #ec5e2a);
        }
    }
}
</style>

<template>
    
    <div class="payment_wrap">

        <div class="take_foods_code_wrap">
            <div class="take_foods_code" v-if="takeCode && dinerType!='1'">
                <div>
                    <div class="code_tit">取餐码</div>
                    <div class="code">{{takeCode}}号</div>
                </div>
            </div>
        </div>

        <div class="button_wrap">
            <button @click="goBack">继续购物</button>
            <button @click="goOrderDetail">查看订单</button>
        </div>

        <wk-loading ref="loading"></wk-loading>
    </div>

</template>

<script>
import { getOrderInfo } from '@/api'
import wkLoading from '@c/loading'

export default {
    components: {
        wkLoading
    },
    data() {
        return {
            takeCode: 0,
            orderId: 0,
            dinerType: 1
        }
    },
    methods: {
        goBack() {
            this.$router.push({
                path: `/pages/index`,
                isTab: true
            })
        },
        goOrderDetail() {
            this.$router.push({
                path: `/pages/order-detail?id=${this.orderId}`
            })
        }
    },
    mounted() {
        this.orderId = this.$route.query.code
        if (!this.orderId) return
        getOrderInfo(this.orderId)
            .then(result => {
                this.dinerType = result.data.delivery
                this.takeCode = result.data.no
                // this.dinerType = 2
                // this.takeCode = 11
                // console.log(this.takeCode);
                this.$refs.loading.hide()
            })
            .catch(err => {
                console.log(err)
            })
        if (wx.getStorageSync('tablesId')) {
            wx.removeStorageSync('tablesId')
        }
    },
    onShareAppMessage() {}
}
</script>
