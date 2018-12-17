<template>
    <div class="container">
        <!-- <img :src="getlogoImg" alt="" class="logo"> -->
        <!-- <div class="name">{{name}}</div> -->
        
        <button open-type="getUserInfo" 
            @getuserinfo="bindGetUserInfo" class="btn">
            <span class="iconfont">&#xe603;</span>微信授权登录
        </button>
        <div class="tips">
            请在微信授权后放心使用<br>
            您的信息和数据将受到保护
        </div>
    </div>
</template>
<style lang="scss">
@font-face {
    font-family: 'iconfont'; /* project id 823178 */
    src: url('//at.alicdn.com/t/font_823178_uxkpvdui4o.ttf') format('truetype');
}
.iconfont {
    font-family: 'iconfont' !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
.container {
    text-align: center;
    margin-top: 200px;
    .logo {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        box-shadow: 1px 1px 2px 2px #666;
        margin-top: 30px;
    }
    .name {
        font-size: 24px;
        margin: 20px 0;
    }
    .tips {
        font-size: 18px;
        color: #999;
        margin-top: 10px;
    }
    .btn {
        width: 230px;
        line-height: 40px;
        border-radius: 20px;
        color: #fff;
        background: #1aac19;
        margin-top: 20px;

        span {
            font-size: 20px;
            margin-right: 5px;
        }
    }
}
</style>
<script>
import { getRestaurants } from '@/api'
export default {
    data() {
        return {
            ext: {},
            name: '',
            logoImg: '',
            baseUrl: ''
        }
    },
    methods: {
        bindGetUserInfo(e) {
            console.log(e.mp.detail, e.mp.detail.errMsg);
            
            if (e.mp.detail.userInfo) { 
                wx.navigateBack({
                    delta: 1
                })
            } else {
                wx.showModal({
                    title: '警告',
                    content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入',
                    confirmText: '返回授权',
                    showCancel: false,
                    success: function(res) {},
                    fail: function(res) {
                        console.log(res)
                    }
                })
            }
        }
    },
    mounted() {
        this.ext = wx.getStorageSync('ext')
    }
}
</script>
