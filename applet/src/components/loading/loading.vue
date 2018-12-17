
<style lang="scss">

    @-webkit-keyframes load{
        from{-webkit-transform: rotate(0deg);}
        to{-webkit-transform: rotate(360deg);}
    }
    @-webkit-keyframes load_icon{
        from{-webkit-transform: translate(-50%, -50%) rotate(0deg);}
        to{-webkit-transform: translate(-50%, -50%) rotate(-360deg);}
    }
    .loading{
        &__contain{
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0; top: 0;
            z-index: 9999;
        }
        &__wrap{
            width: 200rpx;
            height: 200rpx;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 20rpx;
            overflow: hidden;
            margin-left: -100rpx;
            margin-top: -100rpx;
            position: absolute;
            left: 50%;
            top: 50%;
        }
        &__none{
            display: none;
        }
        &__cont{
            width: 140rpx;
            height: 140rpx;
            border-radius: 50%;
            border: 1px solid rgb(231, 231, 231);
            border-left: 2px solid #d17b00;
            animation: load 1s linear infinite;
        }
        &__icon{
            width: 100rpx;
            height: 100rpx;
            position: absolute;
            left: 50%;top: 50%;
            background-size: cover; 
            background-position: center center; 
            transform-origin: center center;
            animation: load_icon 2s linear infinite;
        }
    }

</style>

<template>
    
    <view :style="{ display: !loadBol ? 'none' : 'flex'  }" class="loading__contain">
        <view class="loading__wrap">
            <view class="loading__cont"></view>
            <view class="loading__icon":style="{ 'background-image': 'url(' + icon + ')' }"></view>
        </view>
    </view>

</template>

<script>

    import { iconBase64 } from './iconBase64'

    export default {
        data() {
            return {
                loadBol: false
            }
        },
        props: {
            type: {
                type: String,
                default: 'LOADICON'
            }
        },
        computed: {
            icon(){
                const url = iconBase64[this.type]
                return require(`${url}`)
            }
        },
        methods: {
            show(){
                this.loadBol = true
            },
            hide(){
                this.loadBol = false
            },
            timeOut(time){
                this.loadBol = true
                this.$apply()
                setTimeout(() => {
                    this.loadBol = false
                    this.$apply()
                }, time)
            },
            // setCanvas(){
            //     let M = Math,
            //         PI = Math.PI,
            //         TWOPI = PI * 2,
            //         HALFPI = PI / 2,
            //         canvas = wx.createCanvasContext('firstCanvas'),
            //         width = 100,
            //         height = 100,
            //         count = 35,
            //         sizeBase = 0.1,
            //         sizeDiv = 4,
            //         tick = 0;

            //     (function loop() {
            //         requestAnimationFrame( loop );  
            //         canvas.clearRect( -width / 2, -height / 2, width, height );
            //         canvas.fillStyle = '#fff';  
            //         var angle = tick / 6,
            //             radius = -30 + M.sin( tick / 15 ) * 20,
            //             size;
                    
            //         for( var i = 0; i < count; i++ ) {
            //             angle += PI / 64;
            //             radius += i / 30;
            //             size = sizeBase + i / sizeDiv;
                        
            //             canvas.beginPath();
            //             canvas.arc( M.cos( angle ) * radius + width / 2, M.sin( angle ) * radius + height / 2, size, 0, TWOPI, false );
            //             canvas.fillStyle = '#269dd8';
            //             canvas.fill();
                        
            //             canvas.beginPath();
            //             canvas.arc( M.cos( angle ) * -radius + width / 2, M.sin( angle ) * -radius + height / 2, size, 0, TWOPI, false );
            //             canvas.fillStyle = '#d8269d';
            //             canvas.fill();
                        
            //             canvas.beginPath();
            //             canvas.arc( M.cos( angle + HALFPI ) * radius + width / 2, M.sin( angle + HALFPI ) * radius + height / 2, size, 0, TWOPI, false );
            //             canvas.fillStyle = '#d8d826';
            //             canvas.fill();
                        
            //             canvas.beginPath();
            //             canvas.arc( M.cos( angle + HALFPI ) * -radius + width / 2, M.sin( angle + HALFPI ) * -radius + height / 2, size, 0, TWOPI );
            //             canvas.fillStyle = '#ff0000';
            //             canvas.fill();
                        
            //         }
            //         canvas.draw()
            //         tick++;
            //     })();
            // }
        },
        mounted(){
            // this.setCanvas()
        }
    }

</script>
