import { defineConfig } from 'vitepress'
import Unocss from 'unocss/vite'

import { nav } from './configs'
import { sidebar } from './configs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'src',
  lang: 'zh-tw',
  title: 'SnowLin Blog',
  description: '一個溫暖的的小窩',
  lastUpdated: true,
  head: [
      // 配置网站的图标（显示在浏览器的 tab 上）
      // ['link', { rel: 'icon', href: `${base}favicon.ico` }], // 修改了 base 这里也需要同步修改
      ['link', { rel: 'icon', href: '/favicon.ico' }],
      [
        'script',
        { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-90WQ945DK0' }
      ],
      [
        'script',
        {},
        `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-90WQ945DK0');`
      ]
    ],
    vite: {
      plugins: [
        Unocss(),
      ]
    },
    themeConfig: {
      // 展示 2,3 级标题在目录中
      outline: {
        level: [2, 3],
        label: '目錄'
      },
      // 預設文案修改
      returnToTopLabel: '回到頂部',
      sidebarMenuLabel: '相關文章',
      lastUpdatedText: '上次更新於',
      langMenuLabel: '更改語言',
      darkModeSwitchLabel: '主題顏色模式',
      lightModeSwitchTitle: '切換到淺色模式',
      darkModeSwitchTitle: '切換到深色模式',
      notFound: {
        title: '這個頁面找不到了',
        quote: '404',
        linkLabel: '回到首頁',
      },
  
      // 设置logo
      logo: '/logo.png',
      // editLink: {
      //   pattern:
      //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
      //   text: '去 GitHub 上编辑内容'
      // },
      nav,
      sidebar,
      docFooter: {
        prev: false,
        next: false
        //prev: '上一頁',
        //next: '下一頁'
      },
      search: {
        provider: "local",
        options: {
          translations: {
            button: { buttonText: "搜尋", buttonAriaLabel: "搜尋" },
            modal: {
              noResultsText: "無法找到相關結果",
              resetButtonTitle: "清除查詢條件",
              footer: {
                selectText: "選擇",
                navigateText: "切換",
                closeText: "關閉",
              },
            },
          },
          locales: {
            cn: {
              translations: {
                button: { buttonText: "搜索", buttonAriaLabel: "搜索" },
                modal: {
                  noResultsText: "无法找到相关结果",
                  resetButtonTitle: "清除查询条件",
                  footer: {
                    selectText: "选择",
                    navigateText: "切换",
                    closeText: "关闭",
                  },
                },
              },
            },
          },
        },
      },
      socialLinks: [
        {
          icon: 'youtube',
          link: 'https://www.youtube.com/@nightsnowlin'
        },
        {
          icon: 'facebook',
          link: 'https://www.facebook.com/SnowLinOuO/'
        },
        {
          icon: 'twitter',
          link: 'https://x.com/nightsnowlin'
        },
        {
          icon: 'github',
          link: 'https://github.com/snowlinouo/snowlin-blog'
        }
      ]
    },
    markdown: {
      container: {
        tipLabel: '提示',
        warningLabel: '警告',
        dangerLabel: '危險',
        infoLabel: '資訊',
        detailsLabel: '詳細資訊'
      }
    }
    //locales: {
    //  root: {
    //    lang: 'zh_tw',
    //    label: '繁體中文'
    //  },
    //  cn: {
    //    lang: 'cn',
    //    label: '簡體中文',
    //  },
    //  en: {
    //    lang: 'en',
    //    label: 'English',
    //  }
    //}
  })