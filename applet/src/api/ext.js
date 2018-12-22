
export default class Extjson {
    constructor(){
        if (wx.getExtConfigSync) {
            const extConfig = wx.getExtConfigSync()
            // this.flag = this.getFlag(extConfig)
            this.api_host = extConfig.api_host
            this.img_host = extConfig.img_host
            this.config_id = extConfig.config_id
            this.merchant_id = extConfig.merchant_id
            console.log(extConfig)
            // 获取轮播图数据
            // this.swiper = this.getSwiper(extConfig)
            // 获取menu数据
            // this.menu = this.getMenu(extConfig)
            // 获取⭕️圆形导航
            // this.menuCard = extConfig.menu_card
            // this.menuCardDisplay = extConfig.menu_card_display
            // this.router = extConfig.router
            this.openid = wx.getStorageSync('openid')
            // this.coupon = extConfig.discounts
            // // this.menuDisplay = extConfig.menu_display
            // this.banner = extConfig.banner
            // this.photos = extConfig.photos
            // this.ext = extConfig.ext
            // this.goodsConfig = extConfig.goods_config
            // // 获取酒店背景图片
            // this.hotelBg = extConfig.hotel_bg
        }
    }
    // getMenu(extConfig){
    //     if (extConfig){
    //         return extConfig.menu.map((item) => {
    //             let url = item.page.split('?')
    //             let obj
    //             if (url[1]) {
    //                 obj = {}
    //                 let key = url[1].split('=')[0]
    //                 let val = url[1].split('=')[1]
    //                 obj[key] = val
    //             }
    //             return {
    //                 imgUrl: item.icon.indexOf('http') != -1 ? item.icon : `${this.img_host}${item.icon}`,
    //                 navText: item.name,
    //                 navTo: url[0],
    //                 query: obj
    //             }
    //         })
    //     }else {
    //         return []
    //     }
    // }
    // getSwiper(extConfig){
    //     return {
    //         display: extConfig.swiper.display,
    //         dots: extConfig.swiper.display,
    //         dotsColor: extConfig.swiper.dotsColor,
    //         dotsActiveColor: extConfig.swiper.dotsActiveColor,
    //         maskStatus: extConfig.swiper.maskStatus,
    //         autoplay: extConfig.swiper.autoplay,
    //         loop: extConfig.swiper.loop,
    //         interval: extConfig.swiper.interval,
    //         duration: extConfig.swiper.duration,
    //         items: extConfig.swiper.list.map(item => {
    //             return {
    //                 link: item.page,
    //                 imgUrl: item.link,
    //                 maskText: item.name
    //             }
    //         })
    //     }
    // }
    // getFlag(extConfig){
    //     return {
    //         display: extConfig.flag_display,
    //         data: extConfig.flag
    //     }
    // }
}
