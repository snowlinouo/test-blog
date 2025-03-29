import Teek from "vitepress-theme-teek";
import "vitepress-theme-teek/index.css";
import "vitepress-theme-teek/vp-plus/code-block-mobile.scss"; // 移动端代码块样式加 padding
import "vitepress-theme-teek/vp-plus/sidebar.scss"; // 侧边栏字体样式
import "vitepress-theme-teek/vp-plus/nav.scss"; // 导航栏样式
import "vitepress-theme-teek/vp-plus/nav-blur.scss"; // 导航栏毛玻璃样式
import "vitepress-theme-teek/vp-plus/aside.scss"; // 文章目录样式
import "vitepress-theme-teek/vp-plus/doc-h1-gradient.scss"; // 文档以及标题样式
import "vitepress-theme-teek/vp-plus/table.scss";
import "vitepress-theme-teek/vp-plus/mark.scss"; // 文章 mark 标签样式
// import "vitepress-theme-teek/vp-plus/container-left.scss"; // Markdown 容器左框样式
// import "vitepress-theme-teek/vp-plus/container-flow.scss"; // Markdown 容器流体样式
import "vitepress-theme-teek/vp-plus/blockquote.scss";
import "vitepress-theme-teek/vp-plus/index-rainbow.scss";
import "vitepress-markdown-timeline/dist/theme/index.css"; // 引入时间线样式

//import "./styles/style.scss";
import "./styles/code-bg.scss";
import "./styles/text-color.css"
import "./styles/text-markdown-color.css"

export default {
  extends: Teek,
  enhanceApp({ app, router }) {},
};
