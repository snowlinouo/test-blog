import { type DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: '首頁',
    link: '/' 
  },
  {
    text: 'Minecraft',
    items: [
      {
        text: '目錄',
        link: '/minecraft/',
      }
    ],
  },
  {
    text: '光遇',
    items: [
      {
        text: '目錄',
        link: '/sky/',
      },
      {
        text: '更新內容',
        link: '/sky/patch',
      },
      {
        text: '已知問題',
        link: '/sky/known-issues',
      },
    ],
  },
  {
    text: '關於作者',
    link: '/about.md'
  }
]