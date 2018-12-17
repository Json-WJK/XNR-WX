
<style lang="scss">

    .nav__bar{
        &_wrap{
            border-bottom: 1rpx solid #eee;
            &_not_border{
                border-bottom: none;
            }
        }
        &_cont{
            display: flex;
            height: 70rpx;
            line-height: 70rpx;
            position: relative;
        }
        &_items{
            flex-shrink: 0;
            text-align: center;
            font-size: 30rpx;    
        }
        &_pointer{
            height: 1rpx;
            position: absolute;
            bottom: 1rpx;
            left: 0;
        }
    }

</style>

<template>
    
    <view class="nav__bar_wrap" :class="{ 'nav__bar_wrap_not_border': !border }">

        <scroll-view 
            :scroll-x="true" 
            class="nav__bar" 
            :scroll-with-animation="animate"
            :scroll-left="scrollLeft"
            @scroll="scrollMove"
        >

            <view class="nav__bar_cont">
                <block v-for="(item, index) in labelData" :key="index">

                    <view 
                        class="nav__bar_items" 
                        :style="{ width: width + 'rpx', color: index == selectedId ? selectedColor : '', }" 
                        @tap="click" 
                        :data-index="index"
                    >
                        {{item.title}}
                    </view>

                </block>
                <view 
                    class="nav__bar_pointer" 
                    :style="{ width: width + 'rpx', 'background-color': selectedColor, left: pointerLeft + 'rpx', transition: transition / 1000 + 's' }"
                    v-if="pointer"
                ></view>
            </view>
            
            
        </scroll-view>

    </view>

</template>

<script>

    /* 
    * labelData Array 导航的内容 默认空
    * animate Boolean 是否动画 默认true
    * selectedColor Boolean 选中的颜色 默认 #fc3e62
    * transition Number 动画的时间（毫秒）默认300
    * defaultIndex Number 默认选中的
    * pointer true 指示器是否显示
     */

    export default {
        props: {
            labelData: {
                type: Array,
                default: []
            },
            animate: {
                type: Boolean,
                default: false
            },
            selectedColor: {
                type: String,
                default: '#fc3e62'
            },
            transition: {
                type: Number,
                default: 300
            },
            defaultIndex:{
                type: Number,
                default: 0
            },
            pointer:{
                type: Boolean,
                default: true
            },
            border: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                width: 0,
                scrollLeft: 0,
                selectedId: 0,
                pointerLeft: 0
            }
        },
        watch: {
            labelData(newVal){
                this.labelComponted(newVal)
            },
            defaultIndex(newVal){
                this.move(newVal)
            }
        },
        methods: {
            labelComponted(newVal){
                this.width = parseInt(750 / (newVal.length > 5 ? 5 : newVal.length)) // 动态计算宽度页面最多可以现实5个不滚动
                // this.move(this.defaultIndex)
            },
            move(index){
                this.selectedId = index
                this.pointerLeft = index * this.width
                setTimeout(() => {
                    this.scrollLeft = (this.pointerLeft-this.width*2.2) / 2 // 计算scrollLeft值 指示器的左边距离 减去 没一个宽度的2.2倍得出navbar向左移动的距离（px）在除以2得到rpx 
                }, 100);
                this.$emit('tabchange', {
                    index: index,
                })
            },
            click(e){
                let index = e.currentTarget.dataset.index
                this.move(index)
            },
            scrollMove(e){
                // this.scrollLeft = e.mp.detail.scrollLeft
            }
        },
        mounted(){
            this.labelComponted(this.labelData)
        },
        onShow(){
            this.move(3)
        }
    }

</script>

