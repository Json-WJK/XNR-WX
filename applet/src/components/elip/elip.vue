
<style lang="scss">

    .wack-elip {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .elip--multiple {
        white-space: normal;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }

</style>

<template>
    
    <view 
        :class="[ 'wack-elip', line > 1 ? 'elip--multiple' : '']" 
        :style="{ '-webkit-line-clamp': line > 1 ? line : 1 }"
    >
        <slot></slot>
        {{content}}
    </view>

</template>

<script>

    export default {
        props: {
            line: {
                type: [String, Number],
                default: 1
            },
            content: {
                type: String,
                default: ''
            }
        }
    }

</script>

