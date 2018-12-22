<template>
    <div class="container">
        <common v-for="(item, index) in config" :key="index" :options="item"></common>
        <tab-ber at=0></tab-ber>
    </div>
</template>

<script>
    import tabBer from '../components/tabBer/tabBer'
    import { getCategories, getFoods, getExtJson,getwxconfig } from '@/api'
    import common from '../components/common'
    import data from '../data.js'
    export default {
        data () {
            return {
                config: []
            }
        },
        components: {
            common,
            tabBer
        },
        methods: {

        },
        mounted() {
            // wx.setNavigationBarTitle({
            //     title: '动态修改的页面'
            // }),
            // console.log(data)
            // getCategories().then(res => {
            //     console.log(res)
            // })
            // getCategoriess().then(res => {
            //     console.log(res)
            // })
            // getFoods({typeId:1,restaurantId:1}).then(res => {
            //     console.log(res)
            // })
            // getExtJson().then(res => {
            //     console.log(res)
            // })
            this.config = wx.getExtConfigSync ? wx.getExtConfigSync().config : {}
            this.config = data
            // getwxconfig().then(res => {
            //     this.config = res.data
            //     console.log(res)
            // })
            //console.log(wx.getExtConfigSync())
        }
    }
</script>

<style scoped lang="scss">
    .container{
        box-sizing: border-box;
        padding-bottom:96rpx;
    }
</style>
