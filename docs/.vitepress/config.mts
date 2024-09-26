import { type DefaultTheme, defineConfig } from 'vitepress'
import { globSync } from 'tinyglobby'
import fs from 'fs'
import path from 'path'

const postPath = path.join(__dirname, '../posts')

interface LJYCategory {
  cName: string
  cEN: string
  cIndex: string
}

const CategoryMap: Record<string, LJYCategory> = {
  books: {
    cName: '读书',
    cEN: 'books',
    cIndex: 'index'
  },
  collects: {
    cName: '收集',
    cEN: 'collects',
    cIndex: 'index'
  },
  learning: {
    cName: '学点啥',
    cEN: 'learning',
    cIndex: '1'
  },
  persons: {
    cName: '人物',
    cEN: 'persons',
    cIndex: 'index'
  },
  techs: {
    cName: '技术',
    cEN: 'techs',
    cIndex: '1'
  }
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '六检一',
  base: '/',
  appearance: false,
  description: "This is DCD's life, record all studies.",
  themeConfig: {
    nav: nav(),
    sidebar: sidebar()
  },
  rewrites: {
    '/posts/index.md': '/posts/books/index.md',
    '/index.md': '/posts/books/index.md',
    'index.md': '/posts/books/index.md'
  }
})

function nav(): DefaultTheme.NavItem[] {
  let navs: DefaultTheme.NavItem[] = []
  Object.entries(CategoryMap).forEach(([_, value]) => {
    navs.push({
      text: value.cName,
      link: `/posts/${value.cEN}/${value.cIndex}`,
      activeMatch: `/${value.cEN}`
    })
  })
  return navs
}

function sidebar(): DefaultTheme.SidebarMulti {
  const categories = Object.entries(CategoryMap).map(([key]) => key)

  let sideBarItemMap: DefaultTheme.SidebarMulti = {}

  for (const cat of categories) {
    let catDir = path.join(postPath, cat)
    const files = fs.readdirSync(catDir) as string[]

    const items: DefaultTheme.SidebarItem[] = []
    for (const file of files) {
      if (file.endsWith('.md')) {
        items.push({
          text: path.basename(file),
          link: file
        })
      }
    }

    sideBarItemMap[`/posts/${cat}/`] = {
      base: `/posts/${cat}/`,
      items: items
    }
  }

  return sideBarItemMap
}
