
<style lang="scss">

    .window{
        &__wrap{
            height: 100%;
            position: relative;
            overflow-y: scroll;
        }
        &__cont{
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            transition: top .3s;
        }
        &__item{
            height: 42px;
            padding: 10px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f5f6f7;
            color: #666;
            transition: all .2s;
            box-sizing: border-box;
            &.window__selected{
                background: #fff;
                color: #666;
                box-shadow: inset 2px 0 0 0 #ec5e2a;
            }
        }

    }

</style>

<template>
    
    <div class="window__wrap">

        <div 
            class="window__cont"
            :style="{ top: scrollTop + 'px' }"
        >
            <div
                v-for="(item, index) in list"
                :key="index"
                class="window__item"
                :class=" [ index == windowItemSelected ? 'window__selected' : '' ] "
                @click="windowItemClick(index)"
            >
                <wk-elip :content="item.name" :line="2"></wk-elip>
            </div>
        </div>

    </div>
        
        


</template>

<script>

    import wkElip from '@c/elip'
    import { boundingClientRect } from './adapter'

    export default {
        components: {
            wkElip
        },
        props: {
            list: {
                type: Array,
                default: []
            },
            current: {
                type: [Number, String],
                default: 0
            }
        },
        data(){
            return {
                windowItemSelected: NaN,
                thresholdT: -4,
                thresholdB: 3,
                scrollTop: 0
            }
        },
        watch: {
            windowItemSelected(val){
                
                // let top = val + this.thresholdT
                // let contH = this.list.length * 70
                // boundingClientRect('.window__wrap').then( wrap => {

                //     if(top >= 0){
                //         this.scrollTop = Math.abs(top * -70) > Math.abs(wrap.height - contH) ? wrap.height - contH : top * -70
                //     }else if(top < 0){
                //         this.scrollTop = 0 * -70
                //     }
                    
                //     this.$emit('change', val, this.list[val])

                // })
                this.$emit('change', val, this.list[val])
            },
            list(val){
                if(val.length <= 0) return
                this.windowItemSelected = this.current
            }
        },
        methods: {
            windowItemClick(index){
                this.windowItemSelected = index
            }
        },
        mounted(){
            if(this.list.length <= 0) return
            this.windowItemSelected = this.current
        }
    }

</script>

