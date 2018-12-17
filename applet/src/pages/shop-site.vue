<template>
    <div class="wrap-shop-site">
        <!--<div class="site-header" @click="toGPS">-->
            <!--<div class="header-left" >-->
                <!--<div><wk-icon type="dingwei" size="32" color="#666666"></wk-icon></div>-->
                <!--<div class="left-r" v-if="amapInstance">{{ amapInstance }}</div>-->
                <!--<div class="let-r" v-else>地址定位失败</div>-->
            <!--</div>-->
            <!--&lt;!&ndash; <div class="header-right">按照距离排序</div> &ndash;&gt;-->
        <!--</div>-->
        <div class="site-content">
            <div class="content-choice" v-for="item in newSites" :key="index" >
                <div v-show="item.state == true"><wk-icon type="duihao2" size="32" color="#D0021B"></wk-icon></div>
                <div v-show="item.state !== true"><wk-icon type="yuanquanweixuanfuben" size="32" ></wk-icon></div>
                <div class="choice-r" @click="toRestaurants(index)">

                    <div class="r-top">
                        <div :class="{textColor: item.state == true}">{{ item.name }}</div>
                        <div class="dis" v-if="item.distance">距离您{{ item.distance }}千米</div>
                        <div class="dis" v-else></div>
                    </div>
                    <div :class="{textColor: item.state == true}">{{ item.address }}</div>
                </div>
            </div>

        </div>
        <div v-if="hpName != null" class="site-footer" @click="goProDetail">
            <div class="menu">查看详情</div>
        </div>
        <div v-else class="site-footer" @click="goRestaurants(restaurantId)">
            <div class="menu" >进入店铺</div>
        </div>
    </div>

</template>

<script>
import wkIcon from '../components/icon/icon'
import { getRestaurants, getFoods } from '@/api'
import QQMapWX from '../assets/qqmap-wx-jssdk.js'
export default {
    name: 'shop-site',
    components: {
        wkIcon
    },
    data() {
        return {
            sites: [],
            newSites: [],  //定义新的数组装载获取到的新的数据

            //获取你地址的数组
            address: null,
            sites: [],      // 店铺列表
            newSites: [],   // 计算距离之后的店铺列表
            restaurantId: 0,  // 店铺ID
            ext: null,
            hpName:null, //接收精品id
            amapInstance: ''
        }
    },
    computed: {
        // newSitesSort() {
        //     return _.sortBy(this.newSites, function(item) {
        //                 return item.distance;
        //            });
        // }
    },
    methods: {
        toGPS() {
            this.$router.push({ path: '/pages/map' })
        },
        toRestaurants(index) {
            this.newSites.forEach(i => {
                i.state = false
            })

            this.newSites[index].state = true
            this.restaurantId = this.newSites[index].id

            wx.setStorageSync('restaurant', this.newSites[index])
        },
        goRestaurants(id) {
            this.$router.push({ path: `/pages/foods?restaurantId=${id}` })
        },
        goProDetail() {
            this.$router.push({path: '/pages/product-detail', query:{name: this.hpName, choiceness: 1}})
        },

        //获取门店的位置
        getShopSite() {
            wx.showLoading({
                title:'加载中...'
            })
            getRestaurants().then(res => {
                new Promise((resolve, reject) => {
                    console.log('门店的位置', res.data)
                    if (res.success == true) {
                        let data = res.data
                        this.sites = data.map(item => {
                            return {
                                id: item.id,
                                address: item.address,
                                name: item.name,
                                shopLati: item.coordinates.split(',')[1],//纬度
                                shopLongi: item.coordinates.split(',')[0],//经度
                                notice: item.notice,
                                phone: item.phone,
                                logo: `${this.ext.img_host}${item.logo}`,
                                distance: 0
                            }
                        })
                    }
                    resolve()
                }).then(this.getMeSite())
            })
        },
        //获取我的定位位置
        getMeSite() {
            wx.getLocation({
                type: 'wgs84', //返回可以用于wx.openLocation的经纬度
                success: res => {
                    const latitude = res.latitude   //纬度
                    const longitude = res.longitude //经度
                    console.log('我的定位位置', latitude,longitude)


                    // 实例化API核心类
                    var demo = new QQMapWX({
                        key: '3KDBZ-XVEWV-G6KPZ-UWA6A-WN5T2-HMBLE' // 必填
                    });
                    // 调用接口
                    demo.reverseGeocoder({
                        location: {
                            latitude: latitude,
                            longitude: longitude
                        },
                        success: (res) => {
                            console.log(res.result.address);
                            this.amapInstance = res.result.address

                        },
                        // fail: function(res) {
                        //     console.log(res);
                        // },
                        // complete: function(res) {
                        //     console.log(res);
                        // }
                    });

                    // //发送请求通过经纬度反查地址信息
                    // var getAddressUrl = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + res.latitude + "," + res.longitude + "&key=3KDBZ-XVEWV-G6KPZ-UWA6A-WN5T2-HMBLE&get_poi=1";
                    // common.Request(getAddressUrl, "get", "", function (ops) {
                    //     console.log(JSON.stringify(ops));
                    // })

                    //计算店铺和我的位置的距离,从新复制到一个新的数组中
                    this.newSites.push(
                        ...this.sites.map(i => {
                            let radLat1 = latitude
                            let radLat2 = i.shopLati
                            let a = radLat1 - radLat2
                            let b = longitude - i.shopLongi
                            let s =
                                2 *
                                Math.asin(
                                    Math.sqrt(
                                        Math.pow(Math.sin(a / 2), 2) +
                                            Math.cos(radLat1) *
                                                Math.cos(radLat2) *
                                                Math.pow(Math.sin(b / 2), 2)
                                    )
                                )
                            s = s * 6378.137
                            s = Math.round(s * 10000) / 10000
                            s = (s * Math.PI) / 180.0
                            s = s.toFixed(1)
                            return {...i , distance: s, state: false}
                            //return Object.assign({ distance: s, state: false }, i)

                        })

                    )
                    //根据计算的地址距离进行排序
                    // for (let i = 0; i < this.newSites.length; i++) {
                    //     for (let j = i + 1; j < this.newSites.length; j++) {
                    //         if (this.newSites[i].distance > this.newSites[j].distance) {
                    //             var tmp = this.newSites[i]
                    //             this.newSites[i] = this.newSites[j]
                    //             this.newSites[j] = tmp
                    //         }
                    //     }
                    // }

                    //根据距离给数组中的对象进行排序
                    this.newSites.sort((a,b) => a.distance - b.distance);

                    //设置默认你的第一个地址的样式状态为选中状态
                    this.newSites[0].state = true
                    this.restaurantId = this.newSites[0].id
                    wx.setStorageSync('restaurant', this.newSites[0])

                },
                fail: res => {
                    console.log(res)
                    //计算店铺和我的位置的距离,从新复制到一个新的数组中
                    this.newSites.push(
                        ...this.sites.map(i => {
                            // let radLat1 = latitude
                            // let radLat2 = i.shopLati
                            // let a = radLat1 - radLat2
                            // let b = longitude - i.shopLongi
                            // let s =
                            //     2 *
                            //     Math.asin(
                            //         Math.sqrt(
                            //             Math.pow(Math.sin(a / 2), 2) +
                            //             Math.cos(radLat1) *
                            //             Math.cos(radLat2) *
                            //             Math.pow(Math.sin(b / 2), 2)
                            //         )
                            //     )
                            // s = s * 6378.137
                            // s = Math.round(s * 10000) / 10000
                            // s = (s * Math.PI) / 180.0
                            // s = s.toFixed(1)
                            return {...i , state: false}
                            //return Object.assign({ distance: s, state: false }, i)

                        })

                    )

                    //根据距离给数组中的对象进行排序
                    //this.newSites.sort((a,b) => a.distance - b.distance);

                    //设置默认你的第一个地址的样式状态为选中状态
                    this.newSites[0].state = true
                    this.restaurantId = this.newSites[0].id
                    wx.setStorageSync('restaurant', this.newSites[0])
                }


            })
            wx.hideLoading()
        },

    },
    mounted() {
        Object.assign(this, this.$options.data()) // 清空当前页面数据
        this.ext = wx.getStorageSync('ext')
        this.getShopSite()
        this.hpName = this.$route.query.name  //接收精品商品的name
    },
    onShow() {
        wx.removeStorageSync('remark')
    },
    // onload() {
    //
    // },
    // onshow() {
    //     // this.restaurantId = this.newSites[0].id
    //
    // },
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
.wrap-shop-site {
    width: 100%;

    .site-header {
        width: 100%;
        height: 100rpx;
        background-color: white;
        padding: 0 30rpx;
        box-sizing: border-box;
        border-bottom: 20rpx solid #f2f2f2;
        color: #666666;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .header-left {
            display: flex;
            align-items: center;

            .left-r {
                margin-left: 10rpx;
            }
        }
    }

    .site-content {
        width: 100%;
        background-color: white;

        .content-choice {
            width: 100%;
            padding: 20rpx 30rpx;
            box-sizing: border-box;
            border-bottom: 1rpx solid #f2f2f2;
            display: flex;
            align-items: center;

            .choice-r {
                flex: 1;
                margin-left: 10rpx;
                font-size: 28rpx;
                color: #A0A0A0;

                .r-top {
                    display: flex;
                    justify-content: space-between;

                    .dis {
                        font-size: 24rpx;
                    }
                }

                .textColor {
                    color: #D0021B;
                }

                .normal {
                    color: #A0A0A0;
                }
            }
        }
    }

    .site-footer {
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;

        .menu {
            width: 100%;
            height: 100rpx;
            background-color: #F5A623;
            line-height: 100rpx;
            text-align: center;
            font-size: 32rpx;
            color: white;
        }
    }
}
</style>
