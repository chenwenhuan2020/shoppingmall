<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
body {
  color: #444444;
  padding: 0;
  margin: 0;
  background-color: #FBF4F9;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  color: #646566;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clear::after {
    content: "";
  display: block;
  clear: both;
}
.color {
  color: #ff6f5e;
}
.auto-img {
  width: 100%;
  height: 100%;
  display: block;
}
.one-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
