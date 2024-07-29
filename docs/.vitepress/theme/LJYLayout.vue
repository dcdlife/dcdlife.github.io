<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import VPContent from 'vitepress/dist/client/theme-default/components/VPContent.vue'
import { data as posts } from './posts.data.mts'
import LJYAllPosts from './components/LJYAllPosts.vue'

const { frontmatter } = useData()
console.log(frontmatter)

onMounted(() => {
  console.log(posts)
})

const categories = ref(['技术', '读书', '旅行'])
</script>

<template>
  <div class="app">
    <div class="main-content">
      <aside class="aside">
        <h1 class="title">LJY's Life</h1>
        <br />
        <p>
          Hello, 我是六捡一。<br />一个人一定是读了大量的书，才能形成丰富的价值观和世界观。
        </p>
        <div class="categories"></div>
      </aside>
      <main class="main">
        <LJYAllPosts
          v-if="frontmatter.layout == 'home'"
          :posts="posts"
        ></LJYAllPosts>
        <div v-else class="main-wrapper-post">
          <!-- <Content /> -->
          <VPContent></VPContent>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app {
  min-width: 800px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: url(./images/theme-bg2.jpg) no-repeat center center;
  background-size: cover;
  overflow: hidden;
}
.main-content {
  min-width: 800px;
  width: 100%;
  height: 80%;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  overflow: hidden;
}
.aside {
  width: 300px;
  padding: 20px 10px;
  background-color: rgba(5, 3, 48, 0.355);
  border-radius: 1%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}
.aside .title {
  font-weight: 500;
  font-size: 30px;
}
.aside .categories {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.main {
  margin-left: 50px;
  flex: 1;
  overflow-y: auto;
  border-radius: 4px;
  /* scrollbar-width: none; */
  scrollbar-color: #fff transparent;
  scrollbar-width: 1px;
}
.main-wrapper-post {
  background-color: #ffffff80;
}
</style>
