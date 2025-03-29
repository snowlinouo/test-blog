# vitepress-plugin-permalink

这是一个适用于 `vitepress` 的 Vite 插件，在 `vitepress` 启动后读取 markdown 文档 `frontmatter` 的 `permalink`。

## ✨ Feature

- 🚀🚀 支持给 markdown 文档设置唯一的访问 **永久链接**，不再因为 markdown 文档路径移动而导致访问地址发生变化
- 🚀 读取 markdown 文档 `frontmatter` 的 `permalink`，挂载到 `themeConfig.permalinks`
- 🚀 提供 `usePermalink` hooks 函数拓展 `router` 方法，支持 `router.push(href)` 跳转到永久链接或实际的文件路径
- 🚀 支持 locales 国际化，自动给 **永久链接** 添加语言前缀，不同语言的永久链接不会重复
- 🚀 支持 rewrite 路由重写，最终得到的文档路径是 rewrite 路由重写后的路径
- 🚀 **永久链接** 支持导航栏激活高亮

## 🕯️ Install

安装 `vitepress-plugin-permalink` 插件

```bash
# 推荐使用 pnpm
pnpm i vitepress-plugin-permalink
# or yarn
yarn add vitepress-plugin-permalink
# or npm
npm install vitepress-plugin-permalink
```

添加 `vitepress-plugin-permalink` 插件到 `.vitepress/config.ts`

```typescript
import { defineConfig } from "vitepress";
import Permalink from "vitepress-plugin-permalink";

export default defineConfig({
  vite: {
    plugins: [Permalink(/* options */)],
  },
});
```

> 说明：该插件仅限项目启动时生效，已改动或新添加的 markdown 需要重启项目才能生效。

插件默认忽略 `["node_modules", "dist", ".vitepress", "public"]` 目录下的文件，且只扫描 markdown 文档。

## 🛠️ Options

| name              | description                                                                  | type       | default                        |
| ----------------- | ---------------------------------------------------------------------------- | ---------- | ------------------------------ |
| ignoreList        | 忽略的文件/文件夹列表，支持正则表达式                                        | `string[]` | `[]`                           |
| path              | 指定扫描的根目录                                                             | `string`   | `vitepress` 的 `srcDir` 配置项 |
| notFoundDelayLoad | 404 页面延迟加载时间，单位为毫秒，仅限第一次进入页面或刷新/回退/前进页面生效 | `number`   | 400                            |

## ❗ Warning

插件的 `usePermalink` 函数使用了 `router.onBeforeRouteChange` 和 `router.onAfterRouteChange` 回调方法。

如果您也需要使用这些回调函数，请不要直接这样使用：

```typescript
router.onAfterRouteChange = (href: string) => {
  // 你的逻辑
};
```

`onAfterRouteChange` 是一个函数，您这样使用将会 **覆盖** Teek 在该回调函数的逻辑，因此您需要这样使用：

```typescript
// 获取可能已有的 onAfterRouteChange
const selfOnAfterRouteChange = router.onAfterRouteChange;

router.onAfterRouteChange = (href: string) => {
  // 调用可能已有的 onAfterRouteChange
  selfOnAfterRouteChange?.(href);

  // 调用自己的函数
  myFunction();
};

const myFunction = () => {
  /* */
};
```

`onBeforeRouteChange` 支持返回 false 来阻止路由跳转，因此请这样使用：

```typescript
// 获取可能已有的 onBeforeRouteChange
const selfOnBeforeRouteChange = router.onBeforeRouteChange;

router.onBeforeRouteChange = (href: string) => {
  // 调用已有的 onBeforeRouteChange
  const selfResult = selfOnBeforeRouteChange?.(href);
  if (selfResult === false) return false;

  // 调用自己的函数
  myFunction();
};

const myFunction = () => {
  /* */
};
```

## 📖 Usage

### usePermalink 函数

在 `.vitepress/theme/index.ts` 引入 `usePermalink` 函数来初始化 permalinks 功能：

```typescript
import { h, defineComponent } from "vue";
import DefaultTheme from "vitepress/theme";
import usePermalink from "vitepress-plugin-permalink/src/usePermalink";

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    name: "LayoutProvider",
    setup() {
      // 开启监听 permalink
      usePermalink().startWatch();

      return h(DefaultTheme.Layout, null, {});
    },
  }),
};
```

假设项目的目录结构如下：

```text
.
├─ docs                # 项目根目录
│  ├─ guide
│  │  └─ api.md
```

`api.md` 内容如下：

```yaml
---
permalink: /guide-api
---
```

- 访问 `/guide/api.html` 可以进入文档页面，这是 vitepress 的自带功能。**如果文件路径发生改变，访问链接也随着改变**
- 访问 `/guide-api` 可以进入文档页面，这是插件的实现功能。**不会随着文件路径变化而改变**

永久链接是唯一的，如果出现两个一样的永久链接，则后面的永久链接覆盖前面的，但不影响 vitepress 自带访问路径。

如果永久链接不生效，代表 `usePermalink().startWatch()` 并没有被执行，请在注册 vitepress 或者任意主题前加载该函数，如何注册请看 ([扩展默认主题 | VitePress](https://vitepress.dev/zh/guide/extending-default-theme#layout-slots))

### notFoundDelayLoad 配置项

使用了 `usePermalink` 函数来提供 `permalink` 功能，但是在第一次进入页面或刷新、回退、前进时，会有 404 页面短暂出现，因此需要引用 `NotFoundDelay.vue` 组件来延迟 404 页面的加载时间。

`NotFoundDelay.vue` 组件已经集成了 Vitepress，您可以无需手动引入 `NotFoundDelay.vue` 组件。

您需要了解的是搭配 `NotFoundDelay.vue` 组件的一个核心配置项：`notFoundDelayLoad`。

`vitepress-plugin-permalink` 插件在 `onBeforeMounted` 里根据自定义 URL 寻找对应的文档进行加载，但是 Vitepress 初始化页面在 ``onBeforeMounted` 之前执行，因此需要延迟时间来等待 `vitepress-plugin-permalink` 插件执行完成，于是需要使用 `notFoundDelayLoad` 配置项来决定 404 页面延迟加载时间，单位为毫秒，默认为 400 毫秒。

如果发现第一次进入页面或刷新、回退、前进时有 404 页面短暂出现，则将 `notFoundDelayLoad` 配置项的时间调大。

## 📘 TypeScript

```typescript
export interface PermalinkOption {
  /**
   * 忽略的文件/文件夹列表，支持正则表达式
   *
   * @default []
   */
  ignoreList?: Array<RegExp | string>;
  /**
   * 文章所在的目录，基于 package.json 所在目录，开头不需要有 /
   * @default 'vitepress 的 srcDir 配置项'
   */
  path?: string;
}

export interface NotFoundOption {
  /**
   * 404 页面延迟加载时间，单位为毫秒，仅限第一次进入页面或刷新/回退/前进页面生效
   *
   * VP 404 页面兼容 permalink 插件，因为 permalink 插件支持自定义 URL，但是 VP 初始化页面时根据自定义 URL 寻找文档会 404，因此需要延迟时间来给 permalink 插件寻找正确的文档路径
   * 如果发现刷新页面有 404 页面短暂出现，则将 notFoundDelayLoad 配置项的时间调大
   *
   * @default 400
   */
  notFoundDelayLoad?: number;
}

export interface Permalink {
  /**
   * key 为文件相对路径，value 为永久链接
   */
  map: Record<string, string>;
  /**
   * key 为永久链接，value 为文件相对路径
   */
  inv: Record<string, string>;
}
```

## 🉑 License

[MIT](../../LICENSE) License © 2025 [Teeker](https://github.com/Kele-Bingtang)
