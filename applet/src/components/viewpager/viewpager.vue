<template>
    <div class="wrap">
        <swiper class="swiper"  circular="true" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
            <block v-for="(item, index) in movies" :index="index" :key="key">
                <swiper-item>
                    <img :src="item.img" class="slide-image" mode="aspectFill"/>
                </swiper-item>
            </block>
        </swiper>
    </div>
</template>

<script>
    export default {
        name: "carousel",
        props: {
            movies: {
                type: Array,
                default: []
            },
        },
        data() {
            return {

            }
        },
        methods: {

        },
        mounted() {

        }
    };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    .wrap{
        width: 750rpx
        .swiper{
            width: 750rpx
            height: 750rpx
            image{
                width: 100%
                height: 100%

            }
        }
    }
</style>
