
<style lang="scss">
.foods {
    &_hd {
        padding: 30rpx;
        box-sizing: border-box;
        background-color: white;
        width: 100%;
        display: flex;
        color: #666;
        &_logo {
            width: 120rpx;
            height: 120rpx;
            border-radius: 8rpx;
            margin-right: 30rpx;
            img {
                width: 120rpx;
                height: 120rpx;
                border-radius: 20rpx;
            }
        }
        &_centent {
            width: 100%;
            &_name {
                width: 100%;
                font-size: 32rpx;
                font-weight: bold;
                margin-bottom: 8rpx;
            }
            &_notice {
                width: 100%;
                line-height: 34rpx;
                vertical-align: middle;
                color: #a0a0a0;
            }
        }
    }
    &_cont {
        height: calc(100vh - 56px - 66px);
        display: flex;
    }
    &_left {
        width: 80px;
        height: 100%;
        background: #f5f6f7;
    }
    &_right {
        flex: 1;
        box-sizing: border-box;
        background: #fff;
        padding-bottom: 10px;

        &_title {
            font-size: 13px;
            line-height: 42px;
            height: 42px;
            background: #f2f2f2;
            padding-left: 10px;
        }
        &_item {
            display: flex;
            padding: 11px 0 11px 20rpx;
            margin-right: 15px;
            // border-bottom: 1px solid #eee;
            .foods_icon {
                width: 90px;
                height: 90px;
                border-radius: 8rpx;
                flex-shrink: 0;
                background: {
                    size: cover;
                    repeat: no-repeat;
                    position: center center;
                }
            }
            .cont {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 6em;
                padding-left: 9px;
            }
            .name {
                font-size: 14px;
                color: #333;
                font-weight: 600;
            }
            .stock {
                font-size: 11px;
                line-height: 20px;
                color: #999;
            }
            .cont-price {
                font-size: 14px;
                color: #ec5e2a;
            }
            .price {
                font-size: 14px;
                color: #d0021b;
                line-height: 1;
                display: block;
            }
            .counter {
                display: flex;
                align-items: flex-end;
                width: 66px;
                flex-shrink: 0;
                padding-top: 18px;
            }
            .spec {
                display: flex;
                align-items: flex-end;
            }
            .spec span {
                color: #fff;
                background: #f5a623;
                border-radius: 10px;
                padding: 2px 5px;
            }
        }
    }
    &_ft {
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 9;
    }
    &_selected_list_wrap {
        width: 100%;
        height: calc(100vh - 48px);
        background: rgba(0, 0, 0, 0.4);
        z-index: 9;
        position: fixed;
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
}

::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
}
</style>

<template>
    
    <div>
        
        <div class="foods_hd">
            <div class="foods_hd_logo">
                <img :src="restaurant.logo" alt="">
            </div>
            <div class="foods_hd_centent">
                <div class="foods_hd_centent_name">{{restaurant.name}}</div>
                <div class="foods_hd_centent_notice">
                    公告: {{restaurant.notice}}
                </div>
            </div>
        </div>
       
       <div class="foods_cont">
            <div class="foods_left">
                <wk-window-nav :list="navList" @change="windowChange" :current="currentWindow"></wk-window-nav>
            </div>
            <scroll-view 
                class="foods_right" 
                :scroll-y="true" 
                lower-threshold="50"
                @scrolltolower="scrollLower"
            >
                <div class="foods_right_title">{{title}}</div>
                <!-- 错误流 -->
                <div v-if="abnorType">
                    <wk-abnor :type=" abnorType "></wk-abnor>
                </div>
                
                <!-- 商品列表 -->
                <div 
                    v-for="(item, index) in foodsList"
                    :key="index"
                    class="foods_right_item"
                >
                    <div :style=" { 'background-image': 'url(' + item.icon + ')'} " class="foods_icon" @click="toFoodsDetails(item.id)"></div>
                    <div class="cont" @click="toFoodsDetails(item.id)">
                        <div class="name">
                            <wk-elip :content="item.name" :line="1"></wk-elip>
                        </div>
                        <div class="stock" v-if="item.isMultiSpec">
                            库存{{item.stockAll}}
                        </div>
                        <div class="stock" v-else>
                            库存{{item.stock}}
                        </div>
                        <div class="stock">销量{{item.sales}}</div>
                        <div v-if="item.isMultiSpec" class="cont-price">
                            &yen; {{item.min}}-{{item.max}}
                            <!-- <wk-price :value=" item.min "></wk-price>-<wk-price :value=" item.max "></wk-price> -->
                        </div>
                        <wk-price v-else :value=" item.price "></wk-price>
                    </div>
                    <div class="spec" 
                        v-if="item.isMultiSpec"
                        @click="selectSpec(item, index)">
                        <span>选择规格</span>
                    </div>
                    <div class="counter" v-else>
                        <wk-count-picker 
                            :conut="item.number" 
                            :max="item.stock" 
                            :id="index" 
                            @change="countPicker"
                        ></wk-count-picker>
                    </div>
                </div>
            </scroll-view>
       </div>
        
        <div class="foods_selected_list_wrap" v-if="cartStatus" @click.stop="modalclick">
            <div class="foods_selected_list">
                <div class="foods_selected_title">
                    <div>已选商品</div>
                </div>

                <div class="foods_selected_content">
                    <div 
                        class="foods_selected_item" 
                        v-for="(item, index) in selectedFoods"
                        :key="index"
                    >
                        <div class="name">
                            <wk-elip :content="item.name" :line="1"></wk-elip>
                        </div>
                        <div class="price">
                            <wk-price :value=" item.price * 100 * item.number / 100 " :icon=" 'sub' "></wk-price>
                        </div>

                        <div class="number">
                            <wk-count-picker 
                                :conut="item.number" 
                                :max="item.stock" 
                                :id="index" 
                                @change="listCountPicker"
                            ></wk-count-picker>
                        </div>
                    </div>
                </div>

                <div class="foods_selected_ft"></div>
            </div>
        </div>

        <div class="foods_ft" >
            <wk-cart-bottom 
                @leftclick="leftclick" 
                @rightclick="rightclick"
                :disabled="disabledBottom"
                :badge="badge"
                :price="totalPrice"
            ></wk-cart-bottom>
        </div>

        <!-- 规格选择栏 -->
        <my-spec-choice
            ref="choice"
            :name="goodsDetails.name"
            :icon="specIcon"
            :stock="specStock"
            :spec="renderSku"
            :type=" cartType "
            :price=" specPrice "
            :number=" goodsNumber "
            @propstap="propstap"
            @btntap="btntap"
            @numberChange="numberChange"
        ></my-spec-choice>

        <!-- 提示 -->
        <wk-toptips ref="toptips"></wk-toptips>
        
    </div>

</template>

<script>
import { getCategories, getFoods, getExtJson } from '@/api'

import TransformSku from '@/assets/transformSku'
import mySpecChoice from '@c/spec-choice'
import wkWindowNav from '@c/window-nav'
import wkIcon from '@c/icon'
import wkCartBottom from '@c/cart-bottom'
import wx from 'wx'
import wkElip from '@c/elip'
import wkPrice from '@c/price'
import wkAbnor from '@c/abnor'
import wkCountPicker from '@c/count-picker'
import wkToptips from '@c/toptips'

import { mapState, mapActions } from 'vuex'

Array.prototype.myEvery = function() {
    // 自定义every函数解决every函数不回循环出undefined的问题
    let status
    for (let i = 0; i < this.length; i++) {
        console.log(this[i],333);
        
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
        wkWindowNav,
        wkIcon,
        wkCartBottom,
        wkElip,
        wkPrice,
        wkCountPicker,
        wkAbnor,
        mySpecChoice,
        wkToptips
    },
    computed: {
        ...mapState([
            // vuex选中的商品状态
            'selectedFoods'
        ]),
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
            return (
                this.selectedFoods.reduce(
                    (current, prev) => current + prev.price * 100 * prev.number,
                    0
                ) / 100
            )
            // if(this.dinerType == 1){
            //     return this.selectedFoods.reduce( (current, prev) => current + prev.price * 100 * prev.number, 0) / 100
            // }else {
            //     return this.selectedFoods.reduce( (current, prev) => current + prev.parishPrice * 100 * prev.number, 0) / 100
            // }
        }
    },
    data() {
        return {
            navList: [],
            foodsList: [],
            title: '',
            restaurant: '', // 当前店铺详情
            dinerType: 0, // 0 堂食 1 外卖
            ext: null,
            currentId: 0,
            page: 1,
            perPage: 10,
            maxPage: 1,
            requestStatus: '',
            cartStatus: false, // 购物车状态
            selectedStatus: [],    //  已选择状态
            currentWindow: 0,
            tablesId: 0, //桌号
            restaurantId: 0, // 门店ID
            specIcon: '', // 规格图标
            specStock: '0',
            specPrice: '0',
            currentViewSku: {},
            cartType: 1, // 1加入购物车 2 立即购买
            renderSku: [],
            goodsNumber: 1,
            goodsDetails: {},
            skuCode: '',
            selfProps: ''
        }
    },
    watch: {
        selectedFoods(newVal) {
            if (newVal.length == 0) {
                this.cartStatus = false
            }

            wx.setStorageSync('selectedFoods', newVal)
            console.log(this.foodsList, newVal)

            let foods = this.foodsList.map(item => {
                let status = newVal.find(ele => ele.id == item.id)
                Object.assign(item, { number: status ? status.number : 0 })
                return item
            })
            this.foodsList = JSON.parse(JSON.stringify(foods))
            console.log(this.foodsList)
        },
        currentId(newVal) {
            if (newVal) {
                console.log(newVal)
                this.getFoodsList()
            }
        }
    },
    methods: {
        ...mapActions([
            'setSelectedFoods', // 更新购物车的vuex状态函数
            'removeSelectedFoods' // 清空购物车
        ]),
        toFoodsDetails(id) {
            this.$router.push({
                path: `/pages/product-detail?id=${id}`
            })
        },
        countPicker(number, index) {
            // 数量选择

            this.foodsList[index].number = number
            this.foodsList[index].index = index

            this.setSelectedFoods(this.foodsList[index])
            console.log(this.foodsList)
        },
        listCountPicker(number, index) {
            this.selectedFoods[index].number = number

            this.foodsList.forEach(element => {
                let data = this.selectedFoods.find(ele => {
                    ele.id == element.id
                })
                console.log(data)

                if (data) {
                    element.number = data.number
                }
            })

            this.setSelectedFoods(this.selectedFoods[index])
        },
        windowChange(index, item) {
            // 切换分类加载
            this.title = item.name
            this.currentWindow = index
            this.foodsList.length = 0
            this.currentId = item.id
            this.page = 1
        },
        leftclick(e) {
            this.cartStatus = !this.cartStatus
        },
        rightclick(e) {
            if (!this.selectedFoods.length) {
                return
            }
            this.$router.push({
                path: '/pages/payment-order'
            })
        },
        // 购物车详情点击模态关闭
        modalclick() {
            this.cartStatus = !this.cartStatus
        },
        selectSpec(item, index) {
            console.log(item, index)
            // this.setSelectedFoods(this.selectedFoods[index])

            this.currentViewSku = new TransformSku(item)
            this.renderSku = this.currentViewSku.$renderSku
            console.log('渲染规格' + this.renderSku)

            this.goodsDetails = item

            this.specStock = this.goodsDetails.stockAll
            this.specPrice = this.goodsDetails.price
            this.$refs.choice.openChoice()

            this.selectedStatus = []
            // this.propstap(0,0)
            // this.propstap(1,0,)
        },
        propstap(index, specIndex, itemName, specName) {
            console.log(index, specIndex, itemName, specName)

            // 规格选择的事件
            // 处理选中高亮 index表示行数索引 （每一个类型算一个行） specIndex 表示每一个的索引
            
            
            this.renderSku[index].item[specIndex].selected = true

            // 处理点击不同的按钮时取消原来的高亮
            if (this.selectedStatus[index]) {
                let oldIndex = this.selectedStatus[index].index
                let oldKey = this.selectedStatus[index].specIndex
                if (oldKey !== specIndex) {
                    this.renderSku[oldIndex].item[oldKey].selected = false
                    this.selectedStatus[index] = {
                        index: index,
                        specIndex: specIndex,
                        model: specName
                    }
                }
            } else {
                this.selectedStatus[index] = {
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

            let model = this.selectedStatus.map(item => item.model)
            console.log(model)

            // 获取skucode
            this.skuCode = this.currentViewSku.getSkuCode(...model)
            console.log(this.skuCode)

            this.selfProps = model.join(' ')
            console.log(this.selfProps)
            if (this.skuCode) {
                // 获取props
                // this.selfProps = model.join(' ')
                // console.log(this.selfProps);

                // 获取价格
                this.specPrice = this.currentViewSku.getPrice(...model)
                // 获得库存
                this.specStock = this.currentViewSku.getStock(...model)

                // 获得规格图
                // let goodsIcon = this.currentViewSku.getIcon(...model)
                // this.specIcon = goodsIcon
                //     ? goodsIcon.indexOf('http') == -1
                //         ? `${this.ext.img_host}${goodsIcon}`
                //         : goodsIcon
                //     : this.goodsDetails.thumb
            }
        },
        btntap(e, index) {
            // 规则选择面板的按钮
            if (this.goodsDetails.isMultiSpec) {
                // 支持规格
                console.log(this.selectedStatus)
                if (
                    // 规格判断
                    this.selectedStatus.myEvery() &&
                    this.selectedStatus.length == this.goodsDetails.specNum
                ) {
                    this.$refs.choice.closeChoice()
                    // 多规格加入购物车的数据
                    let goodsMsg = {
                        // storeId: this.goodsDetails.storeId,
                        // storeName: this.goodsDetails.storeName,

                        id: this.goodsDetails.id, // 商品ID
                        name: this.goodsDetails.name, // 商品名称
                        skucode: this.skuCode, // 商品sku
                        props: this.goodsDetails.props, // 规格
                        number: this.goodsNumber, // 数量
                        icon: this.icon, //缩略图
                        isMultiSpec: this.goodsDetails.isMultiSpec, // 是否支持多规格
                        // freight: this.goodsDetails.freight, // 运费,
                        price: this.specPrice, // 当前规格价钱
                        restaurantId: this.restaurantId, // 店铺id
                        typeId: this.goodsDetails.typeId, // 菜品分类
                        thumb: this.goodsDetails.thumb,
                        selectedProps: this.selfProps // 已选规格
                    }
                    if (index == 1) {
                        // 加入购物车
                        if (this.setSelectedFoods(goodsMsg)) {
                            wx.showToast({
                                title: '添加成功',
                                icon: 'success',
                                duration: 1500,
                                mask: true
                            })
                        }
                    }
                } else {
                    this.$refs.toptips.showToptips({
                        content: '请选择商品规格',
                        timer: 1500
                    })
                }
            }
        },
        numberChange(e) {
            // 规则选择的数量选择
            this.goodsNumber = e.number
        },
        getFoodsList() {
            // 获取右侧食品数据
            wx.showLoading({
                title: '加载中...'
            })
            getFoods({
                typeId: this.currentId,
                page: this.page,
                perPage: this.perPage,
                restaurantId: this.restaurantId
            })
                .then(res => {
                    wx.hideLoading()

                    if (!res.data.items || res.data.items.length == 0) {
                        this.requestStatus = 404
                        return
                    }

                    this.requestStatus = ''

                    // 分页最大页数
                    this.maxPage = res.data._meta.pageCount

                    let foods = res.data.items.map(item => {
                        // 遍历当前item有没有在selectedFoods里,有就在下面数量里更新
                        let status = this.selectedFoods.find(ele => {
                            return ele.id == item.id && ele.restaurantId == item.restaurant_id
                        })

                        if (item.is_multi_spec) {
                            // 多规格
                            return {
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                min: item.min, //最低价格
                                max: item.max, //最高价格
                                stockAll: item.stock_all, //多规格库存
                                // outPrice: item.out_support ? item.prices : 0, // 外卖价格（暂时不用了）
                                parishPrice: item.price,
                                // lunchBox: item.container,
                                isMultiSpec: item.is_multi_spec,
                                props: item.props,
                                sku: item.sku,
                                stock:
                                    item.unlimited == 1
                                        ? '不限'
                                        : item.inventory + item.specification,
                                icon: `${this.ext.img_host}${item.thumb}`,
                                thumb: item.thumb,
                                images: item.imgs,
                                number: status ? status.number : 0, //物品已选数量
                                // outSupport: item.out_support, // 是否支持外卖
                                specNum: item.props.length, // 规格数据长度
                                restaurantId: this.restaurantId,
                                typeId: item.type_id, // 菜品分类
                                sales: item.sales // 销售数量
                            }
                        } else {
                            // 单规格
                            return {
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                // outPrice: item.out_support ? item.prices : 0, // 外卖价格（暂时不用了）
                                parishPrice: item.price,
                                // lunchBox: item.container,
                                isMultiSpec: item.is_multi_spec,
                                stock: item.unlimited == 1 ? '不限' : item.stock,
                                icon: `${this.ext.img_host}${item.thumb}`,
                                thumb: item.thumb,
                                images: item.imgs,
                                number: status ? status.number : 0,
                                // outSupport: item.out_support, // 是否支持外卖
                                restaurantId: this.restaurantId,
                                typeId: item.type_id, // 菜品分类
                                sales: item.sales // 销售数量
                            }
                        }
                    })
                    this.foodsList.push(...foods)
                    console.log(this.foodsList)
                })
                .catch(err => {
                    this.requestStatus = 1
                })
        },
        scrollLower() {
            this.page++
            if (this.page <= this.maxPage) {
                this.getFoodsList()
            } else {
                this.page = this.maxPage
            }
        }
    },
    mounted() {
        this.ext = wx.getStorageSync('ext')
        console.log(this.ext)
        this.restaurant = wx.getStorageSync('restaurant')
        // this.dinerType = parseInt(this.$route.query.id) || 0
        // wx.setStorageSync('dinerType', this.dinerType)
        this.foodsList = []
        this.currentWindow = 0
        this.navList.length = 0
        this.currentId = 0

        this.restaurantId = wx.getStorageSync('restaurant').id || 0
        // wx.setStorageSync('tablesId', this.tablesId)

        // 购物车内如果不是本店的商品,清空购物车
        if (
            this.selectedFoods.some(item => {
                console.log(item.restaurantId, this.restaurantId)
                return item.restaurantId != this.restaurantId
            })
        ) {
            this.removeSelectedFoods()
        }

        getCategories(this.restaurantId).then(res => {
            // 获取分类
            this.navList = res.data
            this.currentId = this.navList[this.currentWindow].id
            // console.log(this.currentId);
        })
    }
    // onShareAppMessage() {}
}
</script>

