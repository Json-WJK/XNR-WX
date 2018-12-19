const data = [
    {
      name: '轮播广告',
      icon: 'carousel', // 图标
      type: 'carousel',
      options: {
        dialogVisibleImage: false, // 图片管理弹出
        dialogVisible: false, // 样式选择弹出
        width: '',
        styles: '1', // 样式
        height: '175',
        autoplay: true, // 自动播放
        interval: 3000, // 播放间隔 S
        // 轮播图
        items: [{
          type: 1,
          active: true,
          list: [
            { linkType: '', linkUrl: '', imageUrl: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg' },
            { linkType: '', linkUrl: '', imageUrl: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg' },
            { linkType: '', linkUrl: '', imageUrl: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg' }
          ]
        }]
      }
    },
    {
        name: '轮播广告',
        icon: 'carousel', // 图标
        type: 'carousel',
        options: {
          dialogVisibleImage: false, // 图片管理弹出
          dialogVisible: false, // 样式选择弹出
          width: '',
          styles: '2', // 样式
          height: '175',
          autoplay: true, // 自动播放
          interval: 3000, // 播放间隔 S
          // 轮播图
          items: [{
            type: 1,
            active: true,
            list: [
              { linkType: '', linkUrl: '', imageUrl: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg' },
              { linkType: '', linkUrl: '', imageUrl: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg' },
              { linkType: '', linkUrl: '', imageUrl: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg' }
            ]
          }]
        }
    },
    {
      name: '轮播广告',
      icon: 'carousel', // 图标
      type: 'carousel',
      options: {
        dialogVisibleImage: false, // 图片管理弹出
        dialogVisible: false, // 样式选择弹出
        width: '',
        styles: '3', // 样式
        height: '175',
        autoplay: true, // 自动播放
        interval: 3000, // 播放间隔 S
        // 轮播图
        items: [{
          type: 1,
          active: true,
          list: [
            { linkType: '', linkUrl: '', imageUrl: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg' },
            { linkType: '', linkUrl: '', imageUrl: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg' },
            { linkType: '', linkUrl: '', imageUrl: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg' }
          ]
        }]
      }
    },
    {
      name: '轮播广告',
      icon: 'carousel', // 图标
      type: 'carousel',
      options: {
        dialogVisibleImage: false, // 图片管理弹出
        dialogVisible: false, // 样式选择弹出
        width: '',
        styles: '4', // 样式
        height: '175',
        autoplay: true, // 自动播放
        interval: 3000, // 播放间隔 S
        // 轮播图
        items: [{
          type: 1,
          active: true,
          list: [
            { linkType: '', linkUrl: '', imageUrl: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg' },
            { linkType: '', linkUrl: '', imageUrl: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg' },
            { linkType: '', linkUrl: '', imageUrl: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg' }
          ]
        }]
      }
    },
/******************************商品导航******************************************/
    {
      name: '商品导航',
      icon: 'goodsRecommend',
      type: 'goodsRecommend',
      options: {
        dialogVisible: false, // 选择样式弹出框
        radio: '1', // 样式ID  String
        defaultValue: '我是标题',
        activeName: 'first', // 选项卡选择标签
        goodsNumber: 1, // 商品数量
        isClear: true // 是否售完显示提示
      }
    },
/******************************图片导航******************************************/
    {
      name: '图片导航',
      icon: 'images',
      type: 'imageNavigation',
      options: {
        styles: '1', // 样式
        dialogVisible: false, // 选择样式弹出框
        items: [
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航一', color: '#000', link: '' }
        ]
      }
    },
    {
      name: '图片导航',
      icon: 'images',
      type: 'imageNavigation',
      options: {
        styles: '2', // 样式
        dialogVisible: false, // 选择样式弹出框
        items: [
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航一', color: '#000', link: '' },
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航二', color: '#000', link: '' }
        ]
      }
    },
    {
      name: '图片导航',
      icon: 'images',
      type: 'imageNavigation',
      options: {
        styles: '3', // 样式
        dialogVisible: false, // 选择样式弹出框
        items: [
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航一', color: '#000', link: '' },
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航二', color: '#000', link: '' },
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航三', color: '#000', link: '' }
        ]
      }
    },
    {
      name: '图片导航',
      icon: 'images',
      type: 'imageNavigation',
      options: {
        styles: '4', // 样式
        dialogVisible: false, // 选择样式弹出框
        items: [
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航一', color: '#000', link: '' },
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航二', color: '#000', link: '' },
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航三', color: '#000', link: '' }
        ]
      }
    },
    {
      name: '图片导航',
      icon: 'images',
      type: 'imageNavigation',
      options: {
        styles: '5', // 样式
        dialogVisible: false, // 选择样式弹出框
        items: [
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航一', color: '#000', link: '' },
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航二', color: '#000', link: '' },
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航三', color: '#000', link: '' },
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航四', color: '#000', link: '' }
        ]
      }
    },
    {
      name: '图片导航',
      icon: 'images',
      type: 'imageNavigation',
      options: {
        styles: '6', // 样式
        dialogVisible: false, // 选择样式弹出框
        items: [
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航一', color: '#000', link: '' },
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航二', color: '#000', link: '' },
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航三', color: '#000', link: '' },
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航四', color: '#000', link: '' }
        ]
      }
    },
  /******************************搜索******************************************/
    {
      name: '搜索模块',
      icon: 'search',
      type: 'search',
      options: {
        styles: '1', // 样式
        dialogVisible: false // 选择样式弹出框
      }
    },
    {
      name: '搜索模块',
      icon: 'search',
      type: 'search',
      options: {
        styles: '2', // 样式
        dialogVisible: false // 选择样式弹出框
      }
    },
    {
      name: '搜索模块',
      icon: 'search',
      type: 'search',
      options: {
        styles: '3', // 样式
        dialogVisible: false // 选择样式弹出框
      }
    },
    {
      name: '搜索模块',
      icon: 'search',
      type: 'search',
      options: {
        styles: '4', // 样式
        dialogVisible: false // 选择样式弹出框
      }
    },
  /******************************店铺导航---带标题导航******************************************/
    {
      name: '店铺导航',
      icon: 'navigation',
      type: 'navigation',
      options: {
        styles: '1', // 样式
        dialogVisible: false, // 选择样式弹出框
        items: [
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航一', color: '#000', link: '' },
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航二', color: '#000', link: '' },
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航三', color: '#000', link: '' },
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航四', color: '#000', link: '' }
        ]
      }
      
    },
    {
      name: '店铺导航',
      icon: 'navigation',
      type: 'navigation',
      options: {
        styles: '2', // 样式
        dialogVisible: false, // 选择样式弹出框
        items: [
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航一', color: '#000', link: '' },
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航二', color: '#000', link: '' },
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航三', color: '#000', link: '' },
          { image: 'http://freephotos.online/wp-content/uploads/50208-abstract-banner.jpg', name: '导航四', color: '#000', link: '' }
        ]
      }
      
    },
  /******************************组件标题******************************************/
    {
      name: '组件标题',
      icon: 'componentTitle',
      type: 'componentTitle',
      options: {
        dialogVisible: false, // 选择样式弹出框
        display: 'flex',
        lineHeight: '',
        fontSize: '14',
        color: '#000',
        background: '#fff',
        linkColor: '#1a0dab', // 链接颜色
        styles: '1',
        defaultValue: '热销推荐'
      }
    },
    {
      name: '组件标题',
      icon: 'componentTitle',
      type: 'componentTitle',
      options: {
        dialogVisible: false, // 选择样式弹出框
        display: 'flex',
        lineHeight: '',
        fontSize: '14',
        color: '#000',
        background: '#fff',
        linkColor: '#1a0dab', // 链接颜色
        styles: '2',
        defaultValue: '热销推荐'
      }
    },
    {
      name: '组件标题',
      icon: 'componentTitle',
      type: 'componentTitle',
      options: {
        dialogVisible: false, // 选择样式弹出框
        display: 'flex',
        lineHeight: '',
        fontSize: '14',
        color: '#000',
        background: '#fff',
        linkColor: '#1a0dab', // 链接颜色
        styles: '3',
        defaultValue: '热销推荐'
      }
    },
    {
      name: '热区',
      icon: 'hotspot',
      type: 'hotspot',
      options: { width: '', height: '', lineHeight: '' }
    },
    {
      name: '分类导航',
      icon: 'postion',
      type: 'postion',
      options: { whiteSpace: 'nowrap' }
    },
    {
      name: '组件距离',
      icon: 'componentDistance',
      type: 'componentDistance',
      options: {
        height: '10',
        lineHeight: '',
        background: 'red'
      }
    }
    // {
    //   name: '文本',
    //   icon: 'component',
    //   type: 'text',
    //   options: {
    //     height: '',
    //     lineHeight: '',
    //     fontSize: '20',
    //     color: '#000',
    //     defaultValue: '文本内容'
    //   }
    // },
  ]
  export default data
  