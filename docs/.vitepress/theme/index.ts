// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import MyLayout from './components/MyLayout.vue'
import 'virtual:group-icons.css'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'

import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';

import 'uno.css'
import './style.css'
import './style/index.css'
import './style/animation.css'
import './style/ui.css'

import "vitepress-markdown-timeline/dist/theme/index.css"

export default {
  extends: DefaultTheme,

  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },

  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    // 注册 tabs 组件
    enhanceAppWithTabs(app)
  }
} satisfies Theme
