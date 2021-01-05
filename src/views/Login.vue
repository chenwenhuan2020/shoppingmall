<template>
  <div class="login">
    <!-- 导航 -->
    <van-nav-bar left-text="返回" right-text="逛一逛" @click-right="logo">
      <template #title>
        <span id="logoName">Paris Coffee</span>
      </template>
      <template #left>
        <div class="nav-left">
          <div class="left-logo"></div>
        </div>
      </template>
    </van-nav-bar>
    <!-- 欢迎 -->
    <div class="login-title">
      <h2 class="h2">欢迎回来!</h2>
      <p class="p">Welcome To Paris Coffee</p>
    </div>
    <!-- 登录 -->
    <div class="form">
      <!-- 注册登录 -->
      <van-form>
        <van-field
          v-model="userInfo.phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          autocomplete="off"
        >
        </van-field>
        <van-field
          v-model="userInfo.password"
          name="密码"
          label="密码"
          placeholder="密码"
          :type="flag ? 'password' : 'text'"
          :right-icon="flag ? 'closed-eye' : 'eye-o'"
          @click-right-icon="toggle"
          style="letter-spacing: 16px"
          autocomplete="off"
        >
        </van-field>
        <!-- 忘记密码 -->
        <div class="forget">
          <span @click="goState('Forgot')">忘记密码?</span>
        </div>
        <!-- 按钮 -->
        <div class="register">
          <van-button type="primary" block round @click="login"
            >登录</van-button
          >
        </div>
        <!-- 注册 -->
        <div class="sign">
          <van-button type="primary" plain block round @click="popup"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
    <!-- 弹窗 注册-->
    <van-popup v-model="show" position="bottom" closeable round class="popup">
      <van-form class="form2">
        <div class="popup-zc">注册</div>
        <van-field
          v-model="userRegisterInfo.phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          input-align="left"
          autocomplete="off"
        >
        </van-field>
        <van-field
          v-model="userRegisterInfo.password"
          name="密码"
          label="密码"
          placeholder="密码(6-16位)"
          :type="flag ? 'password' : 'text'"
          :right-icon="flag ? 'closed-eye' : 'eye-o'"
          @click-right-icon="toggle"
          style="letter-spacing: 16px"
          input-align="left"
          autocomplete="off"
        >
        </van-field>
        <van-field
          v-model="userRegisterInfo.nickName"
          name="昵称"
          label="昵称"
          placeholder="昵称"
          style="letter-spacing: 16px"
          input-align="left"
          autocomplete="off"
        >
        </van-field>

        <div>
          <van-button id="submit" type="info" block round @click="register"
            >注册</van-button
          >
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
// 导入外部样式表
import "../assets/less/login.less";
// 导入表单验证模块化
import { validForm } from "../assets/js/public.js";

export default {
  name: "Login",
  // 数据
  data() {
    return {
      //用户登录
      userInfo: {
        phone: "",
        password: "",
      },
      //用户注册
      userRegisterInfo: {
        phone: "",
        password: "",
        nickName: "",
      },
      //密码状态
      flag: true,
      //弹窗
      show: false,
    };
  },
  //方法
  methods: {
    //切换密码状态
    toggle() {
      this.flag = !this.flag;
    },
    //弹窗
    popup() {
      this.show = true;
    },
    //注册
    register() {
      //构造表单验证信息
      let o = {
        phone: {
          value: this.userRegisterInfo.phone,
          errorMsg: "手机号格式不正确",
          reg: /^1[3-9]\d{9}$/,
        },
        password: {
          value: this.userRegisterInfo.password,
          errorMsg: "密码格式不正确",
          reg: /^[A-Za-z]\w{5,15}$/,
        },
        nickName: {
          value: this.userRegisterInfo.nickName,
          errorMsg: "昵称格式不正确",
          reg: /^[\w\u4e00-\u9fa5]{1,10}$/,
        },
      };

      let isPass = validForm.valid(o);

      if (isPass) {
        

        //复制用户注册信息
        let userInfo = Object.assign({}, this.userRegisterInfo);
        userInfo.appkey = this.appkey;
        
        

        //启动加载提示
        this.$toast.loading({
          //文本提示
          message: "加载中...",
          //禁止穿透点击
          forbidClick: true,
          //提示时间, 0: 没有时间限制
          duration: 0,
        });

        //发起注册请求
        this.axios({
          //请求类型
          method: "POST",
          //请求路径
          url: "/register",

          //POST请求参数, object
          data: userInfo,
        })
          .then((result) => {
            //关闭加载提示
            this.$toast.clear();

            if (result.data.code == 100) {
              this.isShow = false;
            } else {
              //如果注册失败，手机被注册了
              this.$toast(result.data.msg);
              this.userRegisterInfo.phone = "";
              this.userRegisterInfo.password = "";
              this.userRegisterInfo.nickName = "";
            }

            // 
          })
          .catch((err) => {
            //关闭加载提示
            this.$toast.clear();
            this.userRegisterInfo.phone = "";
            this.userRegisterInfo.password = "";
            this.userRegisterInfo.nickName = "";
            
          });
      }
    },
    // 登录
    login() {
      //构造表单验证信息
      let o = {
        phone: {
          value: this.userInfo.phone,
          errorMsg: "手机号格式不正确",
          reg: /^1[3-9]\d{9}$/,
        },
        password: {
          value: this.userInfo.password,
          errorMsg: "密码格式不正确",
          reg: /^[A-Za-z]\w{5,15}$/,
        },
      };

      let isPass = validForm.valid(o);

      if (isPass) {
        let userInfo = Object.assign({}, this.userInfo);
        userInfo.appkey = this.appkey;
        // 启动加载提示
        this.$toast.loading({
          // 文本提示
          message: "加载中...",
          // 禁止点击穿透
          forbidClick: true,
          // 提示时间 0 没有时间限制
          duration: 0,
          loadingType: "spinner",
        });
        //发起注册请求
        this.axios({
          //请求类型
          method: "POST",
          //请求路径
          url: "/login",

          //POST请求参数, object
          data: userInfo,
        })
          .then((result) => {
            // 关闭提示
            this.$toast.clear();
            // 判断
            if (result.data.code == 200) {
              //  登录成功 保存token，以便后面验证
              localStorage.setItem("__tk", result.data.token);
              // 添砖到home
              this.$router.push({ name: "Home" });
            }
            // 登录失败
            else {
              this.$toast(result.data.msg);
              // 清空文本
              this.userRegisterInfo.phone = "";
              this.userRegisterInfo.password = "";
              this.userRegisterInfo.nickName = "";
            }
            
          })
          .catch((err) => {
            // 关闭加载提示
            this.$toast.clear();
            
          });
      }
    },
    // 切换路由到首页
    logo() {
      this.$router.push({ path: "Home" });
    },
    goState(name){
      this.$router.push({name});
    }
  },
};
</script>

<style lang="less" scoped>
#submit {
  margin-top: 30px;
}
#logoName {
  color: red;
  font-weight: bold;
  font-size: 20px;
}
</style>