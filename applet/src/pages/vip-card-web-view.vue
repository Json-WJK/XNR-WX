
<style lang="scss">
</style>

<template>
    
    <web-view :src="src"></web-view>

</template>

<script>

export default {
    data() {
        return {
            src: ''
        }
    },
    onHide() {
        console.log(123)
        this.src = ''
    },
    mounted() {
        console.log('s1', decodeURIComponent(this.$mp.query.url))
        this.src = decodeURIComponent(this.$mp.query.url)
    }
}
</script>