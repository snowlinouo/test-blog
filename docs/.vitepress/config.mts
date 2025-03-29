import { defineConfig } from "vitepress";
import tkThemeConfig from "vitepress-theme-teek/config";
import timeline from "vitepress-markdown-timeline"; // 导入时间线插件

import { nav } from './configs'
import { sidebar } from './configs'

const description = ["vitepress-theme-teek 使用文档", "vitepress 主题框架"].toString();

const tkConfig = tkThemeConfig({
  author: { name: "雪鈴", link: "https://github.com/snowlinouo" },
  blogger: {
    // 博主信息，显示在首页侧边栏
    avatar: "/logo.png",
    avatarStyle: "radius",
    name: "雪鈴",
    slogan: "喵喵(?",
  },
  footerInfo: {
    theme: {
      show: false, // 是否显示主题版权，建议显示
      name: "", // 自定义名称
      link: "", // 自定义链接
    },
    copyright: {
      createYear: 2024,
      suffix: "雪鈴 SnowLin",
    },
  },
  themeSetting: {
    themeSize: "large",
  },
  banner: {
    enabled: true,
    bgStyle: "partImg", // Banner 背景风格：pure 为纯色背景，partImg 为局部图片背景，fullImg 为全屏图片背景
    pureBgColor: "#28282d", // Banner 背景色，bgStyle 为 pure 时生效
    imgSrc: ["/bg1.jpg"], // Banner 图片链接。bgStyle 为 partImg 或 fullImg 时生效
    imgInterval: 15000, // 当多张图片时（imgSrc 为数组），设置切换时间，单位：毫秒
    imgShuffle: false, // 图片是否随机切换，为 false 时按顺序切换，bgStyle 为 partImg 或 fullImg 时生效
    imgWaves: true, // 是否开启 Banner 图片波浪纹，bgStyle 为 fullImg 时生效
    mask: true, // Banner 图片遮罩，bgStyle 为 partImg 或 fullImg 时生效
    maskBg: "rgba(0, 0, 0, 0.4)", // Banner 遮罩颜色，如果为数字，则是 rgba(0, 0, 0, ${maskBg})，如果为字符串，则作为背景色。bgStyle 为 partImg 或 fullImg 且 mask 为 true 时生效
    textColor: "#ffffff", // Banner 字体颜色，bgStyle 为 pure 时为 '#000000'，其他为 '#ffffff'
    titleFontSize: "3.2rem", // 标题字体大小
    descFontSize: "1.4rem", // 描述字体大小
    descStyle: "default", // 描述信息风格：default 为纯文字渲染风格（如果 description 为数组，则取第一个），types 为文字打印风格，switch 为文字切换风格
    description: ["一個溫暖的地方"], // 描述信息
    switchTime: 4000, // 描述信息切换间隔时间，单位：毫秒。descStyle 为 switch 时生效
    switchShuffle: false, // 描述信息是否随机切换，为 false 时按顺序切换。descStyle 为 switch 时生效
    typesInTime: 200, // 输出一个文字的时间，单位：毫秒。descStyle 为 types 时生效
    typesOutTime: 100, // 删除一个文字的时间，单位：毫秒。descStyle 为 types 时生效
    typesNextTime: 800, // 打字与删字的间隔时间，单位：毫秒。descStyle 为 types 时生效
    typesShuffle: false, // 描述信息是否随机打字，为 false 时按顺序打字，descStyle 为 types 时生效
  },
  post: {
    excerptPosition: "top", // 文章摘要位置
    showMore: false, // 是否显示更多按钮
    moreLabel: "阅读全文 >", // 更多按钮文字
    coverImgMode: "default", // 文章封面图模式
    showCapture: false, // 是否在摘要位置显示文章部分文字，当为 true 且不使用 frontmatter.describe 和 <!-- more --> 时，会自动截取前 400 个字符作为摘要
  },
  vitePlugins: {
    sidebarOption: {
      initItems: false,
    },
  },
  markdownPlugins: [
    (md: any) => md.use(timeline), //时间线插件
  ],
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: tkConfig,
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
    // 开启行号
    lineNumbers: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
    // 更改容器默认值标题
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.png",
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "上次更新时间",
    outline: {
      level: [2, 4],
      label: "本页导航",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
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
      text: "在 GitHub 上编辑此页",
      pattern: "https://github.com/Kele-Bingtang/vitepress-theme-teek/edit/master/hd-security-docs/docs/:path",
    },
  },
});
