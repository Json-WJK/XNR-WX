
<style lang="scss">
</style>

<template>
    
    <web-view :src="url"></web-view>

</template>

<script>
// copyright 转跳页
export default {
    data() {
        return {
            url: ''
        }
    },
    mounted() {
        this.url = decodeURIComponent(this.$root.$mp.query.url)
        console.log(url);
        
    }
}
</script>
