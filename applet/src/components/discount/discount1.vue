<template>
    <div class="discount1" style="margin:10rpx 0;">
        <div class="body">
            <div class="body-l">
                <div class="sum">
                    <span>50</span>元
                </div>
                <div class="condition">满100减50</div>
            </div>
            <div class="body-r">
                <div class="describe">优惠券</div>
                <div class="get"><span>立即领取</span></div>
                <div class="expire">期限：至2017/12/30</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{

            }
        }
    }
</script>
<style lang="scss" scoped>
    .discount1{
        width:100%;
        font-family:PingFang-SC-Medium;
        .body{
            width:712rpx;
            height:144rpx;
            background:#fff;
            border-radius:8rpx;
            font-size:15px;
            margin:0 auto;
            text-align:center;
            color:#fff;
            display: flex;
            justify-content: space-between;
            .body-l{
                box-sizing:border-box;
                border-top-left-radius: 8rpx;
                border-bottom-left-radius: 8rpx;
                padding-top:20rpx;
                background:linear-gradient(0deg,rgba(243,54,32,1),rgba(243,130,34,1));
                width:30%;
                height:100%;
                .sum{
                    span{
                        font-size:28px;
                    }
                }    
            }
            .body-r{
                width:70%;
                height:100%;
                text-align:left;
                box-sizing:border-box;
                padding:0 32rpx;
                .describe{
                    color:#000;
                    font-size:18px;

                }
                .get{
                    display: flex;
                    justify-content:flex-end;
                    span{
                        height:56rpx;
                        width:148rpx;
                        font-size:14px;
                        line-height:56rpx;
                        text-align:center;
                        border-radius:30rpx;
                        background:linear-gradient(0deg,rgba(243,54,32,1),rgba(243,130,34,1));
                    }
                }
                .expire{
                    color:#666;
                    font-size:12px;
                }
            }
            
        }
    }
</style>