import { defineConfig } from "vitepress";
import { defineTeekConfig } from "vitepress-theme-teek/config";
import timeline from "vitepress-markdown-timeline"; // 導入時間線插件

import { nav } from './configs'
import { sidebar } from './configs'

const description = ["vitepress-theme-teek 使用文件", "vitepress 主題框架"].toString();

const teekConfig = defineTeekConfig({
  author: { name: "雪鈴", link: "https://github.com/snowlinouo" },
  blogger: {
    // 部落客資訊，顯示在首頁側邊欄
    avatar: "/logo.png",
    avatarStyle: "radius",
    name: "雪鈴",
    slogan: "喵喵(?",
  },
  topArticle: {
  },
  category: {
    pageTitle: "全部分類",
    homeTitle: "文章分類",
    emptyLabel: "暫無文章分類",
  },
  tag: {
  },
  friendLink: {
    enabled: true, // 是否启用友情链接卡片
    list: [
    ], // 友情链接数据列表
    limit: 5, // 一页显示的数量
    autoScroll: false, // 是否自动滚动
    scrollSpeed: 2500, // 滚动间隔时间，单位：毫秒。autoScroll 为 true 时生效
    autoPage: false, // 是否自动翻页
    pageSpeed: 4000, // 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
  },
  footerInfo: {
    theme: {
      show: false, // 是否顯示主題版權，建議顯示
      name: "", // 自訂名稱
      link: "", // 自訂連結
    },
    copyright: {
      createYear: 2024,
      suffix: "雪鈴 SnowLin",
    },
  },
  themeSetting: {
    themeSize: "large",
    themeStyleLabel: {
      vpLabel: "VP 主題",
      vpTip: "VitePress 主題",
      default: "預設",
      vpGreen: "綠色",
      vpYellow: "黃色",
      vpRed: "紅色",
      epLabel: "EP 主題",
      epTip: "Element Plus 主題",
      epBlue: "藍色",
      epGreen: "綠色",
      epYellow: "黃色",
      epRed: "紅色",
    },
    themeSizeLabel: {
      wide: "寬",
      large: "長",
      default: "預設",
      small: "小",
    },
    titleTip: {
      backTop: "回到頂部",
      toComment: "前往評論",
      themeSize: "主題尺寸",
      themeStyle: "主題樣式",
    },
  },
  banner: {
    enabled: true,
    bgStyle: "partImg", // Banner 背景風格：pure 為純色背景，partImg 為局部圖片背景，fullImg 為全螢幕圖片背景
    pureBgColor: "#28282d", // Banner 背景色，bgStyle 為 pure 時生效
    imgSrc: ["/bg1.jpg"], // Banner 圖片連結。bgStyle 為 partImg 或 fullImg 時生效
    imgInterval: 15000, // 當多張圖片時（imgSrc 為數組），設置切換時間，單位：毫秒
    imgShuffle: false, // 圖片是否隨機切換，為 false 時按順序切換，bgStyle 為 partImg 或 fullImg 時生效
    imgWaves: true, // 是否開啟 Banner 圖片波浪紋，bgStyle 為 fullImg 時生效
    mask: true, // Banner 圖片遮罩，bgStyle 為 partImg 或 fullImg 時生效
    maskBg: "rgba(0, 0, 0, 0.4)", // Banner 遮罩顏色，如果為數字，則是 rgba(0, 0, 0, ${maskBg})，如果為字串，則作為背景色。bgStyle 為 partImg 或 fullImg 且 mask 為 true 時生效
    textColor: "#ffffff", // Banner 字體顏色，bgStyle 為 pure 時為 '#000000'，其他為 '#ffffff'
    titleFontSize: "3.2rem", // 標題字體大小
    descFontSize: "1.4rem", // 描述字體大小
    descStyle: "default", // 描述資訊風格：default 為純文字渲染風格（如果 description 為數組，則取第一個），types 為文字列印風格，switch 為文字切換風格
    description: ["一個溫暖的地方"], // 描述資訊
    switchTime: 4000, // 描述資訊切換間隔時間，單位：毫秒。descStyle 為 switch 時生效
    switchShuffle: false, // 描述資訊是否隨機切換，為 false 時按順序切換。descStyle 為 switch 時生效
    typesInTime: 200, // 輸出一個文字的時間，單位：毫秒。descStyle 為 types 時生效
    typesOutTime: 100, // 刪除一個文字的時間，單位：毫秒。descStyle 為 types 時生效
    typesNextTime: 800, // 打字與刪字的間隔時間，單位：毫秒。descStyle 為 types 時生效
    typesShuffle: false, // 描述資訊是否隨機打字，為 false 時按順序打字，descStyle 為 types 時生效
  },
  article: {
    showIcon: true, // 作者、日期、分類、標籤、字數、閱讀時長、瀏覽量等文章資訊的圖示是否顯示
    dateFormat: "yyyy-MM-dd", // 文章日期格式，首頁和文章頁解析日期時使用
    showInfo: true, // 是否展示作者、日期、分類、標籤、字數、閱讀時長、瀏覽量等文章資訊，分別作用於首頁和文章頁
    showAuthor: true, // 是否展示作者
    showCreateDate: true, // 是否展示創建日期
    showUpdateDate: false, // 是否展示更新日期，僅在文章頁顯示
    showCategory: true, // 是否展示分類
    showTag: true, // 是否展示標籤
    titleTip: {
      author: "作者",
      createTime: "創建時間",
      updateTime: "更新時間",
      category: "分類",
      tag: "標籤",
      wordCount: "文章字數",
      readingTime: "預計閱讀時間",
      pageView: "瀏覽量",
    },
  },
  post: {
    excerptPosition: "top", // 文章摘要位置
    showMore: false, // 是否顯示更多按鈕
    moreLabel: "閱讀全文 >", // 更多按鈕文字
    coverImgMode: "default", // 文章封面圖模式
    showCapture: false, // 是否在摘要位置顯示文章部分文字，當為 true 且不使用 frontmatter.describe 和 <!-- more --> 時，會自動截取前 400 個字元作為摘要
  },
  breadcrumb: {
    enabled: true, // 是否启用面包屑
    showCurrentName: false, // 面包屑最后一列是否显示当前文章的文件名
    separator: "/", // 面包屑分隔符
    homeLabel: "首頁",
  },
  vitePlugins: {
    sidebarOption: {
      initItems: false,
    },
  },
  markdownPlugins: [
    (md: any) => md.use(timeline), //時間線插件
  ],
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: teekConfig,
  base: "/",
  title: "SnowLin Blog",
  description: description,
  cleanUrls: true,
  lastUpdated: true,
  lang: "zh-TW",
  head: [
    ["link", { rel: "icon", type: "image/png", href: "logo.png" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh-TW" }],
    ["meta", { property: "og:title", content: "Blog | SnowLin Blog" }],
    ["meta", { property: "og:site_name", content: "Teek" }],
    ["meta", { property: "og:image", content: "" }],
    ["meta", { property: "og:url", content: "" }],
    ["meta", { name: "author", content: "Teek" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
      },
    ],
    [
      "meta",
      {
        name: "description",
        description,
      },
    ],
    ["meta", { name: "keywords", description }],
  ],
  markdown: {
    // 開啟行號
    lineNumbers: true,
    image: {
      // 預設禁用；設置為 true 可為所有圖片啟用懶載入。
      lazyLoading: true,
    },
    // 更改容器預設值標題
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危險",
      infoLabel: "訊息",
      detailsLabel: "詳細訊息",
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.png",
    darkModeSwitchLabel: "主題",
    sidebarMenuLabel: "選單",
    returnToTopLabel: "返回頂部",
    lastUpdatedText: "上次更新時間",
    outline: {
      level: [2, 4],
      label: "本頁導航",
    },
    docFooter: {
      prev: "上一頁",
      next: "下一頁",
    },
    nav,
    sidebar,
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
    ],

    search: {
      provider: "local",
    },
    editLink: {
      text: "在 GitHub 上編輯此頁",
      pattern: "https://github.com/Kele-Bingtang/vitepress-theme-teek/edit/master/hd-security-docs/docs/:path",
    },
  },
});
