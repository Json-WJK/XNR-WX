
<style lang="scss">

    .count_picker{
        &_wrap{
            display: flex;
            .count__btn{
                width: 25px;
                height: 25px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 7px;
                flex-shrink: 0;
            }
        }
        &_plus{
            background: url('./plus.png') no-repeat center center/cover;
        }
        &_reduce{
            background: url('./reduce.png') no-repeat center center/cover;
        }
        &_number{
            flex-grow: 1;
            font-size: 15px;
            text-align: center;
            padding: 0 5px;
        }
    }
    .visibility{
        visibility: hidden;
    }

</style>

<template>

    <div class="count_picker_wrap">
        <div
            class="count_picker_reduce count__btn"
            :class=" number ? '' : 'visibility' "
            @click.stop="reduce"
        >
        </div>

        <div
            class="count_picker_number"
            :class=" number ? '' : 'visibility' "
        >
            {{number}}
        </div>

        <div class="count_picker_plus count__btn" @click.stop="plus"></div>
    </div>

</template>

<script>

    import wkIcon from '../../components/icon/icon'

    export default {
        components: {
            wkIcon
        },
        props: {
            conut: {
                type: [String, Number],
                default: 0
            },
            min: {
                type: [String, Number],
                default: 0
            },
            max: {
                type: [String, Number],
                default: 10
            },
            id: null
        },
        data(){
            return {
                number: 0
            }
        },
        watch: {
            conut(val){
                this.number = val
            }
        },
        updated(){
            this.number = this.conut
        },
        methods: {
            reduce(e){
                this.number--
                if(!(this.number < this.min)){
                    this.$emit('change', this.number, this.id, e)
                }
                this.number = this.number < this.min ? this.min : this.number
            },
            plus(e){
                this.number++
                if(!(this.number > this.max)){
                    this.$emit('change', this.number, this.id, e)
                }
                this.number = this.number > this.max ? this.max : this.number
            }
        },
        mounted(){
            this.number = this.conut
        }
    }

</script>

