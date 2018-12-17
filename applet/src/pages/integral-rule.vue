<style lang="scss">
    .integral_rule{
        &_wrap{
            width: 100%;
            box-sizing: border-box;
            padding:30rpx 60rpx 20rpx 30rpx;
        }
        &_content{
            header{
                color: #333333;
                font-size: 34rpx;
                padding-bottom: 25rpx;
            }
            div{
                font-size: 26rpx;
                color:#999999;
                line-height: 40rpx;
            }
        }
    }
</style>
<template>
    <div class="integral_rule_wrap">
        <div  class="integral_rule_content">
            <header>积分规则</header>
            <div v-for="(item,index) in ruleList" :key="index">
                {{item.rule_content}}
            </div>
        </div>
    </div>
</template>
<script>
    import {EXT , getIntegralRule} from '../api/api'

    export default {
        data(){
            return{
                ruleList:[]
            }
        },
        mounted(){
            wx.showLoading({
                title:'加载中...'
            })
            getIntegralRule().then(res =>{
                console.log(res)
                this.ruleList = res.data.items
            })
            wx.hideLoading()
        }
    }
</script>
