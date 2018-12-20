
const tabBarData = {
    tab1: {
        selectedColor: '#e02828',
        color: '#a4a4a4',
        data: [
            {
                pageName: '/pages/index',
                text: '首页',
                iconName: 'home',
                currentSelected: true
            },
            {
                pageName: '/pages/order',
                text: '购物车',
                iconName: 'gouwuche',
            },
            {
                pageName: '/pages/member',
                text: '个人中心',
                iconName: 'user',
            }
        ]
    },
    // tab2: {
    //     selectedColor: '#e02828',
    //     color: '#a4a4a4',
    //     data: [
    //         {
    //             pageName: '/pages/shop-detail',
    //             text: '首页',
    //             iconName: 'icon-home',
    //             currentSelected: true
    //         },
    //         {
    //             pageName: '/pages/all-goods',
    //             text: '全部商品',
    //             iconName: 'icon-goods'
    //         }
    //     ]
    // }
}
export default tabBarData