

module.exports = [
    //这里是首页
    {
        path: 'pages/index',
        name: 'index',
        config: {
            enablePullDownRefresh: true
        }
    },
    {
        path: 'pages/shop-site',
        name: 'shop-site',
        config: {
            navigationBarTitleText: '门店选择',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white',

            usingComponents: {
                'i-radio-group': '../../static/iView/radio-group/index',
                'i-radio': '../../static/iView/radio/index'
            }
        }
    },
    {
        path: 'pages/product-detail',
        name: 'product-detail',
        config: {
            navigationBarTitleText: '详情',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white'
        }
    },
    {
        path: 'pages/accredit',
        name: 'accredit',
        config: {
            navigationBarTitleText: '授权登录',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white'
        }
    },

    // 菜品
    {
        path: 'pages/foods',
        name: 'foods',
        config: {
            navigationBarTitleText: '菜品',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white'
        }
    },

    //登陆  注册
    {
        path: 'pages/register',
        name: 'register',
        config: {
            navigationBarTitleText: '注册绑定',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white'
        }
    },
    {
        path: 'pages/aotom-login',
        name: 'aotom-login',
        config: {
            navigationBarTitleText: '登录',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white'
        }
    },

    //积分详情
    {
        path: 'pages/integral',
        name: 'integral',
        config: {
            navigationBarTitleText: '积分商城',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white',
            enablePullDownRefresh: true
        }
    },
    {
        path: 'pages/integral-list',
        name: 'integral-list',
        config: {
            navigationBarTitleText: '积分明细',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white'
        }
    },
    {
        path: 'pages/integral-rule',
        name: 'integral-rule',
        config: {
            navigationBarTitleText: '积分规则',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white'
        }
    },
    {
        path: 'pages/integral-detail',
        name: 'integral-detail',
        config: {
            navigationBarTitleText: '详情',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white'
        }
    },
    {
        path: 'pages/integral-order',
        name: 'integral-order',
        config: {
            navigationBarTitleText: '积分商城',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white'
        }
    },
    // {
    //     path: 'pages/integral-order-detail',
    //     name: 'integral-order-detail',
    //     config: {
    //         navigationBarTitleText: '积分商城',
    //         navigationBarBackgroundColor: '#4A4A4A',
    //         navigationBarTextStyle: 'white'
    //     }
    // },

    //订单
    {
        path: 'pages/order',
        name: 'order',
        config: {
            navigationBarTitleText: '我的订单',
            usingComponents: {
                'i-tabs': '../../static/iView/tabs/index',
                'i-tab': '../../static/iView/tab/index'
            }
        }
    },
    {
        path: 'pages/order-remark',
        name: 'order-remark',
        config: {
            navigationBarTitleText: '订单备注',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white'
        }
    },
    {
        path: 'pages/order-detail',
        name: 'order-detail',
        config: {
            navigationBarTitleText: '订单详情',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white'
        }
    },
    {
        path: 'pages/payment-order',
        name: 'payment-order',
        config: {
            navigationBarTitleText: '确认订单',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white'
        }
    },
    {
        path: 'pages/coupon',
        name: 'coupon',
        config: {
            navigationBarTitleText: '优惠券',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white'
        }
    },
    {
        path: 'pages/stale-coupon',
        name: 'stale-coupon',
        config: {
            navigationBarTitleText: '优惠券',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white'
        }
    },
    {
        path: 'pages/payment-success',
        name: 'payment-success',
        config: {
            navigationBarTitleText: '支付成功',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white'
        }
    },

    //个人中心
    {
        path: 'pages/member',
        name: 'member',
        config: {
            navigationBarTitleText: '个人中心',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white'
        }
    },
    {
        path: 'pages/map',
        name: 'map',
        config: {
            navigationBarTitleText: '地图',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white'
        }
    },
    {
        path: 'pages/vip-card-web-view',
        name: 'vip-card-web-view',
        config: {
            navigationBarTitleText: '我的会员',
            navigationBarBackgroundColor: '#4A4A4A',
            navigationBarTextStyle: 'white'
        }
    },
    {
        path: '/pages/card-payment',
        name: 'card-payment',
        config: {
            navigationBarTitleText: '支付结果'
        }
    },
    // 
    {
        path: '/pages/web-view',
        name: 'web-view',
        config: {
        }
    }
]
