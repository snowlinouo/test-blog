import { type DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/': [
    {
      text: '',
      items: []
    }
  ],
  '/sky/': [
    {
      text: '總目錄',
      link: 'sky/index',
    },
    {
      text: '版本更新內容',
      collapsed: false,
      items: [
        {
          text: '更新日誌',
          collapsed: false,
          items: [
            {
              text: '目錄',
              link: 'sky/patch/index',
            },
            {
              text: '0.26.5',
              link: 'sky/patch/0.26.5',
            },
            {
              text: '0.26.3',
              link: 'sky/patch/0.26.3',
            },
            {
              text: '0.26.2',
              link: 'sky/patch/0.26.2',
            },
            {
              text: '0.26.1',
              link: 'sky/patch/0.26.1',
            },
            {
              text: '0.26.0',
              link: 'sky/patch/0.26.0',
            },
          ]
        },
        {
          text: '已知問題',
          collapsed: true,
          items: [
            {
              text: '目錄',
              link: 'sky/known-issues/index',
            },
            {
              text: '0.26.5',
              link: 'sky/known-issues/0.26.5',
            },
            {
              text: '0.26.2',
              link: 'sky/known-issues/0.26.2',
            },
            {
              text: '0.26.1',
              link: 'sky/known-issues/0.26.1',
            },
            {
              text: '0.26.0',
              link: 'sky/known-issues/0.26.0',
            },
          ]
        }
      ]
    },
    {
      text: '季節',
      collapsed: true,
      items: [
        {
          text: '二重奏季',
          link: 'sky/'
        },
        {
          text: '築巢季',
          link: 'sky/'
        }
      ]
    },
    {
      text: '活動',
      collapsed: true,
      items: [
        {
          text: '新內容',
          collapsed: false,
          items: [
            {
              text: '0.26.3',
              link: 'sky/patch/0.26.3',
            },
            {
              text: '0.26.2',
              link: 'sky/patch/0.26.2',
            },
            {
              text: '0.26.1',
              link: 'sky/patch/0.26.1',
            },
            {
              text: '0.26.0',
              link: 'sky/patch/0.26.0',
            },
          ]
        }
      ]
    }
  ]
}
