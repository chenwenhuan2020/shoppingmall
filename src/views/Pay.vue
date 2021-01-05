<template>
  <div class="pay">
    <van-nav-bar fixed @click-left="back">
      <template #left>
        <div class="left">
          <img src="../assets/images/fh.png" alt="" class="auto-img" />
        </div>
      </template>
      <template #title>
        <div class="title">立即支付</div>
      </template>
    </van-nav-bar>
    <div class="pay-box">
      <div class="select-address">
        <div>
          <span @click="showSelectAddressList">选择地址</span>
          <van-icon class="arrow" name="arrow" />
        </div>
        <div class="user-box">
          <div class="user-info">
            <div class="user-name">{{ currentAddress.name }}</div>
            <div class="user-phone">{{ currentAddress.tel }}</div>
            <div class="default-address" v-if="currentAddress.isDefault">
              默认
            </div>
          </div>
          <div class="detail-address">{{ currentAddress.address }}</div>
        </div>
      </div>
      <!-- 订单信息 -->
      <div class="order-info">
        <OrderList
          info-title-left="订单信息"
          :count="productInfo.count"
          :total="productInfo.total"
        >
          <OrderItem
            v-for="(item, index) in products"
            :key="index"
            :item="item"
          ></OrderItem>
        </OrderList>
      </div>
    </div>

    <div class="btn-box">
      <van-button type="primary" block round color="#f0134d" @click="payBox"
        >立即支付</van-button
      >
    </div>

    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <van-password-input
            :value="value"
            :error-info="errorInfo"
            :focused="showKeyboard"
            @focus="showKeyboard = true"
          />
          <div class="button" @click="qx()">
            <button class="btn">取消付款</button>
          </div>
          <van-number-keyboard
            v-model="value"
            :show="showKeyboard"
            @blur="showKeyboard = true"
          />
        </div>
      </div>
    </van-overlay>

    <!-- 地址 -->
    <van-popup is-link position="bottom" closeable v-model="isOpen" >
      <div class="address-title">选择地址</div>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="newAddress"
        @select="selectAddress"
      />
    </van-popup>
  </div>
</template>

<script>
import "../assets/less/pay.less";
import OrderList from "../components/OrderList.vue";
import OrderItem from "../components/OrderItem.vue";
export default {
  name: "Pay",

  components: {
    OrderList,
    OrderItem,
  },

  data() {
    return {
      isOpen: false,

      //选择地址的id
      chosenAddressId: "",

      //地址列表
      list: [],

      //选择当前地址
      currentAddress: {},

      //购物袋的sid
      sids: [],

      //需要购买的商品数据
      products: [],

      //商品数量和订单总价
      productInfo: {
        count: 0,
        total: 0,
      },

      //付钱
      value: "",
      //状态
      showKeyboard: true,
      //显示
      show: false,
      //长度
      errorInfo: "",

      bb: false,
    };
  },

  created() {
    //截取查询参数
    this.sids = this.$route.query.sids.split("-");
    

    //根据sids获取购物袋数据
    this.getShopbagBySids();

    //获取地址列表数据
    this.getAddressData();
  },

  methods: {
    //返回上一级
    back() {
      this.$router.go(-1);
    },

    //新增地址
    newAddress() {
      this.$router.push({ name: "NewAddress" });
    },

    //选择地址
    selectAddress(item, index) {
      
      

      this.isOpen = false;

      this.currentAddress = item;
    },

    //展示选择地址列表
    showSelectAddressList() {
      this.isOpen = true;
    },

    //获取地址列表数据
    getAddressData() {
      let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url: "/findAddress",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();
          
          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == 20000) {
            result.data.result.map((v) => {
              v.isDefault = Boolean(v.isDefault);
              v.id = v.aid;
              v.address = `${v.province}${v.city}${v.county}${v.addressDetail}`;

              //选择默认地址
              if (v.isDefault) {
                this.chosenAddressId = v.aid;
                this.currentAddress = v;
              }
            });

            this.list = result.data.result;
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    //根据sids获取购物袋数据
    getShopbagBySids() {
      let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url: "/commitShopcart",
        params: {
          appkey: this.appkey,
          tokenString,
          sids: JSON.stringify(this.sids),
        },
      })
        .then((result) => {
          this.$toast.clear();
          
          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == 50000) {
            if (result.data.result.length == 0) {
              //如果没有商品可购买，则跳转到购物袋页面
              return this.$router.push({ name: "Home" });
            }
            result.data.result.map((v) => {
              this.productInfo.count += v.count;
              this.productInfo.total += v.count * v.price;
            });
            this.products = result.data.result;
          } else {
            this.$toast(result.data.msg);
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    //结算订单
    pay() {
      let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "POST",
        url: "/pay",
        data: {
          appkey: this.appkey,
          tokenString,
          sids: JSON.stringify(this.sids),
          phone: this.currentAddress.tel,
          address: this.currentAddress.address,
          receiver: this.currentAddress.name,
        },
      })
        .then((result) => {
          this.$toast.clear();
          
          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else {
            this.$toast(result.data.msg);
            setTimeout(() => {
              //跳转到订单页面
              this.$router.push({ name: "Order" });
            });
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    //结算提示
    payBox() {
      this.$dialog
        .confirm({
          title: "确认订单",
          message: "是否立即支付?",
          confirmButtonColor: "#0C34BA",
        })
        .then(() => {
          this.show = !this.show;
        })
        .catch((err) => {
          
        });
    },

    //取消付款
    qx() {
      this.show = false;
      this.value = "";
    },
  },
  //监听
  watch: {
    value(value) {
      if (value.length === 6 && value === "111111") {
        this.errorInfo = "";
        this.pay();
      } else if (value.length === 6 && value !== "123456") {
        this.errorInfo = "密码错误";
      } else if (value.length === 0) {
        this.errorInfo = "";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  width: 100%;
  height: auto;
}
/deep/ .van-password-input__error-info{
  color:white;
  margin-bottom: 10px;
}
.button {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  .btn {
    border: none;
    background: none;
    outline: none;
    padding: 5px 10px;
    background-color: #fff;
    border-radius: 10px;
    color: #f0134b;
    font-weight: bold;
  }
}
</style>