<template>
    <div class="wrap-product-detail">
        <div class="detail-show">
            <div class="show-carousel">
                <wk-viewpager :movies="movies"></wk-viewpager>
            </div>
            <div class="show-text">
                {{foods.name}}
            </div>
            <div class="show-spec">
                <div class="spec-l">
                    <span class="l-p">￥</span>
                    <span v-if="foods.is_multi_spec">{{computedPrice}}</span>
                    <span v-else>{{foods.price}}</span>

                </div>
                <div class="spec-r">已售{{foods.sales}}件</div>
            </div>
        </div>
        <div class="detail-type" @click="selectSpec(foods)" v-if="foods.is_multi_spec">
            <div class="type-left">
                <div class="left-one">选型</div>
                <div>{{ computedProps1 }}&nbsp</div>
                <div>{{ computedProps2 }}&nbsp</div>
                <div v-if="foods.number == 0">{{ foods.number+1 }}份</div>
                <div v-else>{{ foods.number }}份</div>
            </div>
            <div class="type-right"><img src="../../static/icon/omit.png" alt=""></div>
        </div>
        <div v-else class="detail-type">{{ foods.number+1 }}份</div>
        <div class="detail-recomm">
            <div class="show-header">详情</div>
            <div class="recomm-content">
                <!-- <img src="../../static/image/2.png" alt=""> -->
                <wx-parse  :content=" foods.details "></wx-parse>

            </div>
        </div>

        <div class="detail-btn">
            <div class="left" @click="toHome">
                <wk-icon type="iconhuidaoshouye" size="42" color="black"></wk-icon>
                <div>首页</div>
            </div>
            <div v-if="choiceness == 1"></div>
            <div v-else class="center"  @click="selectSpec(foods)">加入购物车</div>
            <div class="right" @click="buy">立即购买</div>
        </div>

        <my-detail-spec-choice
            ref="choice"
            :name="foodsDetails.name"
            :icon="specIcon"
            :stock="specStock"
            :spec="renderSku"
            :type=" cartType "
            :price=" specPrice "
            :number=" goodsNumber "
            @propstap="propstap"
            @btntap="btntap"
            @numberChange="numberChange"
        ></my-detail-spec-choice>

        <!-- 提示 -->
        <wk-toptips ref="toptips"></wk-toptips>
    </div>
</template>

<script>
import { getFoodsDetails, getExtJson, getCategories } from '@/api'
import TransformSku from '@/assets/transformSku'
import myDetailSpecChoice from '@c/detail-spec-choice'
import wkPrice from '@c/price'
import wkElip from '@c/elip'
import wkLine from '@c/line'
import wkTitle from '@c/title'
import wxParse from 'mpvue-wxparse'
import wkCounter from '@c/counter'
import wkIcon from '@c/icon'
import wkToptips from '@c/toptips'
import wkViewpager from '@c/viewpager'

import { mapState, mapActions } from 'vuex'

Array.prototype.myEvery = function() {
    // 自定义every函数解决every函数不回循环出undefined的问题
    let status
    for (let i = 0; i < this.length; i++) {
        if (!this[i]) {
            status = false
            break
        }
        status = true
    }
    return status
}

export default {
    components: {
        wkPrice,
        wkElip,
        wkLine,
        wkTitle,
        wxParse,
        wkCounter,
        wkIcon,
        wkToptips,
        myDetailSpecChoice,
        wkViewpager
    },
    data() {
        return {
            foods: {}, // 从接口返回的当前页食品数据
            ext: null,
            selectedSku: [],
            currentWindow: 0,
            tablesId: 0, //桌号
            restaurantId: 0, // 门店ID
            specIcon: '', // 规格图标
            specStock: '0',
            specPrice: '0',
            currentViewSku: {}, // 当前SKU
            cartType: 1, // 1加入购物车 2 立即购买
            renderSku: [],
            goodsNumber: 1,
            foodsDetails: {}, // 从foods到购物车之间的暂存数据
            skuCode: '',
            selfProps: '',
            foodsMsg: {
                // 从规格栏加入购物车食品数据
                selectedProps: ''
            },
            movies: [],// 轮播图
            choiceness: 0, //从精选过来的钩子
        }
    },
    computed: {
        ...mapState(['selectedFoods']),
        // 已选规格1
        computedProps1() {
            if (this.foodsMsg.selectedProps) {
                return this.foodsMsg.selectedProps.split(' ')[0]
            } else {
                return ''
            }
        },
        // 已选规格2
        computedProps2() {
            if (this.foodsMsg.selectedProps) {
                return this.foodsMsg.selectedProps.split(' ')[1]
            } else {
                return ''
            }
        },
        computedPrice() {
            if (this.foods.price) {
                return this.foods.price
            } else {
                return `${this.foods.min}-${this.foods.max}`
            }
        }
    },
    methods: {
        ...mapActions(['setSelectedFoods']),
        toHome() {
            this.$router.push({
                path: '/pages/index',
                isTab: true
            })
        },
        buy() {
            // 判断当前食品在不在购物车
            let currentFood = this.selectedFoods.find(item => {
                return item.id == this.foods.id
            })
            // 如果在购物车,用购物车数量,如果没有用1
            this.foods.number = (currentFood && currentFood.number) || 1

            if (this.foods.isMultiSpec && !(currentFood && currentFood.selectedProps)) {
                // 如果是多规格,在购物车的话直接买,不在的话跳选规格栏
                this.selectSpec(this.foods)
            } else {
                this.setSelectedFoods(this.foods)
                this.$router.push({
                    path: '/pages/payment-order'
                })
            }
        },
        numberChange(e) {
            // 规则选择的数量选择
            this.goodsNumber = e.number
        },
        selectSpec(item) {
            // this.setSelectedFoods(this.selectedFoods[index])
            // 多规格选择栏
            if (item.is_multi_spec) {
                this.currentViewSku = new TransformSku(item)
                this.renderSku = this.currentViewSku.$renderSku
                this.foodsDetails = item
                console.log(this.foodsDetails)
                this.specStock = this.foodsDetails.stockAll
                this.specPrice = this.foodsDetails.price
            } else {
                // 单规格选择栏数据
                this.foodsDetails = item
                this.specPrice = this.foodsDetails.price
                this.specStock = this.foodsDetails.stock
                this.specIcon = this.foodsDetails.icon
            }
            console.log(this.foodsDetails)

            this.$refs.choice.openChoice()
        },
        propstap(index, specIndex, itemName, specName) {
            console.log(index, specIndex, itemName, specName)

            // 规格选择的事件
            // 处理选中高亮 index表示行数索引 （每一个类型算一个行） specIndex 表示每一个的索引
            this.renderSku[index].item[specIndex].selected = true

            // 处理点击不同的按钮时取消原来的高亮
            if (this.selectedSku[index]) {
                let oldIndex = this.selectedSku[index].index
                let oldKey = this.selectedSku[index].specIndex
                if (oldKey !== specIndex) {
                    this.renderSku[oldIndex].item[oldKey].selected = false
                    this.selectedSku[index] = {
                        index: index,
                        specIndex: specIndex,
                        model: specName
                    }
                }
            } else {
                this.selectedSku[index] = {
                    index: index,
                    specIndex: specIndex,
                    model: specName
                }
            }

            // 更新sku
            let newRenderSku = this.renderSku.map(item => {
                return {
                    name: item.name,
                    item: item.item.map(element => {
                        return {
                            name: element.name,
                            selected: element.selected
                        }
                    })
                }
            })
            this.renderSku = this.currentViewSku
                .contrast(itemName, specName)
                .map((element, pIndex) => {
                    return {
                        name: element.name,
                        item: element.item.map((item, sIndex) => {
                            return Object.assign(item, newRenderSku[pIndex].item[sIndex])
                        })
                    }
                })

            let model = this.selectedSku.map(item => item.model)
            console.log(model[0], model[1])

            // 获取skucode
            this.skuCode = this.currentViewSku.getSkuCode(...model)

            if (this.skuCode) {
                // 获取props
                this.selfProps = model.join(' ')
                console.log(this.selfProps)

                // 获取价格
                this.specPrice = this.currentViewSku.getPrice(...model)
                // 获得库存
                this.specStock = this.currentViewSku.getStock(...model)

                // 获得规格图
                let goodsIcon = this.currentViewSku.getIcon(...model)
                this.specIcon = goodsIcon
                    ? goodsIcon.indexOf('http') == -1
                        ? `${this.ext.img_host}${goodsIcon}`
                        : goodsIcon
                    : this.foodsDetails.thumb
                console.log(goodsIcon)
            }
        },

        btntap(e, index) {
            // 规则选择面板的按钮
            if (this.foodsDetails.is_multi_spec) {
                // 支持规格
                if (
                    this.selectedSku.myEvery() &&
                    this.selectedSku.length == this.foodsDetails.specNum
                ) {
                    this.$refs.choice.closeChoice()
                    // 多规格加入购物车的数据
                    this.foods.number = this.goodsNumber
                    this.foods.price = this.specPrice
                    this.foodsMsg = {
                        id: this.foodsDetails.id, // 商品ID
                        name: this.foodsDetails.name, // 商品名称
                        skucode: this.skuCode, // 商品sku
                        props: this.foodsDetails.props, // 规格
                        number: this.goodsNumber, // 数量
                        icon: this.icon, //缩略图
                        isMultiSpec: this.foodsDetails.is_multi_spec, // 是否支持多规格
                        // freight: this.foodsDetails.freight, // 运费,
                        price: this.specPrice, // 当前规格价钱
                        restaurantId: this.restaurantId, // 店铺id
                        typeId: this.foodsDetails.typeId, // 菜品分类
                        thumb: this.foodsDetails.thumb,
                        selectedProps: this.selfProps // 已选规格
                        // storeId: this.foodsDetails.storeId,
                        // storeName: this.foodsDetails.storeName,
                    }
                    console.log(this.foodsMsg)
                    if (index == 0) {
                        // 加入购物车
                        if (this.setSelectedFoods(this.foodsMsg)) {
                            wx.showToast({
                                title: '添加成功',
                                icon: 'success',
                                duration: 1500,
                                mask: true
                            })
                        }
                    } else {
                        // 购买
                        this.setSelectedFoods(this.foodsMsg)
                        this.$router.push({
                            path: '/pages/payment-order'
                        })
                    }
                } else {
                    this.$refs.toptips.showToptips({
                        content: '请选择商品规格',
                        timer: 1500
                    })
                }
            } else {
                this.$refs.choice.closeChoice()
                // 单规格加入购物车
                this.foods.number = this.goodsNumber

                this.foodsMsg = {
                    id: this.foodsDetails.id, // 商品ID
                    name: this.foodsDetails.name, // 商品名称
                    number: this.goodsNumber, // 数量
                    icon: this.icon, //缩略图
                    isMultiSpec: this.foodsDetails.is_multi_spec, // 是否支持多规格
                    // freight: this.foodsDetails.freight, // 运费,
                    price: this.foodsDetails.price, // 价钱
                    restaurantId: this.restaurantId, // 店铺id
                    typeId: this.foodsDetails.typeId, // 菜品分类
                    thumb: this.foodsDetails.thumb
                    // storeId: this.foodsDetails.storeId,
                    // storeName: this.foodsDetails.storeName,
                }
                console.log(this.foodsMsg)
                if (index == 0) {
                    // 加入购物车
                    if (this.setSelectedFoods(this.foodsMsg)) {
                        wx.showToast({
                            title: '添加成功',
                            icon: 'success',
                            duration: 1500,
                            mask: true
                        })
                    }
                } else {
                    // 购买
                    this.setSelectedFoods(this.foodsMsg)
                    this.$router.push({
                        path: '/pages/payment-order'
                    })
                }
            }
        }
    },
    watch: {
        selectedFoods(newVal) {
            wx.setStorageSync('selectedFoods', newVal)
        }
    },
    mounted() {
        this.ext = wx.getStorageSync('ext')
        // this.imageProp.domain = this.ext.img_host
        this.restaurantId = wx.getStorageSync('restaurant').id

        getFoodsDetails(this.$route.query.id, this.$route.query.name, this.restaurantId).then(
            result => {
                wx.showLoading({
                    title: '加载中...'
                })

                // 判断当前食品在不在购物车
                let currentFood = this.selectedFoods.find(item => {
                    return item.id == result.data.items[0].id
                })
                let image = result.data.items[0].imgs
                this.movies = image.map(res => {
                    return {
                        img: getExtJson().api_host + res
                    }
                })
                console.log('轮播图', this.movies)

                this.foods = result.data.items[0]
                this.foodsMsg.selectedProps = (currentFood && currentFood.selectedProps) || ''

                if (this.foods.is_multi_spec) {
                    // 菜品详情多规格保存参数
                    Object.assign(this.foods, {
                        number: (currentFood && currentFood.number) || 0, // 数量
                        isMultiSpec: result.data.items[0].is_multi_spec, // 是否多规格
                        typeId: result.data.items[0].type_id, // 菜品分类
                        //库存
                        stock:
                            result.data.items[0].unlimited == 1
                                ? '不限'
                                : result.data.items[0].inventory +
                                  result.data.items[0].specification,
                        //展示图
                        icon:
                            result.data.items[0].thumb.indexOf('http') == -1
                                ? `${this.ext.img_host}${result.data.items[0].thumb}`
                                : result.data.items[0].thumb,
                        specNum: result.data.items[0].props.length, // 规格数据长度
                        selectedProps: (currentFood && currentFood.selectedProps) || '', // 已选规格或者未选为空
                        price: (currentFood && currentFood.price) || result.data.items[0].price, // 已选价格或者未选
                        details: result.data.items[0].detail.replace(
                            /<img( alt="[\s|a-z|A-Z|0-9|\u4e00-\u9fa5]*")? src="\//g,
                            `<img src="${this.ext.img_host}/`
                        )
                    })
                } else {
                    // 菜品详情单规格保存参数
                    Object.assign(this.foods, {
                        number: (currentFood && currentFood.number) || 0, // 数量
                        isMultiSpec: result.data.items[0].is_multi_spec, // 是否多规格
                        typeId: result.data.items[0].type_id, // 菜品分类
                        //展示图
                        icon:
                            result.data.items[0].thumb.indexOf('http') == -1
                                ? `${this.ext.img_host}${result.data.items[0].thumb}`
                                : result.data.items[0].thumb,
                        details: result.data.items[0].detail.replace(
                            /<img( alt="[\s|a-z|A-Z|0-9|\u4e00-\u9fa5]*")? src="\//g,
                            `<img src="${this.ext.img_host}/`
                        )
                    })
                }
                console.log(this.foods)
                wx.hideLoading()
            }
        )
        this.choiceness = this.$route.query.choiceness
    }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
.wrap-product-detail {
    width: 100%;
    color: #666666;
    padding-bottom: 120rpx;
    box-sizing: border-box;

    .detail-show {
        width: 100%;
        background-color: white;

        .show-text {
            width: 100%;
            padding: 10rpx 30rpx;
            box-sizing: border-box;
            font-size: 32rpx;
        }

        .show-spec {
            width: 100%;
            padding: 20rpx 30rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .spec-l {
                font-size: 40rpx;
                color: #FF0B29;

                .l-p {
                    font-size: 20rpx;
                }
            }

            .spec-r {
                line-height: 40rpx;
            }
        }
    }

    .detail-type {
        width: 100%;
        height: 80rpx;
        background-color: white;
        margin-top: 20rpx;
        padding: 0 30rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .type-left {
            display: flex;

            .left-one {
                color: #A0A0A0;
                margin-right: 20rpx;
            }
        }

        .type-right {
            img {
                width: 40rpx;
                height: 8rpx;
            }
        }
    }

    .detail-recomm {
        .show-header {
            width: 100%;
            height: 62rpx;
            font-size: 28rpx;
            color: #666666;
            text-align: center;
            line-height: 62rpx;
            background: url('../../static/icon/header-lr.png') no-repeat 50% 50%;
            background-size: 270rpx 4rpx;
        }

        .recomm-content {
            width: 100%;
            background-color: white;

            img {
                width: 750rpx;
            }
        }
    }

    .detail-btn {
        width: 100%;
        height: 100rpx;
        position: fixed;
        left: 0;
        bottom: 0;
        display: flex;

        .left {
            flex: 1;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .center {
            flex: 2;
            background-color: #F5A623;
            font-size: 28rpx;
            color: white;
            text-align: center;
            line-height: 100rpx;
        }

        .right {
            flex: 2;
            background-color: #F44E3E;
            font-size: 28rpx;
            color: white;
            text-align: center;
            line-height: 100rpx;
        }
    }
}
</style>
