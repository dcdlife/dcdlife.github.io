// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// import { createContentLoader } from 'vitepress'
import { toRaw } from '@vue/reactivity'

// import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    console.log(app)

    // const posts = createContentLoader('posts/**/**.md').load()
    // console.log('posts', posts)
  }
} satisfies Theme
