<script lang="ts" setup>
import { onMounted, computed, watch, ref, reactive } from 'vue'
import { useData, useRoute, useRouter, ContentData } from 'vitepress'
import VPContent from 'vitepress/dist/client/theme-default/components/VPContent.vue'
import { data as posts } from './posts.data.mts'
import LJYAllPosts from './components/LJYAllPosts.vue'

const { frontmatter } = useData()
const route = useRoute()
const router = useRouter()
const curCategory = ref('learns')
const homeData = reactive({
  allPosts: posts
})

// watch(route, (newRoute) => {
//   console.log('newRoute', newRoute)
// })

const filterPosts = computed(() => {
  const fullPosts: Array<ContentData> = posts as Array<ContentData>
  if (curCategory.value == 'all' || !curCategory.value.length) {
    return fullPosts
  }

  console.log(curCategory.value)
  const filterPosts = fullPosts.filter((post) => {
    return post.frontmatter['category'] == curCategory.value
  })

  return filterPosts.reverse()
})

const categories = [
  {
    name: '全部',
    en: 'all',
    link: '/'
  },
  {
    name: '读点书',
    en: 'books',
    link: '/books'
  },
  {
    name: '写点啥',
    en: 'writes',
    link: '/writes'
  },
  {
    name: '学点啥',
    en: 'learns',
    link: '/learns'
  },
  {
    name: '搞点技术',
    en: 'tech',
    link: '/tech'
  }
]

onMounted(() => {
  console.log(posts)
})

function categoryItemClick(cagegory) {
  curCategory.value = cagegory.en
  router.go('/')
}
</script>

<template>
  <div class="app">
    <div class="main-content">
      <aside class="aside">
        <h1 class="title">六捡一</h1>
        <div style="margin-top: 20px">
          <p>一个人一定是读了大量的书，才能形成丰富的价值观和世界观。</p>
          <br />
          <p>巴菲特都比你有时间。</p>
          <br />
          <p>
            王尔德说：很多人觉得自己活在世上，实际上只是在世上，并没有怎么活。
          </p>
        </div>
        <div class="categories"></div>
      </aside>
      <main class="main">
        <div style="display: flex; flex-direction: row; padding-bottom: 10px">
          <div
            class="cagegory-item"
            :class="[
              cagegory.en == curCategory ? 'cagegory-item-selected' : ''
            ]"
            v-for="cagegory in categories"
            @click="categoryItemClick(cagegory)"
          >
            {{ cagegory.name }}
          </div>
        </div>
        <LJYAllPosts
          v-if="frontmatter.layout == 'home'"
          :posts="filterPosts"
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
  scrollbar-color: #ffffff80 transparent;
  scrollbar-width: 1px;
}
.main-wrapper-post {
  background-color: #ffffff80;
}
.cagegory-item {
  height: 45px;
  line-height: 45px;
  padding: 0 30px;
  background-color: rgba(5, 3, 48, 0.255);
  border-radius: 10%;
  margin-right: 20px;
  color: #fff;
}
.cagegory-item-selected {
  background-color: rgba(5, 3, 48, 0.655);
}
</style>
