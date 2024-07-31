<script setup lang="ts">
import type { ContentData } from 'vitepress'
import { useRouter } from 'vitepress'

const props = defineProps<{
  posts: Array<ContentData>
}>()
const router = useRouter()

function postClick(post: ContentData) {
  router.go(post.url)
}
</script>

<template>
  <div class="wrapper-posts">
    <div
      class="wrapper-post"
      v-for="post in props.posts"
      @click="postClick(post)"
    >
      <h2 class="post-title">{{ post.frontmatter.title }}</h2>
      <span>{{ post.frontmatter.date }}</span>
    </div>
  </div>
</template>

<style scoped>
.wrapper-posts {
  display: flex;
  flex-direction: column;
}
.wrapper-post {
  height: 80px;
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin: 5px 0;
  cursor: pointer;
}
.wrapper-post:hover {
  background-color: #ffffff80;
}
.post-title {
  font-size: 25px;
  font-weight: 600;
}
</style>
