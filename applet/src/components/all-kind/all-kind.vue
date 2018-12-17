
<style lang="stylus">
    .star{
        &_bgimg{
            width: 100%;
            height: 230rpx;
            background-position:center;
            background-size:cover;
        }
        &_red{
            width: 100%;
            box-sizing: border-box;
        }
        &_allkind{
            position: relative;
            height: 141rpx;
            border-radius:8rpx 8rpx 0 0;
            color:white;
            background-image: linear-gradient(to right, #ff617e, #ff4961);
            display: flex;
            padding:15rpx 42rpx 0 45rpx;
            overflow: hidden;
            .star_left{
                display: flex;
                padding-top: 8rpx;
                .money{
                    width: 133px;
                    position: relative;
                    box-sizing: border-box;
                    display: flex;
                    height: 100rpx;
                    align-items: center;
                    overflow: hidden;
                    flex-shrink: 0;
                    view{
                        display: flex;
                    }
                    .icon_money{
                        font-size: 40rpx;
                    }
                    .ral_money{
                        font-size: 70rpx;
                    }
                    &:after{
                        position: absolute;
                        top:2rpx;
                        right: 0;
                        content: "";
                        height: 100%;
                        border-left: 2rpx dashed #fff;
                    }
                }

                .kind{
                    width: 171px;
                    height: 100rpx;
                    align-items: center;
                    box-sizing: border-box;
                    padding-left: 45rpx;
                    overflow: hidden;
                    .all_kind{
                        font-size:38rpx;
                    }
                    .all_subtraction{
                        font-size:30rpx;
                        margin-top: 5rpx;
                    }
                }
            }
            .star_right{
                flex:.1;
                font-size: 24rpx;
            }
            text{
                display: block;
            }
            .star_strip_yes{
                background: url('../../../static/img/line.png');
            }
            .star_strip_no{
                background: url('../../../static/img/line-no.png');
            }
        }
        &_dis_allkind{
            background-image: linear-gradient(to right, #dcdcdc, #dcdcdc);
        }
        &_strip{
            width: 100%;
            height: 7rpx;
            position: absolute;
            left: 0;
            bottom: 0;
            background-repeat: no-repeat;
            background-size: cover;
        }
        &_time{
            display: flex;
            box-sizing: border-box;
            background-color: white;
            width: 100%;
            height: 24px;
            box-shadow: 3px 5px 21px 8px #fff6f7;
            align-items: center;
            padding-left: 21px;
            color:#666;
            font-size: 12px;
            border-radius: 0 0 8rpx 8rpx;
        }
    }
</style>

<template>

    <div class="star_red">

        <view class="star_allkind" :class="[!bgColor ? 'star_dis_allkind' : '' ]">

            <view class="star_left">

                <view class="money">
                    <view :style="{'margin-top':'20rpx'}" class="icon_money">￥</view>
                    <view class="ral_money"><wk-elip :content="money" :line="1"></wk-elip></view>
                </view>

                <view class="kind">
                    <view class="all_kind">
                        <wk-elip :content="kind" :line="1"></wk-elip>
                        <view class="all_subtraction">
                            <wk-elip :content="subtraction" :line="1" ></wk-elip>
                        </view>
                    </view>
                </view>

            </view>

            <view class="star_strip" :class=" [ bgColor ? 'star_strip_yes' : 'star_strip_no' ] "></view>

        </view>

        <view class="star_time">{{time}}</view>

    </div>

</template>

<script>

    import wkElip from '@c/elip'

    export default {
        components: {
            wkElip
        },
        props: {
            money:{
                type: [String,Number],
                default: 0
            },
            kind:{
                type: String,
                default: ''
            },
            subtraction:{
                type: String,
                default: ''
            },
            time:{
                type: String,
                default: ''
            },
            bgColor:{
                type: Boolean,
                default: false
            }
        }
    }

</script>
