<template>
    <div class="tabBer">
        <div v-for="(item,index) in navData.data" :key="index" :style="item.currentSelected?{color:navData.selectedColor}:{color:navData.color}" class="el" @click="currentBar(index,item.pageName)">
            <span><wk-icon :type="item.iconName" size="48"></wk-icon></span>
            <div>{{item.text}}</div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import wkIcon from '../icon'
    export default{
        components:{
            wkIcon
        },
        props:{
            name:String,
            default:'tab1'
        },
        data(){
            return{
                
            }
        },
        computed: {
            ...mapState({
                navData(state) {
                    console.log(state)
                    console.log(state[this.name])
                    // console.log(this.$state.)
                    return state[this.name]
                },
            }),
        },
        methods:{
            ...mapActions([
                'setCurrentBar'
            ]),
            currentBar(index, url){
                console.log(index, url);
                if(this.$router.currentRoute.path !== `${url}`){

                    this.setCurrentBar({
                        name: this.name,
                        index
                    })
                    this.$router.replace({
                        path: `${url}`
                    })
                }

            }
        },
        created(){
            
        }
    }
</script>
<style lang="scss" scoped>
    .tabBer{
        position:fixed;
        bottom:0;
        z-index:999;
        background:#fff;
        width:100%;
        height:96rpx;
        display:flex;
        text-align:center;
        justify-content: space-around;
        align-self: center;
        .el{
            width:100rpx;
            height:100%;
            padding:10rpx 0;
            box-sizing:border-box;
            font-size:10px;
            span{
                height:48rpx;
                width:48rpx;
            }
        }
    }
</style>