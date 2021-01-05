<template>
  <div class="bg-box">
      <div class="bg"></div>
      <div class="bg-content">
        <slot></slot>
      </div>
    </div>
</template>

<script>


  export default {
    name: 'BgBox'
  }
</script>

<style lang="less" scoped>
  .bg-box{

    .bg{
      height: 100px;
      background-color: #f0134d;
    }
  
    .bg-content{
      margin: 0 10px;
      position: relative;
      top: -20px;
      background-color: #fff;
        //  background-color: #f0134d;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      padding: 10px;
    }
  }
</style>