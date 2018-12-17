
<style lang="scss">

    .carousel__contain {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .carousel__wrap{

        width: 100%;
        height: 100%;
        position: relative;
        swiper{
            position: relative;
        }
        .item {
            width: 100%;
            height: 100%;
        }
        .slide__image{
            width: 100%;
            height: 100%;
        }

        @at-root{
            .dots__cont{
                display: flex;
                font-size: 0;
                height: 84rpx;
                justify-content: space-between;
                align-items: center;
            }

            .dots__item{
                width: 20rpx;
                height: 20rpx;
                border-radius: 50%;
                margin: 0 6rpx;
                background: rgba(0, 0, 0, .5);
                display: inline-block;
                vertical-align: middle;
                overflow: hidden;
            }
            .dots__active{
                background: #fff;
            }

            .dots__wrap__left{
                position: absolute;
                left: 0; bottom: 0;
                margin-left: 30rpx;
            }

            .dots__wrap__right{
                position: absolute;
                right: 0; bottom: 0;
                margin-right: 30rpx;
            }

            .dots__wrap__center{
                position: absolute;
                left: 50%; bottom: 0;
                transform: translateX(-50%)
            }
        }
    }

    .carousel__mask{
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        box-sizing: border-box;
        position: absolute;
        left: 0; bottom: 0;
        background: rgba(0, 0, 0, .5);
        text-indent: 20rpx;
        color: #fff;
        font-size: 32rpx;
    }
    .__mask{
        width: 100%;
        position: absolute;
        left: 0; bottom: 0;
        box-sizing: border-box;
    }
    .__wrap{
        position: relative;
    }

</style>

<template>

    <div :class="[className ? className + ' __wrap' : 'carousel__contain']" v-if="carouselData.display">
        <swiper
            class="carousel__wrap"
            :indicator-dots="false"
            :autoplay="carouselData.autoplay"
            :interval="carouselData.interval"
            :duration="carouselData.duration"
            :circular="carouselData.loop"
            @change="change"
        >

            <block v-for="(item, index) in carouselData.items" :key="index">
                <swiper-item>

                    <div class="item" :data-url="item.link" @tap="imageClick($event, item.imgUrl)">

                        <img
                            :src="item.imgUrl"
                            :mode="carouselData.mode"
                            class="slide__image"
                        />

                        <div
                            v-if="carouselData.maskStatus "
                            :class="[ carouselData.maskClass ? carouselData.maskClass : 'carousel__mask', '__mask' ]"
                        >{{ item.maskText }}</div>

                    </div>

                </swiper-item>
            </block>

        </swiper>

        <div
            :class="[!carouselData.dotsPosition ? 'dots__wrap__center' : 'dots__wrap__' + carouselData.dotsPosition]"
            v-if="carouselData.dots"
        >
            <div class="dots__cont">
                <block v-for="(item, index) in carouselData.items" :key="index">
                    <div
                        :class="[carouselData.dotsClass || 'dots__item', currentDot === index ? carouselData.dotsActiveClass || 'dots__active' : '' ]"
                        :style="{ background: currentDot === index ? carouselData.dotsActiveColor : carouselData.dotsColor }"
                    >
                    </div>
                </block>
            </div>
        </div>

    </div>

</template>

<script>

    // import { Swiper, Slide } from 'vue-swiper-component'
    import wx from 'wx'

    export default {
        name: 'wkCarousel',
        components: {
            // Swiper,
            // SwiperItem: Slide
        },
        props: {
            carouselConfig: {
                type: Object,
                default: () => {}
            },
            className: {
                type: String,
                default: ''
            }
        },
        computed: {
            carouselData(){
                return {
                    items: this.carouselConfig.items,
                    maskStatus: this.carouselConfig.maskStatus,
                    display: typeof this.carouselConfig.display == 'boolean' ? this.carouselConfig.display : true,
                    autoplay: typeof this.carouselConfig.autoplay == 'boolean' ? this.carouselConfig.autoplay : true,
                    dots: typeof this.carouselConfig.dots == 'boolean' ? this.carouselConfig.dots : true,
                    dotsColor: this.carouselConfig.dotsColor || 'rgba(0, 0, 0, .5)',
                    dotsActiveColor: this.carouselConfig.dotsActiveColor || '#fff',
                    dotsPosition: this.carouselConfig.dotsPosition ? this.carouselConfig.dotsPosition : this.carouselConfig.maskStatus ? 'right' : 'center',
                    dotsClass: this.carouselConfig.dotsClass || '',
                    dotsActiveClass: this.carouselConfig.dotsActiveClass || '',
                    loop: typeof this.carouselConfig.loop == 'boolean' ? this.carouselConfig.loop : true,
                    maskStatus: typeof this.carouselConfig.maskStatus == 'boolean' ? this.carouselConfig.maskStatus : false,
                    maskClass: this.carouselConfig.maskClass || '',
                    interval: this.carouselConfig.interval || 3000,
                    duration: this.carouselConfig.duration || 500,
                    mode: ''
                }
            }
        },
        data(){
            return {
                currentDot: 0
            }
        },
        methods: {
            change(e){
                this.currentDot = e.mp.detail.current
            },
            imageClick(e, imgUrl){
                if(e.mp.currentTarget.dataset.url){
                    const path = e.mp.currentTarget.dataset.url
                    const url = path.indexOf('?') != -1 ? `../${path.substr(0, path.indexOf('?'))}/main${path.substr(path.indexOf('?'))}` : `../${path}/main`
                    wx.navigateTo({ url })
                }else {
                    const urls = this.carouselData.items.map( item => item.imgUrl)
                    wx.previewImage({
                        current: imgUrl,
                        urls
                    })
                }
            }
        }
    }

</script>
