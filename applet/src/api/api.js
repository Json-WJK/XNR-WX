import request from './http'
import Ext from './ext'

const getExtJson = () => new Ext()

const EXT = getExtJson()
console.log(EXT);


/*测试获取微信配置数据 */
const getwxconfig = (operate,ext) => {
    return request.put(`/wechat-config/56`, {
            config_id: getExtJson().config_id,
            operate,
            ext
        }).then(res => res.data)
}


// 获取openid
const getOpenid = (code, type) => {
    return new Promise((resolve, reject) => {
        request
            .get(`/restapi/default/new-openid`, {
                config_id: getExtJson().config_id,
                code: code,
                type: type || '小程序' // '微信'             
            })
            .then( res => {
                res.data
                resolve( res.data )
            }
        )
    })
}

// 获取轮播图和广告图
const getFocus = () => {
    return request
        .get(`/restapi/wechat-focus`, {
            config_id: getExtJson().config_id,
            belongs: 1, // 1为小程序 0为公众号
            type: 0 // 0为焦点图 1是其他广告位
        })
        .then(res => res.data)
}
// 获取门店信息
const getRestaurants = () => {
    return request
        .get('/restapi/food-restaurants', { config_id: getExtJson().config_id })
        .then(res => res.data)
}

// 获取餐饮分类
const getCategories = restaurantId => {
    return request
        .get('/restapi/food-categories', {
            config_id: getExtJson().config_id,
            restaurant_id: restaurantId
        })
        .then(res => res.data)
}

//菜品列表
const getFoods = (options = {}) => {
    let data = {
        config_id: getExtJson().config_id,
        type_id: options.typeId,
        page: options.page || 1,
        'per-page': options.perPage || 10,
        restaurant_id: options.restaurantId
    }
    if (options.outSupport) {
        data.out_support = options.outSupport // 1 外卖
    }

    return request.get('/restapi/food-goods', data).then(res => res.data)
}

//首页精选商品列表
const getHandpickFoods = (options = {}) => {
    let data = { config_id: getExtJson().config_id, is_top: 1 }
    if (options.outSupport) {
        data.out_support = options.outSupport // 1 外卖
    }

    return request.get('/restapi/food-goods', data).then(res => res.data)
}

// 付款创建订单
const payment = (options = {}) => {
    return request.post('/restapi/food-orders', options).then(res => res.data)
}

// 获取订单列表
const getOrderList = status => {
    return request
        .get('/restapi/food-orders', {
            config_id: getExtJson().config_id,
            openid: getExtJson().openid,
            status: status
        })
        .then(res => res.data)
}

// 取消订单
const cancelOrder = id => {
    return request
        .put(`/restapi/food-orders/${id}`, {
            config_id: getExtJson().config_id,
            openid: getExtJson().openid
        })
        .then(res => res.data)
}

// 获取商品详情
const getFoodsDetails = ( id, name, restaurantId ) => {
    id ? '' : id = ''
    name ? '' : name = ''
    return request
        .get(`/restapi/food-goods`, {
            config_id: getExtJson().config_id,
            id: id,
            good_name: name,
            restaurant_id: restaurantId
        })
        .then(res => res.data)
}

// 添加收藏
const addLike = id => {
    return request
        .post('/restapi/productlikes', {
            config_id: getExtJson().config_id,
            type: '餐饮',
            product_id: id,
            openid: getExtJson().openid
        })
        .then(res => res.data)
}

// 获取收藏列表
const getCollction = () => {
    return request
        .get('/restapi/productlikes', {
            config_id: getExtJson().config_id,
            type: '餐饮',
            openid: getExtJson().openid
        })
        .then(res => res.data)
}

// 取消收藏
const delCollction = id => {
    return request
        .request(
            `/restapi/productlikes/${id}`,
            { config_id: getExtJson().config_id, type: '餐饮', openid: getExtJson().openid },
            { method: 'DELETE' }
        )
        .then(res => res.data)
}

// 单个商品是否收藏
const isCollection = id => {
    return request
        .get(`restapi/productlike/like`, {
            openid: getExtJson().openid,
            config_id: getExtJson().config_id,
            type: '餐饮',
            product_id: id
        })
        .then(res => res.data)
}

// 优惠券列表
const getCoupons = () => {
    return request
        .get('/restapi/wechat-coupon', {
            config_id: getExtJson().config_id,
            apps_openid: getExtJson().openid
        })
        .then(res => res.data)
}

// 领取优惠券
const getWeMyCoupons = couponsId => {
    return request
        .post('/restapi/wechat-my-coupons', {
            config_id: getExtJson().config_id,
            coupon_id: couponsId,
            apps_openid: getExtJson().openid
        })
        .then(res => res.data)
}

// 获取我的优惠券
const getMyCoupons = status => {
    return request
        .get('/restapi/wechat-my-coupons', {
            config_id: getExtJson().config_id,
            apps_openid: getExtJson().openid,
            status: status,
            expand: 'coupon'
        })
        .then(res => res.data)
}

//积分商城列表
const getIntegralList = (page, perPage = 10) => {
    return request
        .get('/restapi/goods-integral-store', {
            merchant_id: getExtJson().merchant_id,
            openid: getExtJson().openid,
            'per-page': perPage,
            page: page,
            re_source: '小程序',
            industry: 1
        })
        .then(res => res.data)
}

//积分商城详情
const getIntegralDetail = data => {
    let sendData = {
        merchant_id: getExtJson().merchant_id,
        openid: getExtJson().openid,
        industry: 1
    }
    Object.assign(sendData, data)
    return request.get('/restapi/goods-integral-store/view', sendData).then(res => res.data)
}

//积分兑换
const exChange = data => {
    let sendData = {
        config_id: getExtJson().config_id,
        openid: getExtJson().openid,
        source: '小程序',
        industry: 1,
        mode: 1,
    }
    Object.assign(sendData, data)
    return request.post('/restapi/goods-integral-order/create', sendData).then(res => res.data)
}

//积分订单列表
const getIntegralOrder = (page, perPage = 10) => {
    return request
        .get(' /restapi/goods-integral-order', {
            config_id: getExtJson().config_id,
            openid: getExtJson().openid,
            page: page,
            'per-page': perPage
        })
        .then(res => res.data)
}

//积分规则
const getIntegralRule = () => {
    return request
        .get('  /restapi/goods-integral-rule ', { config_id: getExtJson().config_id })
        .then(res => res.data)
}

//积分明细
const getIntegralDetailed = (page, userInfoId, perPage = 10) => {
    return request
        .get(' /restapi/goods-detail', {
            config_id: getExtJson().config_id,
            openid: getExtJson().openid,
            page: 1,
            'per-page': perPage,
            industry: 1,
            user_info_id: userInfoId
        })
        .then(res => res.data)
}

// 查看会员卡信息
const getVipCard = () => {
    return request
        .get(`restapi/wechat-card/index`, {
            openid: getExtJson().openid,
            config_id: getExtJson().config_id,
            source: '小程序'
        })
        .then(res => res.data)
}

// 会员卡注册发送验证码
const getSmsCode = (configId, mobile) => {
    return request
        .post('/restapi/wechat-card/get-sms-code', {
            config_id: configId,
            mobile: mobile
        })
        .then(res => res.data)
}

// 获取订单详情
const getOrderInfo = id => {
    return request
        .get(`/restapi/food-order/${id}`, { config_id: getExtJson().config_id })
        .then(res => res.data)
}

// 是否登录状态
const isLogin = () => {
    return request
        .get(`/restapi/wechat-card/islogin`, {
            config_id: getExtJson().config_id,
            openid: getExtJson().openid,
            source: '小程序'
        })
        .then(res => res.data)
}

// 登录注册绑定
const register = (mobile, code) => {
    return request
        .post(`/restapi/wechat-card/login`, {
            config_id: getExtJson().config_id,
            openid: getExtJson().openid,
            source: '小程序',
            mobile: mobile,
            verify_code: code,
            real_name: '暂无'
        })
        .then(res => res.data)
}
export {
    getExtJson,
    getOpenid,
    getRestaurants,
    getCoupons,
    getWeMyCoupons,
    getMyCoupons,
    getIntegralList,
    getIntegralDetail,
    exChange,
    getIntegralOrder,
    getIntegralRule,
    getIntegralDetailed,
    getFoods,
    getHandpickFoods,
    getCategories,
    getFoodsDetails,
    addLike,
    getCollction,
    delCollction,
    isCollection,
    payment,
    getOrderList,
    getVipCard,
    getOrderInfo,
    getSmsCode,
    isLogin,
    register,
    cancelOrder,
    getFocus,
    getwxconfig
}
