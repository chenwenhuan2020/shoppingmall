<template>
  <div class="home">
    <!-- 搜索 -->
    <div class="search">
      <van-nav-bar class="home-nav">
        <template #left>
          <div class="home-left">
            <h3 id="home-title">{{ msg }}</h3>
            <p>{{userInfo.nickName}}</p>
          </div>
        </template>
        <template #right>
          <div class="home-right">
            <van-search placeholder="请输入搜索关键词" shape="round" @focus="search"/>
          </div>
        </template>
      </van-nav-bar>
    </div>
    <!-- 轮播 -->
    <div class="rotation">
      <van-swipe @change="btn" :autoplay="1500" class="rotation-ban">
        <van-swipe-item v-for="(item, index) in rotationData" :key="index">
          <img :src="item.bannerImg" alt="" class="auto-img" />
        </van-swipe-item>
        <template #indicator>
          <div class="index-box">
            <ul class="home-ul">
              <li
                v-for="(item, index) in rotationData"
                :key="index"
                @click="goDetail(item.pid)"
                :class="{ active: index == current }"
              ></li>
            </ul>
          </div>
        </template>
      </van-swipe>
    </div>
    <!-- 推荐 -->
    <div class="home-recommend">
      <p>热门推荐</p>
    </div>
    <!-- 列表 -->
    <div class="home-list">
      <div
        class="list-ban"
        v-for="(item, index) in list"
        :key="index"
        @click="goDetail(item.pid)"
      >
        <div class="list-img">
          <img :src="item.smallImg" alt="" />
          <div class="hot">热</div>
        </div>
        <div class="list-text">
          <p>{{ item.name }}</p>
          <p>￥{{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入样式表
import "../assets/less/home.less";

export default {
  name: "Home",
  //数据
  data() {
    return {
      // 轮播索引值
      current: 0,
      //轮播图的数据
      rotationData: [],
      //列表数据
      list: [],
      // 问候语
      msg: "下午好",

      //用户信息
      userInfo:{},
    };
  },
  //初始化
  created() {
    //轮播
    this.getRotation();
    //列表数据
    this.getlist();
    //时间
    this.getDate();
    //查询用户信息
    this.getUserInfo();
  },
  //方法
  methods: {
    //图片下标
    btn(index) {
      //获取下标
      this.current = index;
    },
    // 获取轮播图片数据
    getRotation() {
      // 加载提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      // 发送请求
      this.axios({
        // 类型
        method: "GET",
        //请求路径
        url: "/banner",
        // 参数
        params: {
          appkey: this.appkey,
        },
      })
        .then((res) => {
          // 关闭提示
          this.$toast.clear();
          if (res.data.code == 300) {
            this.rotationData = res.data.result;
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    //获取热卖商品
    getlist() {
      // 加载提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      // 发送请求
      this.axios({
        // 类型
        method: "GET",
        //请求路径
        url: "/typeProducts",
        // 参数
        params: {
          appkey: this.appkey,
          key: "isHot",
          value: 1,
        },
      })
        .then((res) => {
          // 关闭提示
          this.$toast.clear();
          if (res.data.code == 500) {
            this.list = res.data.result;
            
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },
    //获取当前时间切换问候语
    getDate() {
      let date = new Date().getHours();
      
      if (6 < date && date <= 12) {
        this.msg = "早上好";
      } else if (12 < date && date <= 18) {
        this.msg = "下午好";
      } else if (18 < date && date < 24) {
        this.msg = "晚上好";
      } else {
        this.msg = "晚安";
      }
    },
    //添砖详情页
    goDetail(pid) {
      this.$router.push({ name: "Detail", params: { pid } });
    },

    //用户信息
      getUserInfo() {
        let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
     return;
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url: "/findMy",
        params: {
          appkey: this.appkey,
          tokenString
        },
      })
        .then((result) => {
          this.$toast.clear();
          
         if (result.data.code == 'A001') {
            this.userInfo = result.data.result[0];
          }

        })
        .catch((err) => {
          this.$toast.clear();
          
        });
      },

      //获取检点
      search(){
        this.$router.push({name:"Search"});
      }
  },
};
</script>

<style lang="less" scoped>
</style>