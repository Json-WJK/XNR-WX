<template>
    <div class="wrap-affirm">
        <div class="affirm-way" @click="toVipCard">
            <div class="way-left">会员卡</div>
            <div class="way-right">
                <div v-if="user_info_id">会员卡支付(还剩:&yen;{{balance}})</div>
                <dir v-else>注册会员卡</dir>
                <div class="right-arr"><wk-icon type="youjiantou" size="40" color="#CBCBCB"></wk-icon></div>
            </div>
        </div>
        <div class="affirm-product">
            <div class="product-header">
                <div class="header-t">{{restaurantName}}</div>
            </div>
            <div class="product-content">
                <div class="content-t" v-for="item in selectedFoods">
                    <div class="t-recomm">
                        <div class="top">{{item.name}}</div>
                        <div class="center">×{{item.number}}</div>
                        <div class="bottom">
                            <wk-price :value="item.price"></wk-price>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 优惠券 -->
            <div class="coupon_wrap" v-if="couponView" @click.stop="closeCoupon">

                <div class="coupon_cont" catchtap="true">

                    <h6>商家代金券</h6>

                    <div class="coupon_list_wrap">
                        <div class="coupon_list" v-if="normalCoupons.length">
                            <div class="title">
                                <p class="text">可用优惠券</p>
                                <p class="line"></p>
                            </div>
                            <div
                                class="coupon_item"
                                v-for="(item, index) in normalCoupons"
                                @click.stop="selectedCoupon(item.id, item.price)"
                            >
                                <my-all-kind
                                    :money="item.price"
                                    :kind="item.name"
                                    :subtraction="item.condition"
                                    :time="item.timer"
                                    :bgColor="item.status"
                                >
                                </my-all-kind>
                            </div>
                        </div>

                        <div class="coupon_list" v-if="abnormalCoupons.length">
                            <div class="title">
                                <p class="text">不可用优惠券</p>
                                <p class="line"></p>
                            </div>
                            <div class="coupon_item" v-for="(item, index) in abnormalCoupons">
                                <my-all-kind
                                    :money="item.price"
                                    :kind="item.name"
                                    :subtraction="item.condition"
                                    :time="item.timer"
                                    :bgColor="item.status"
                                >
                                </my-all-kind>
                            </div>
                        </div>
                    </div>

                    <button class="coupon_cancel" @click.stop="cancelCoupon">不使用商家代金券</button>

                </div>

            </div>

            <div class="product-dis">
                <div class="dis-coupon" @click="listclick">
                    <div class="left">优惠券</div>
                    <div class="right">
                        <div style="color: #D0021B">{{couponViewText}}</div>
                        <div><wk-icon type="youjiantou" size="40" color="#CBCBCB"></wk-icon></div>
                    </div>
                </div>
            </div>
            <div class="product-sub">
                <div class="sub">
                    <span class="sub-text">小计:</span>
                    <span class="sub-num">
                        <wk-price :value="totalPrice"></wk-price>
                    </span>
                </div>
            </div>
        </div>
        <div class="affirm-remark" @click="goRemark">
            <div class="remark-l">订单备注</div>
             <div class="remark-r">
                 <div v-if="!remark">口味、偏好等要求</div>
                 <div class="r-text" v-else>{{ remark }}</div>
                 <div><wk-icon type="youjiantou" size="40" color="#CBCBCB"></wk-icon></div>
             </div>
        </div>
        <div class="affirm-footer" @click="submitOrder">
            <div class="left">
                <wk-price :value="totalPrice"></wk-price>
            </div>
            <div class="right">立即支付</div>
        </div>
        <wk-dialog-pay :show=isDialog :title=dialogTitle
					:buttons=buttons :buttonMode=buttonMode
                    :balance=balance :balanceNo=balanceNo
                    @dialogpayClick=dialogpayClick @topUp=topUp>
        </wk-dialog-pay>

        <wk-toptips ref="toptips"></wk-toptips>
    </div>
</template>

<script>
import wkIcon from "../components/icon/icon";
import wkPrice from "@c/price";
import myAllKind from "@c/all-kind";
import wkList from "@c/list";
import wkDialogPay from "@c/dialog-pay";
import wkToptips from "@c/toptips";
import _ from "lodash";
import throttle from "@/assets/throttle";
import { getMyCoupons, payment, isLogin, getVipCard } from "@/api";
import { mapState, mapActions } from "vuex";

export default {
  name: "affirm-order",
  components: {
    wkIcon,
    wkPrice,
    wkList,
    myAllKind,
    wkToptips,
    wkDialogPay
  },
  data() {
    return {
      remark: "", //备注
      selectedFoods: [], //已加入购物车
      couponView: false, //这里是优惠券的显示或隐藏
      coupons: [], //优惠券
      currentCouponId: 0, // 当前优惠券ID
      currentCouponPrice: 0, //当前优惠金额
      vipIsOpen: false, //是否开通会员卡
      isDialog: false, //模态是否显示
      dialogTitle: "支付方式", // 支付组件配置
      buttonMode: "col", // 支付组件配置
      balance: "", // 支付组件配置
      balanceNo: false, // 支付组件配置
      user_info_id: "", // 会员卡ID
      paymentData: {}, // 支付商品详情
      ext: null,
      restaurantId: 0, //店铺ID
      restaurantName: "", // 店铺名称
      login: "", // 是否登录
      isOrder: false //是否已经生成订单
    };
  },
  methods: {
    ...mapActions(["removeSelectedFoods"]),
    toVipCard() {
      if (!this.vipIsOpen) {
        this.$refs.toptips.showToptips({
          content: "商家未开通此服务,敬请期待",
          timer: 1500
        });
        return;
      } else if (!this.login) {
        this.$router.push({
          path: `/pages/register`
        });
        return;
      }

      let url = encodeURIComponent(
        `${this.ext.api_host}/mp/member-card.html?openid=${
          this.ext.openid
        }&config_id=${this.ext.config_id}&from=1&islogin=1`
      );
      this.$router.push({
        path: `/pages/vip-card-web-view?url=${url}`
      });
    },
    topUp() {
      let url = encodeURIComponent(
        `${this.ext.api_host}/mp/member-card.html?openid=${
          this.ext.openid
        }&config_id=${this.ext.config_id}&from=1&islogin=1`
      );
      this.$router.push({
        path: `/pages/vip-card-web-view?url=${url}`
      });
    },
    goRemark() {
      this.$router.push({ path: "/pages/order-remark" });
    },
    listclick(e) {
      this.couponView = true;
    },
    closeCoupon() {
      this.couponView = false;
    },
    selectedCoupon(id, price) {
      this.currentCouponId = id;
      this.currentCouponPrice = parseFloat(price);
      this.closeCoupon();
      console.log(this.currentCouponId, this.currentCouponPrice);
    },
    cancelCoupon() {
      this.currentCouponId = this.currentCouponPrice = 0;
      this.closeCoupon();
    },
    // throttle(fn, gapTime) {

    //     if (gapTime == null || gapTime == undefined) {
    //         gapTime = 1000
    //     }

    //     let _lastTime = +new Date() + gapTime
    //     let _nowTime = +new Date()
    //     // 返回新的函数
    //     return function(a) {

    //         console.log(_lastTime, _nowTime-_lastTime)
    //         if (_nowTime - _lastTime > gapTime || !_lastTime) {
    //             fn.apply(a, arguments) //将this和参数传给原函数
    //             _lastTime = _nowTime
    //         }
    //     }
    // },
    // submitOrder1() {
    //     console.log(2)

    //     this.throttle(function(e) {
    //         console.log(this)
    //         console.log(e)
    //         console.log(new Date().getSeconds())
    //     }, 1000)(this)
    // },
    submitOrder() {
      // 支付

      getVipCard().then(res => {
        this.balance = res.data.balance;
        this.user_info_id = res.data.user_info_id;
      });
      let paymentData = {
        product: this.selectedFoods.map(item => {
          if (item.isMultiSpec) {
            return {
              id: item.id,
              name: item.name,
              price: item.price,
              quanty: item.number,
              images: item.thumb || "", // 图片没有传空
              // container: item.lunchBox,
              spec: item.selectedProps,
              type_id: item.typeId,
              skucode: item.skucode
            };
          } else {
            return {
              id: item.id,
              name: item.name,
              price: item.price,
              quanty: item.number,
              images: item.thumb || "",
              // container: item.lunchBox,
              spec: "", // 配合后端加空字段
              type_id: item.typeId
            };
          }
        }), // 菜品
        delivery: this.dinerType, // 就餐方式
        amount: this.totalPrice, // 总价
        source: "小程序", // 来源
        config_id: this.ext.config_id, // 配置id
        tables_id: this.tablesId, // 桌号
        openid: this.ext.openid, // openid
        user_info_id: this.user_info_id, //会员ID
        explain: this.remark == "口味、偏好等要求" ? "" : this.remark, // 备注
        restaurant_id: this.restaurantId, //店铺ID
        subtotal:
          this.dinerType == 1
            ? (this.totalPrice * 100 -
                this.boxPrice * 100 -
                this.outerPrice * 100) /
              100
            : this.totalPrice // 小记
      };

      // 是否有优惠券
      if (this.currentCouponId && this.currentCouponPrice) {
        paymentData.coupon_id = this.currentCouponId;
        paymentData.coupon = this.currentCouponPrice;
      }

      if (this.dinerType == 1) {
        // 外卖需要的其他参数
        paymentData.delivery_site = this.userAddress;
        paymentData.delivery_price = this.outerPrice;
        paymentData.username = this.userName;
        paymentData.userphone = this.userTel;
        paymentData.container = this.boxPrice; // 餐盒费
        paymentData.book_time = this.bookTime; // 预计送达时间
      } else if (this.dinerType == 2) {
        // 预定的其他参数
        paymentData.username = this.reserveUsername;
        paymentData.userphone = this.mobile;
        paymentData.book_date = this.reserveDate;
        paymentData.book_time = this.reserveTime;
        paymentData.peoples = this.people; // 人数
      }
      // 商品不能为空
      if (paymentData.product.length == 0) return;
      // 外卖地址不能为空
      if (this.dinerType == 1) {
        if (!paymentData.delivery_site) {
          this.$refs.toptips.showToptips({
            content: "请选择送餐地址",
            timer: 1500
          });
          return;
        }
      }
      // 预定人和电话不能为空
      if (this.dinerType == 2) {
        if (!paymentData.username) {
          this.$refs.toptips.showToptips({
            content: "请输入预定人姓名",
            timer: 1500
          });
          return;
        } else if (!paymentData.userphone) {
          this.$refs.toptips.showToptips({
            content: "请输入手机号",
            timer: 1500
          });
          return;
        }
      }
      this.paymentData = paymentData;

      if (this.vipIsOpen && this.user_info_id) {
        this.isDialog = true;
        console.log(this.isDialog);
        this.balance < this.paymentData.amount
          ? (this.balanceNo = true)
          : (this.balanceNo = false);
      } else {
        if (!this.isOrder) {
          this.isOrder = true;
          payment(this.paymentData).then(result => {
            if (result.success) {
              wx.requestPayment({
                timeStamp: result.data.timeStamp,
                nonceStr: result.data.nonceStr,
                package: result.data.package,
                signType: result.data.signType,
                paySign: result.data.paySign,
                success: res => {
                  let orderId = result.data.orderId;
                  this.$router.replace({
                    path: `/pages/payment-success?code=${orderId}`
                  });
                  setTimeout(() => {
                    // 产生订单后清空购物车
                    this.removeSelectedFoods();
                  }, 300);
                },
                fail: () => {
                  this.$refs.toptips.showToptips({
                    content: "支付失败, 请在我的订单中重新支付",
                    timer: 1500
                  });
                  // 提示结束后跳转回上一页
                  let timer = setTimeout(() => {
                    this.$router.back();
                    clearTimeout(timer);
                    // 产生订单后清空购物车
                    this.removeSelectedFoods();
                  }, 1500);
                }
              });
            } else {
              this.$refs.toptips.showToptips({
                content: result.data.message,
                timer: 1500
              });
              // 提示结束后跳转回上一页
              let timer = setTimeout(() => {
                this.$router.back();
                clearTimeout(timer);
                // 产生订单后清空购物车
                this.removeSelectedFoods();
              }, 1500);
            }
          });
        }
      }
    },

    dialogpayClick(e, option) {
      if (option.guid === "wechat" && option.type !== 500) {
        // 微信支付
        this.paymentData.pay_type = "微信";
      } else if (option.guid === "huiyuanka" && option.type !== 500) {
        // 会员卡支付
        this.paymentData.pay_type = "会员卡";
      } else {
        this.isDialog = false;
        return;
      }
      if (!this.isOrder) {
        this.isOrder = true;
        payment(this.paymentData)
          .then(result => {
            console.log(result);

            if (result.success) {
              let orderId = result.data.orderId;
              if (option.guid === "huiyuanka") {
                this.$refs.toptips.showToptips({
                  content: "会员卡支付中",
                  timer: 1000
                });
                this.isDialog = false;

                let timer = setTimeout(() => {
                  if (result.data.code === 2000) {
                    // 会员支付成功跳转
                    this.$router.replace({
                      path: `/pages/payment-success?code=${orderId}`
                    });
                  }
                  // 清空购物车
                  this.removeSelectedFoods();
                  clearTimeout(timer);
                }, 1000);
                return;
              }

              wx.requestPayment({
                timeStamp: result.data.timeStamp,
                nonceStr: result.data.nonceStr,
                package: result.data.package,
                signType: result.data.signType,
                paySign: result.data.paySign,
                success: res => {
                  let orderId = result.data.orderId;
                  this.$router.replace({
                    path: `/pages/payment-success?code=${orderId}`
                  });
                  setTimeout(() => {
                    // 产生订单后清空购物车
                    this.removeSelectedFoods();
                  }, 300);
                },
                fail: () => {
                  this.$refs.toptips.showToptips({
                    content: "支付失败, 请在我的订单中重新支付",
                    timer: 1500
                  });
                  // 提示结束后跳转回上一页
                  let timer = setTimeout(() => {
                    this.$router.back();
                    clearTimeout(timer);
                    // 产生订单后清空购物车
                    this.removeSelectedFoods();
                  }, 1500);
                }
              });
            } else {
              this.$refs.toptips.showToptips({
                content: result.data.message,
                timer: 1000
              });
              this.isDialog = false;
              // 提示结束后跳转回上一页
              let timer = setTimeout(() => {
                this.$router.back();
                clearTimeout(timer);
                // 产生订单后清空购物车
                this.removeSelectedFoods();
              }, 1000);
            }
          })
          .catch(err => {});
      }
    }
  },
  computed: {
    ...mapState(["paymentShoppingCart", "remarks"]),

    couponViewText() {
      return this.currentCouponPrice
        ? `已优惠${this.currentCouponPrice}`
        : this.normalCoupons.length
          ? `有${this.normalCoupons.length}张可用优惠券`
          : "暂无可用优惠券";
    },
    normalCoupons() {
      return this.coupons
        .filter(item => +item.order_odds <= +this.totalPrice)
        .map(item => {
          return {
            price: item.face_value,
            name: item.coupon_name,
            condition: `满${item.order_odds}减${item.face_value}`,
            timer: `${item.start_time
              .split(" ")[0]
              .replace(/-/g, "/")} — ${item.expire_time
              .split(" ")[0]
              .replace(/-/g, "/")}`,
            status: true,
            id: item.id
          };
        });
    },
    abnormalCoupons() {
      return this.coupons
        .filter(item => +item.order_odds > +this.totalPrice)
        .map(item => {
          return {
            price: item.face_value,
            name: item.coupon_name,
            condition: `满${item.order_odds}减${item.face_value}`,
            timer: `${item.start_time
              .split(" ")[0]
              .replace(/-/g, "/")} — ${item.expire_time
              .split(" ")[0]
              .replace(/-/g, "/")}`,
            status: false,
            id: item.id
          };
        });
    },
    totalPrice() {
      // 总价计算
      if (this.dinerType == 1) {
        return (
          (this.selectedFoods.reduce(
            (current, prev) =>
              current +
              prev.price * 100 * prev.number +
              prev.lunchBox * 100 * prev.number,
            this.outerPrice * 100
          ) -
            this.currentCouponPrice * 100) /
          100
        );
      } else {
        return (
          (this.selectedFoods.reduce(
            (current, prev) => current + prev.price * 100 * prev.number,
            0
          ) -
            this.currentCouponPrice * 100) /
          100
        );
      }
    }
  },
  onShow() {
    this.remark = wx.getStorageSync("remark");
  },
  mounted() {
    Object.assign(this, this.$options.data());
    this.currentCouponPrice = 0; // mounted生命周期清空优惠券数据,返回不走mounted,保留优惠券数据
    this.ext = wx.getStorageSync("ext");
    this.selectedFoods = wx.getStorageSync("selectedFoods");
    console.log(this.selectedFoods);
    getMyCoupons(1).then(res => {
      this.coupons = res.data.map(item => {
        return {
          ...item.coupon,
          id: item.id
        };
      });
    });

    isLogin().then(res => {
      console.log(res);
      this.login = res.data;
    });

    getVipCard().then(res => {
      this.balance = res.data.balance;
      this.user_info_id = res.data.user_info_id;
    });
    this.restaurantId = wx.getStorageSync("restaurant").id;
    this.restaurantName = wx.getStorageSync("restaurant").name;
    this.vipIsOpen = wx.getStorageSync("vipIsOpen");
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
.wrap-affirm {
    width: 100%;
    padding: 40rpx 40rpx 100rpx 40rpx;
    box-sizing: border-box;

    .affirm-way {
        width: 100%;
        height: 100rpx;
        background-color: white;
        border-radius: 8rpx;
        padding: 0 20rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;

        .way-left {
            height: 100rpx;
            display: flex;
            align-items: center;
            font-size: 28rpx;
            color: #333333;
            font-weight: bold;
        }

        .way-right {
            height: 100rpx;
            color: #666666;
            display: flex;
            align-items: center;

            .right-arr {
                height: 150rpx;
                display: flex;
                align-items: center;
            }
        }
    }

    .affirm-product {
        width: 100%;
        background-color: white;
        border-radius: 8rpx;

        .product-header {
            width: 100%;
            margin-top: 20rpx;
            padding: 0 20rpx;
            box-sizing: border-box;

            .header-t {
                font-size: 32rpx;
                color: #666666;
                padding: 40rpx 0 60rpx 0;
                box-sizing: border-box;
                border-bottom: 1rpx solid #F5F5F5;
            }
        }

        .product-content {
            width: 100%;
            padding: 0 20rpx;
            box-sizing: border-box;
            font-size: 28rpx;

            .content-t {
                border-bottom: 1rpx solid #F5F5F5;

                .t-recomm {
                    padding: 30rpx 0;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;

                    .top {
                        flex: 3;
                    }

                    .center {
                        flex: 1;
                    }

                    .bottom {
                        flex: 1;
                        text-align: right;
                    }
                }
            }
        }

        .product-dis {
            width: 100%;
            height: 100rpx;
            padding: 0 20rpx;
            box-sizing: border-box;

            .dis-coupon {
                width: 100%;
                height: 100rpx;
                border-bottom: 1rpx solid #F5F5F5;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .left {
                    font-size: 28rpx;
                    font-weight: bold;
                }

                .right {
                    display: flex;
                    align-items: center;
                }
            }
        }

        .product-sub {
            width: 100%;
            height: 100rpx;
            padding: 0 30rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-weight: bolder;

            .sub {
                height: 32rpx;
                display: flex;
                align-items: center;

                .sub-num {
                    font-size: 32rpx;
                }
            }
        }
    }

    .affirm-remark {
        width: 670rpx;
        height: 100rpx;
        background-color: white;
        margin: 20rpx 0;
        padding: 0 20rpx;
        box-sizing: border-box;
        border-radius: 8rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 28rpx;

        .remark-l {
            font-weight: bolder;
        }

        .remark-r {
            display: flex;
            align-items: center;
            color: #CBCBCB;

            div {
                line-height: 100rpx;
            }

            .r-text {
                width: 240rpx; /* 要显示文字的宽度 */
                overflow: hidden; /* 超出的部分隐藏起来。 */
                white-space: nowrap; /* 不显示的地方用省略号...代替 */
                text-overflow: ellipsis;
                text-align: right;
            }
        }
    }

    .affirm-footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100rpx;
        background-color: #4A4A4A;
        padding: 0 40rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;

        .left {
            font-size: 36rpx;
            font-weight: bolder;
        }

        .right {
            width: 190rpx;
            height: 80rpx;
            background-color: #F5A623;
            line-height: 80rpx;
            text-align: center;
            font-size: 28rpx;
            border-radius: 8rpx;
        }
    }
}
</style>
<style lang="scss">
.coupon {
  &_wrap {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
  }
  &_cont {
    width: 100%;
    max-height: 60vh;
    position: absolute;
    left: 0;
    bottom: 0;
    overflow: auto;
    padding: 0 30rpx;
    box-sizing: border-box;
    background-color: white;
    h6 {
      height: 50px;
      line-height: 50px;
      background: #fff;
      font-size: 15px;
      color: #2f2f2f;
      text-align: center;
      border-bottom: 1px solid #dbdbdb;
    }
    .coupon_list {
      background: #fff;
    }
    .coupon_cancel {
      height: 49px;
      line-height: 49px;
      border-top: 1px solid #dbdbdb;
      border-radius: 0;
      background: #fff;
      font-size: 15px;
      color: #979797;
      &:after {
        content: "";
        display: none;
      }
    }
  }
}
</style>
