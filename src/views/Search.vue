<template>
  <div class="search">
    <van-nav-bar fixed @click-left="back">
      <template #left>
        <div class="left">
          <img src="../assets/images/fh.png" alt="" class="auto-img" />
        </div>
      </template>
      <template #right>
        <div class="home-search">
          <van-search
            @search="search"
            placeholder="请输入咖啡名称"
            show-action
            ref="search"
            v-model="name"
          />
        </div>
      </template>
    </van-nav-bar>

    <!-- <div class="bb">
      bb
    </div> -->

    <BgBox>
      <div class="flex">
        <div
          class="like-item"
          v-for="(item, index) in products"
          :key="index"
          @click="goDetail(item.pid)"
        >
          <ProductItem :item="item"></ProductItem>
        </div>
      </div>
     
    </BgBox>
  </div>
</template>

<script>
import BgBox from "../components/BgBox.vue";
import ProductItem from "../components/ProductItem.vue";
export default {
  name: "Search",

  components: {
    BgBox,
    ProductItem,
  },
  data() {
    return {
      //搜索关键字
      name: "",
      //商品列表
      products: [],
    };
  },
  created() {
    this.$nextTick(() => {
      
      //获取搜索框
      let searchIpt = this.$refs.search.querySelector('[type="search"]');
      
      //获取焦点
      searchIpt.focus();
    });
    // this.goDetail();
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
    //搜索
    search() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url: "/search",
        params: {
          appkey: this.appkey,
          name: this.name,
        },
      })
        .then((result) => {
          this.$toast.clear();
          

          if (result.data.code == "Q001") {
            this.products = result.data.result;
          } else {
            this.$toast(result.data.msg);
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },
    //查看商品详情
    goDetail(pid) {
      this.$router.push({ name: "Detail", params: { pid } });
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  .bb{
    width: 100%;
    height: 50px;
    background-color: red;
  }
  padding-top: 50px;
  /deep/ .van-nav-bar .van-icon {
    color: #0c34ba;
  }
  /deep/ .van-nav-bar_text {
    color: #0c34ba;
  }
  /deep/ .van-nav-bar__right {
    width: calc(~"100% - 110px");
  }
  /deep/ .home-search {
    width: 100%;
  }
  /deep/ .van-search__action{
    color:#f0134b;
    font-weight: bold;
  }
  /deep/ .home-search .van-search {
    padding: 0;
    border-radius: 10px;
    overflow: hidden;
  }
  /deep/ .home-search .van-icon {
    color: #0c34ba;
  }
  .left {
    width: 20px;
    height: 20px;
  }
  .flex {
    display: flex;
    flex-wrap: wrap;
  }
  .like-item {
    flex: 0 0 29%;
    padding-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #fff;
    &:nth-of-type(3n) {
      padding-right: 0;
    }
  }
}
</style>