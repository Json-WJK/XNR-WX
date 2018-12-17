<template>
    <div class="memu" :style="{background:options.background}">
        <div class="box">
            <span v-for="(item,index) in options.ify" :key="index" class="items" :style="index==highlight?{color:options.highlight}:''" @click="ify(index)">{{item}}</span>
        </div>
    </div>
</template>
<script>
    export default{
        props:{
            options:Object
        },
        data(){
            return{
                highlight:0
            }
        },
        methods:{
            ify(i){
                this.highlight=i
            }
        }
    }
</script>
<style lang="scss" scoped>
    .memu{
        margin:10px 0;
        box-sizing: border-box;
        overflow-x: auto;
        height:70rpx;
        line-height:60rpx;
        .box{
            white-space:nowrap;
            .items{
                padding:0 20rpx;
                font-size:17px;
                color:#333;
            }
        }
    }
    .memu::-webkit-scrollbar {
        display:none;
    }
</style>