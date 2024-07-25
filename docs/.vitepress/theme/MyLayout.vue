<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
</script>

<template>
  <div class="app">
    <div class="main-content">
      <aside class="aside">
        <h1 class="title">DCD's Life</h1>
        <p>
          Hello, 我是DCD。<br />一个人一定是读了大量的书，才能形成丰富的价值观和世界观。
        </p>
      </aside>
      <div class="content"></div>
    </div>
  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  background-image: url(./images/theme-bg2.jpg);
  background-size: cover;
}
.main-content {
  min-width: 800px;
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
.aside {
  width: 300px;
  padding: 20px 10px;
  background-color: rgba(5, 3, 48, 0.355);
  border-radius: 1%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: white;
}
.aside .title {
  font-weight: 500;
  font-size: 30px;
}
</style>
