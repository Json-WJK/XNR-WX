
<style lang="scss" scoped>
</style>

<template>
    <div>
        
    </div>
</template>

<script>
export default {
    mounted() {
        if (this.$mp.query.success) {
            wx.requestPayment({
                timeStamp: this.$mp.query.timeStamp,
                nonceStr: this.$mp.query.nonceStr,
                package: decodeURIComponent(this.$mp.query.package),
                signType: this.$mp.query.signType,
                paySign: this.$mp.query.paySign,
                success: res => {
                    wx.showToast({
                        title: '支付成功',
                        icon: 'success',
                        duration: 1500,
                        mask: true,
                        success: () => {
                            this.$store.commit('payStatus', true)
                            let timer = setTimeout(() => {
                                wx.navigateBack({
                                    delta: 1
                                })
                                clearTimeout(timer)
                            }, 1500)
                        }
                    })
                    
                },
                fail: err => {
                    this.$store.commit('payStatus', false)
                    wx.showToast({
                        title:
                            err.errMsg.indexOf('cancel') == -1
                                ? '支付失败'
                                : '取消支付',
                        icon: 'none',
                        duration: 1500,
                        mask: true,
                        success: () => {
                            let timer = setTimeout(() => {
                                wx.navigateBack({
                                    delta: 1
                                })
                                clearTimeout(timer)
                            }, 1500)
                        }
                    })
                }
            })
        } else {
            wx.showToast({
                title: this.$mp.query.message,
                icon: 'none',
                duration: 1500,
                mask: true
            })
            // wx.navigateBack({
            //     delta: 1,
            // })
        }
    }
}
</script>
