<template>
    <div class="container">
        <common v-for="(item, index) in config" :key="index" :options="item"></common>
    </div>
</template>

<script>
    import { getCategories, getFoods, getExtJson } from '@/api'
    import common from '../components/common'
    import {data} from '../../dist/data.js'
    export default {
        data () {
            return {
                config: []
            }
        },
        components: {
            common
        },
        methods: {

        },
        mounted() {
            // wx.setNavigationBarTitle({
            //     title: '动态修改的页面'
            // }),
            this.config = wx.getExtConfigSync().config
            this.config = data
            // getCategories().then(res => {
            //     console.log(res)
            // })
            // getFoods({typeId:1,restaurantId:1}).then(res => {
            //     console.log(res)
            // })
            // getExtJson().then(res => {
            //     console.log(res)
            // })
            
            //console.log(wx.getExtConfigSync())
        }
    }
</script>

<style scoped lang="scss">

</style>
