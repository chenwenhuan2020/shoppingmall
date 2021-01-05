<template>
  <div class="address">
    <van-nav-bar fixed @click-left="back">
      <template #left>
        <div class="left">
          <img src="../assets/images/fh.png" alt="" class="auto-img">
        </div>
      </template>
      <template #title>
        <div class="title">
          我的地址
        </div>
      </template>
    </van-nav-bar>
    <BgBox>
      <van-address-list
        :list="list"
        default-tag-text="默认"
        
        :switchable="false"
        @add="add"
        @edit="edit"
      />
    </BgBox>
  </div>
</template>

<script>
import BgBox from "../components/BgBox.vue";
import '../assets/less/address.less'
export default {
  name: "Address",

  data() {
    return {
      chosenAddressId: "",
      list: [],
    };
  },
  components: {
    BgBox,
  },

  created() {
    //获取地址列表数据
    this.getAddressData();
  },

  methods: {
    //返回上一级
    back() {
      this.$router.go(-1);
    },

    //获取地址列表数据
    getAddressData() {
      let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
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
            this.$router.push({ name: "Login" });
          } else if (result.data.code == 20000) {
            result.data.result.map((v) => {
              v.isDefault = Boolean(v.isDefault);
              v.id = v.aid;
              v.address = `${v.province}${v.city}${v.county}${v.addressDetail}`;
            });

            this.list = result.data.result;
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    add() {
      this.$router.push({ name: "NewAddress" });
    },

    edit(item) {
      this.$router.push({ name: "NewAddress", query: { aid: item.aid } });
    },
  },
};
</script>

<style lang="less" scoped>
.van-button::before {
  background-color: #f0134d;
}
</style>