<template>
    <div class="wrap-goods-remark">
        <div class="remark-text">
            <textarea
                placeholder="添加您的需求（最多50字）"
                placeholder-style="color: #cccccc"
                maxlength="50"
                v-model="textVal">
            </textarea>
            <div class="text-num">{{ textNum }}/50</div>
        </div>
        <div class="shortcut">
            <div class="shortcut-header">快捷标签</div>
            <span class="shortcut-content"
                v-for="tag in tags"
                :key="index"
                :class="{shortcutSelect: tag.active}"
                @click="addShortcut(index)">{{ tag.name }}</span>
        </div>
        <button class="remark-btn" @click="goBackPay">确定</button>
    </div>
</template>

<script>
    export default {
        name: "order-remark",
        data() {
            return {
                textVal: '',
                tags: [
                    {
                        name: '不吃辣',
                        active: false
                    },
                    {
                        name: '少放辣',
                        active: false
                    },
                    {
                        name: '多放辣',
                        active: false
                    },
                    {
                        name: '不吃蒜',
                        active: false
                    },
                    {
                        name: '不吃香菜',
                        active: false
                    },
                    {
                        name: '不吃葱',
                        active: false
                    }
                ],

            }
        },
        //计算属性可以从新定义一个数据，这个数据可以进行热更新
        computed: {
            textNum: function () {
                return this.textVal.length
            }
        },
        methods: {
            goBackPay() {
                wx.setStorageSync('remark', this.textVal)
                this.$router.back()
            },
            addShortcut(index) {
                console.log(index)
                if(this.textVal.length > 50) {
                    wx.showToast({
                        title: '最多50字',
                        icon: 'none',
                        duration: 500,
                        mask: true
                    })
                }else {
                    this.textVal = `${this.textVal} ${this.tags[index].name}`.trim()
                    this.tags[index].active = true
                }
            }
        },
        mounted() {
            Object.assign(this, this.$options.data())
            this.textVal = wx.getStorageSync('remark') || ''
        }
    }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    .wrap-goods-remark{
        width: 100%
        padding 30rpx 30rpx
        box-sizing border-box
        .remark-text{
            width: 100%
            border 1rpx solid #cccccc
            background-color white
            padding 30rpx
            box-sizing border-box
            textarea{
                width: 100%
                height: 240rpx
                color black
            }
            .text-num{
                text-align right
            }
        }
        .shortcut{
            width: 100%
            color #cccccc
            .shortcut-header{
                width: 100%
                padding-top 30rpx
                box-sizing border-box
            }
            .shortcut-content{
                padding 10rpx
                box-sizing border-box
                border-radius 4rpx
                border 1rpx solid #cccccc
                display inline-block
                margin-top 30rpx
                margin-right 30rpx

            }
            //快捷键 绑定class的样式
            .shortcutSelect{
                color #F5A623
                border 1rpx solid #F5A623
            }
        }
        .remark-btn{
            width: 100%
            line-height: 90rpx
            background-color #F5A623
            text-align center
            border-radius 8rpx
            margin-top 50rpx
            font-size 32rpx
            color white
        }
    }
</style>
