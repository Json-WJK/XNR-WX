
<style lang="scss">
.map {
    &_wrap {
        map {
            width: 100%;
            height: calc(100vh - 180rpx);
        }
    }

    &_msg {
        height: 180rpx;
        padding: 0 12rpx;
        line-height: 2;
        display: flex;
        align-items: center;
    }
    &_title,
    &_desc {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    &_title {
        font-size: 36rpx;
        color: #f39800;
    }
    &_desc {
        font-size: 28rpx;
        color: #666;
    }
    &_cont {
        width: 100%;
    }
}
</style>

<template>
    
    <div class="map_wrap">
        <map id="map"
            :longitude="longitude"
            :latitude="latitude"
            :scale="scale"
            :markers="markers"
            :polyline="polyline"
            show-location
        >
        </map>
        <div class="map_msg">
            <div class="map_cont">
                <div class="map_title" @tap="goLocation">
                    {{mapTitle}}
                </div>
                <div class="map_desc" @tap="goLocation">
                    {{mapDesc}}
                </div>
            </div>
        </div>
    </div>

</template>

<script>
// import { getMerchant } from '@/api'
import coordtransform from 'coordtransform' //将百度坐标转换腾讯坐标
const amapFile = require('../assets/amap-wx.js')
const gdKey = '0d21957cfedcd7d8a8d173fcc2ecc6e5'

export default {
    data() {
        return {
            longitude: 0,
            latitude: 0,
            mapTitle: '',
            mapDesc: '',
            amapInstance: null,
            markers: [],
            polyline: [],
            ridesList: [],
            scale: 16,
            // 目标地点 经纬度
            addresCoord: '',
            // 当前经纬度
            currentLongitude: '',
            currentLatitude: '',
            currentRestaurant: null
        }
    },
    mounted() {
        this.mapInitSDK()
        this.currentRestaurant = wx.getStorageSync('restaurant')
        this.mapTitle = this.currentRestaurant.name
        console.log(this.currentRestaurant);
        
        this.mapDesc = this.currentRestaurant.address
        console.log(this.mapDesc);
        
        let gcj = coordtransform.bd09togcj02(
            this.currentRestaurant.shopLongi,
            this.currentRestaurant.shopLati
        )

        this.markers = [
            {
                id: 1,
                latitude: gcj[1],
                longitude: gcj[2],
                title: this.currentRestaurant.name,
                iconPath: '/static/img/marker.png',
                width: 30,
                height: 30,
                callout: {
                    content: this.currentRestaurant.name,
                    color: '#ffffff',
                    fontSize: 12,
                    borderRadius: 10,
                    bgColor: '#1dd388',
                    padding: 5,
                    display: 'ALWAYS'
                }
            }
        ]

        wx.getLocation({
            altitude: false,
            type: 'gcj02',
            success: coord => {
                this.latitude = coord.latitude
                this.longitude = coord.longitude
                this.addresCoord = [this.currentRestaurant.shopLongi,this.currentRestaurant.shopLati]
                this.drawDrivingRoute()
            }
        })
    },
    methods: {
        goLocation() {
            let data = this.currentRestaurant
            let log = +data.shopLongi
            let lat = +data.shopLati
            let gcj = coordtransform.bd09togcj02(log, lat) //百度经纬度坐标转国测局坐标
            wx.openLocation({
                latitude: gcj[1],
                longitude: gcj[0],
                name: data.name,
                address: data.address
            })
        },
        // 生成高德地图对象
        async mapInitSDK() {
            this.amapInstance = new amapFile.AMapWX({ key: gdKey })
        },
        // 绘制路线
        drawDrivingRoute() {
            let log = this.addresCoord[0]
            let lat = this.addresCoord[1]

            this.amapInstance.getWalkingRoute({
                origin: `${this.longitude},${this.latitude}`,
                destination: coordtransform.bd09togcj02(log, lat).join(','),
                success: data => {
                    const duration = data.paths[0].duration
                    const temp = {
                        duration: duration,
                        end_jin: this.disLongitude,
                        end_wei: this.disLatitude
                    }

                    this.getRidesList(data.paths[0].steps)
                    let points = []
                    if (data.paths && data.paths[0] && data.paths[0].steps) {
                        const rides = data.paths[0].steps
                        rides.forEach((item, i) => {
                            const poLen = rides[i].polyline.split(';')
                            poLen.forEach((jtem, j) => {
                                points.push({
                                    longitude: parseFloat(poLen[j].split(',')[0]),
                                    latitude: parseFloat(poLen[j].split(',')[1])
                                })
                            })
                        })
                    }
                    this.polyline = []
                    if (points.length > 300) {
                        let firstPoints = points.slice(0, 300)
                        let lastPoints = points.pop()
                        console.log(lastPoints)
                        points = firstPoints.concat(lastPoints)
                        console.log(points)
                    }

                    this.polyline = [
                        {
                            points: points,
                            color: '#f39800',
                            width: 6
                        }
                    ]
                }
            })
        },
        // 获取骑行路线
        getRidesList(list) {
            this.ridesList = []
            list.forEach(({ instruction }) => {
                this.ridesList.push(instruction)
            })
        }
    }
}
</script>
