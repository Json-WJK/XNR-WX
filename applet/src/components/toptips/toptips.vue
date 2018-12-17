
<style lang="scss">
    .toptips{
        width: 100%;
        min-height: 64rpx;
        line-height: 64rpx;
        font-size: 28rpx;
        text-align: center;
        color: #fff;
        background-color: #e64340;
        z-index: 999;
        opacity: 0;
        transform: translateZ(0) translateY(-100%);
        transition: all .3s ease;
        display: block;
        position:fixed;
        top: 0; left: 0;
    }
    .toptips__show{
        transform: translateZ(0) translateY(0);
        opacity: 1;
    }
</style>

<template>
    <view class="toptips" :class="{ 'toptips__show': show }">
        {{cont}}
    </view>
</template>

<script>

    export default {
        props: {
            content: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: {}
            },
            timer: {
                type: [String, Number],
                default: ''
            }
        },
        data(){
            return {
                show: false,
                contSelf: ''
            }
        },
        computed: {
            cont(){
                return this.contSelf || this.content
            }
        },
        methods: {
            showToptips(options){
                this.show = true

                if(options){
                    if(options.timer){
                        this.setShow(options.timer)
                    }
                    if(options.content){
                        this.contSelf = options.content
                    }
                }else if(this.timer) {
                    this.setShow(this.timer)
                }
            },
            hideToptips(){
                this.show = false
            },
            setShow(timeout){
                let timer = setTimeout(() => {
                    this.show = false
                    clearTimeout(timer)
                    timer = null
                }, timeout);
            }
        }
    }

</script>
