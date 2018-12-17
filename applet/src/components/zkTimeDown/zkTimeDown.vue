<template>
    <div>
        <span><wk-icon type="clock" size="28" color="#e31436"></wk-icon></span>
        <span>  {{time}}</span>
    </div>
</template>

<script>
  import wkIcon from '../../components/icon/icon'
  export default{
    components: {
        wkIcon
    },
    data () {
      return {
        time : '',
        flag : false
      }

    },
    mounted () {
      let time = setInterval(()=>{
        if(this.flag == true){
          clearInterval(time)
        }
        this.timeDown()
      },1000)
    },
    props : {
      endTime : {
        type : Number
      }
    },
    methods : {
      timeDown () {
        if (!this.endTime) {
          return
        }
        const endTime = new Date(this.endTime)
        const nowTime = new Date();
        let leftTime = parseInt((endTime.getTime()-nowTime.getTime())/1000)
        let d = parseInt(leftTime/(24*60*60))
        let h = this.formate(parseInt(leftTime/(60*60)%24))
        let m = this.formate(parseInt(leftTime/60%60))
        let s = this.formate(parseInt(leftTime%60))
        if(leftTime <= 0){
          this.flag = true
          this.$emit('time-end')
        }
        // this.time = `${d}:${h}:${m}:${s}`
        this.time = `${m}:${s}`
      },
      formate (time) {
        if(time>=10){
          return time
        }else{
          return `0${time}`
        }
      }
    }
  }
</script>

<style scoped>

</style>
