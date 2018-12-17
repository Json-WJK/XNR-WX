
<script>
import { getOpenid, getVipCard, isLogin, getExtJson } from '@/api'
export default {
    created() {
        console.log('小程序启动了')
        let openid = wx.getStorageSync('openid')
        if (!openid) {
            wx.login({
                success(res) {
                    getOpenid(res.code).then(res => {
                        console.log(res, 333)
                        wx.setStorageSync('openid', res.data.openid)
                        let ext = getExtJson()
                        wx.setStorageSync('ext', ext)
                        getVipCard().then(res => {
                            if (res.success) {
                                wx.setStorageSync('vipIsOpen', true)
                                wx.setStorageSync('vipInfo', res.data)
                            } else {
                                wx.setStorageSync('vipIsOpen', false)
                            }
                        })
                        // 获取登录状态
                        isLogin().then(res => {
                            console.log('获取登录状态', res)
                            if (res.data) {
                                wx.setStorageSync('login', res.data)
                            }
                            //console.log('登陆之后给login从新赋值', this.login)
                        })
                        
                        // wx.setStorageSync('openid', 'o94Um0UVtnKuWRIgj-anBBypAqxs')
                    })
                }
            })
        }
    }
}
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">

page {
    background-color: #f2f2f2;
    font-size: 24rpx;
    color: #333333;
    box-sizing: border-box;
}
</style>
