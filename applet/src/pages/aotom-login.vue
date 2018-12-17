<template>
    <div class="wrap-login">
        <button @click="login">微信快捷登录</button>
    </div>
</template>

<script>
export default {
    name: 'aotom-login',
    methods: {
        login() {
            this.$router.push({
                path: `/pages/register`
            })
        }
    }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
.wrap-login {
    width: 100%;
    height: 100%;
    background-color: white;
    position: fixed;
    left: 0;
    top: 0;
    padding: 400rpx 80rpx;
    box-sizing: border-box;

    button {
        width: 590rpx;
        height: 80rpx;
        background-color: #249533;
        border-radius: 8rpx;
        line-height: 80rpx;
        text-align: center;
        font-size: 32rpx;
        color: white;
    }
}
</style>
