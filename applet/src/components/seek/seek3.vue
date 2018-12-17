<template>
    <div class="seek3">
        <input type="text" placeholder="输入搜索内容" :style="{textAlign}" @focus="focusChange('left')" @blur="focusChange('center')">
    </div>
</template>
<script>
    export default{
        props:{
            options:Object
        },
        data(){
            return{
                textAlign:"center"
            }
        },
        methods:{
            focusChange(fon){
                this.textAlign=fon
            },
        }
    }
</script>
<style lang="scss" scoped>
    .seek3{
        background:#fff;
        padding:10rpx 0;
        width:100%;
        input{
            width:90%;
            margin:0 auto;
            background:#E5E5E5;
            border-radius: 25rpx;
        }
    }
    .center{
        text-align: center;
    }
</style>