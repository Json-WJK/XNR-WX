import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'
import store from '@/store'
//import QQMapWX from 'assets/qqmap-wx-jssdk.js'
Vue.use(MpvueRouterPatch)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()

export default {
    // 这个字段走 app.json
    config: {
        // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        "pages": [
            "pages/index",
        ],
        "window": {
            "backgroundTextStyle": "light",
            "navigationBarBackgroundColor": "#ffffff",
            "navigationBarTitleText": "奥特姆连锁餐厅",
            "navigationBarTextStyle": "black"
        },
        "tabBar": {
            "color": "#666666",
            "selectedColor": "#F5A623",
            "borderStyle": "black",
            "backgroundColor": "#ffffff",
            "list": [
                {
                    "pagePath": "pages/index",
                    "text": "首页",
                    "iconPath": "static/icon/index.png",
                    "selectedIconPath": "static/icon/index_c.png"
                },
                {
                    "pagePath": "pages/integral",
                    "text": "积分商城",
                    "iconPath": "static/icon/integral.png",
                    "selectedIconPath": "static/icon/integral_c.png"
                },
                {
                    "pagePath": "pages/order",
                    "text": "订单",
                    "iconPath": "static/icon/order.png",
                    "selectedIconPath": "static/icon/order_c.png"
                },
                {
                    "pagePath": "pages/member",
                    "text": "我的",
                    "iconPath": "static/icon/member.png",
                    "selectedIconPath": "static/icon/member_c.png"
                }
            ]
        }


    }
}
