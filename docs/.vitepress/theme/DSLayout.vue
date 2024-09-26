<script lang="ts" setup>
import { onMounted, computed, watch, ref, reactive } from 'vue'
import { useData, useRoute, useRouter, ContentData } from 'vitepress'
import VPContent from 'vitepress/dist/client/theme-default/components/VPContent.vue'
import LJYAllPosts from './components/LJYAllPosts.vue'
import { createContentLoader } from 'vitepress'

const posts = createContentLoader('posts/**/*.md')

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
    name: '技术',
    en: 'tech',
    link: '/tech'
  },
  {
    name: '人物',
    en: 'person',
    link: '/person'
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
    <div class="app-content">
      <aside class="aside">
        <h1 class="title">六检一</h1>
        <div style="margin-top: 20px">
          <br />
          <p>巴菲特都比你有时间。</p>
          <br />
          <p>
            王尔德说：很多人觉得自己活在世上，实际上只是在世上，并没有怎么活。
          </p>
          <br />
          <p>
            人这一辈子很快的，总得活得精彩点，不给别人看，咱自己觉得精彩就够了。
          </p>
          <br />
          <p>如果没有人赏识你，咱自己也得赏识自己。</p>
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
        <div class="main-content">
          <LJYAllPosts
            v-if="frontmatter.layout == 'home'"
            :posts="filterPosts"
          ></LJYAllPosts>
          <div v-else class="main-wrapper-post">
            <VPContent></VPContent>
          </div>
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
  background-color: transparent;
}
.app-content {
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
  flex-direction: column;
}
.main-content {
  height: calc(100% - 75px);
  border-radius: 4px;
  scrollbar-color: #ffffff transparent;
  scrollbar-width: 1px;
  overflow-y: scroll;
  padding-right: 20px;
}
.main-wrapper-all-post {
  background-color: transparent;
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
