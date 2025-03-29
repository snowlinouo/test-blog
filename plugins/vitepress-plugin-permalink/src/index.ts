import type { Plugin } from "vite";
import type { DefaultTheme } from "vitepress";
import createPermalinks, { standardLink } from "./helper";
import type { NotFoundOption, Permalink, PermalinkOption } from "./types";
import { dirname, join } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import logger from "./log";

export * from "./types";

/**
 * 默认暴露 2 个插件集
 */
export default function VitePluginVitePressPermalink(
  option: { permalinkOption?: PermalinkOption; notFoundOption?: NotFoundOption } = {}
) {
  return [
    VitePluginVitePressNotFoundDelayLoad(option.notFoundOption),
    VitePluginVitePressAutoPermalink(option.permalinkOption),
  ];
}

/**
 * 扫描项目目录，生成 permalink
 */
export function VitePluginVitePressAutoPermalink(option: PermalinkOption = {}): Plugin & { name: string } {
  return {
    name: "vite-plugin-vitepress-auto-permalink",
    config(config: any) {
      const {
        site: { themeConfig, cleanUrls, locales },
        srcDir,
        rewrites,
      } = config.vitepress;

      // 防止 vitepress build 时重复执行
      if (themeConfig.permalinks) return;

      const baseDir = option.path ? join(process.cwd(), option.path) : srcDir;

      const permalinks = createPermalinks({ ...option, path: baseDir }, cleanUrls);

      // Key 为 path，Value 为 permalink
      const pathToPermalink: Record<string, string> = {};
      // Key 为 permalink，Value 为 path
      const permalinkToPath: Record<string, string> = {};
      // 国际化多语言 key 数组
      const localesKeys = Object.keys(locales || {});

      for (const [key, value] of Object.entries(permalinks)) {
        // 如果设置了 rewrites，则取 rewrites 后的文件路径
        const rewriteFilePath = rewrites.map[`${key}.md`]?.replace(/\.md/, "") || key;
        // 如果设置了多语言，则 permalink 添加语言前缀
        let newValue = getLocalePermalink(localesKeys, key, value);

        if (permalinkToPath[newValue]) {
          logger.warn(`永久链接 '${newValue}' 已存在，其对应的 '${permalinkToPath[newValue]}' 将会被 '${key}' 覆盖`);
        }

        pathToPermalink[rewriteFilePath] = newValue;
        permalinkToPath[newValue] = rewriteFilePath;
      }

      themeConfig.permalinks = { map: pathToPermalink, inv: permalinkToPath } as Permalink;

      logger.info("Injected Permalinks Data Successfully. 注入永久链接数据成功!");

      // 导航栏高亮适配 permalink
      if (!localesKeys.length) {
        return setActiveMatchWhenUsePermalink({
          nav: themeConfig.nav,
          permalinkToPath,
          rewrites,
          cleanUrls,
        });
      }

      localesKeys.forEach(localeKey => {
        setActiveMatchWhenUsePermalink({
          nav: locales[localeKey].themeConfig?.nav,
          permalinkToPath,
          rewrites,
          cleanUrls,
        });
      });
    },
  };
}

/**
 * 给 permalink 添加多语言前缀
 *
 * @param localesKeys 多语言 key 数组，排除 root 根目录
 * @param path 文件路径
 * @param permalink 永久链接
 */
const getLocalePermalink = (localesKeys: string[] = [], path = "", permalink = "") => {
  // 过滤掉 root 根目录
  const localesKey = localesKeys.filter(key => key !== "root").find(key => path.startsWith(key));
  if (localesKey) return `/${localesKey}${permalink.startsWith("/") ? permalink : `/${permalink}`}`;

  return permalink;
};

interface SetActiveMatchWhenUsePermalinkOption {
  /**
   * 导航栏
   */
  nav: (DefaultTheme.NavItemWithLink & { items: any })[];
  /**
   * permalink 和文件路径的映射关系
   */
  permalinkToPath: Record<string, string>;
  /**
   * 如果设置了 rewrites，则取 rewrites 后的文件路径
   */
  rewrites?: Record<string, any>;
  /**
   * vitepress 配置项，true 关闭 .html 后缀，false 开启 .html 后缀
   */
  cleanUrls?: boolean;
}

/**
 * 如果 nav 有 link 且 link 为 permalink，则添加 activeMatch 为 permalink 对应的文件路径，如果没有 link，则代表是下拉组，activeMatch 为子级的上一层目录
 * 这里的处理是导航栏兼容 permalink 的高亮功能，默认访问 permalink 后，导航栏不会高亮，因为导航栏是根据实际的文件路径进行匹配
 *
 * @param option 配置项
 * @param parentNav 父级导航
 */
const setActiveMatchWhenUsePermalink = (
  option: SetActiveMatchWhenUsePermalinkOption,
  parentNav?: DefaultTheme.NavItemWithLink
) => {
  const { nav = [], permalinkToPath, rewrites = {}, cleanUrls = false } = option;

  if (!nav.length) return;

  nav.forEach(item => {
    if (item.link === "/" || item.activeMatch) return;

    const link = standardLink(item.link);
    // cleanUrls 为 false 时，permalinkToPath 的 key 都会带上 .html
    const path = permalinkToPath[cleanUrls ? link : `${link.replace(/\.html/, "")}.html`];

    if (path) {
      // 如果设置了 rewrites，则取 rewrites 后的文件路径
      const finalPath = rewrites.map[`${path}.md`]?.replace(/\.md/, "") || path;

      item.activeMatch = finalPath;
      // 父级的 activeMatch 为子级的上一层目录，这样访问任意子级 Markdown 链接，父级导航会高亮
      if (parentNav) parentNav.activeMatch = finalPath.slice(0, finalPath.lastIndexOf("/"));
    }

    if (item.items?.length) {
      setActiveMatchWhenUsePermalink({ nav: item.items, permalinkToPath, rewrites, cleanUrls }, item);
    }
  });
};

// ---------- VitePluginVitePressNotFoundDelayLoad 插件 ---------

const isESM = () => {
  return typeof __filename === "undefined" || typeof __dirname === "undefined";
};

const getDirname = () => {
  return isESM() ? dirname(fileURLToPath(import.meta.url)) : __dirname;
};

const componentName = "NotFoundDelay";
const componentFile = `${componentName}.vue`;
const aliasComponentFile = `${getDirname()}/components/${componentFile}`;
const virtualModuleId = "virtual:not-found-option";
const resolvedVirtualModuleId = `\0${virtualModuleId}`;

/**
 * 将 NotFoundDelay 组件传入 Vitepress 的 not-found 插槽
 */
export function VitePluginVitePressNotFoundDelayLoad(option: NotFoundOption = {}): Plugin & { name: string } {
  return {
    name: "vite-plugin-vitepress-not-found-delay-load",
    config() {
      return {
        resolve: {
          alias: {
            [`./${componentFile}`]: aliasComponentFile,
          },
        },
      };
    },
    resolveId(id: string) {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load(id: string) {
      // 使用虚拟模块将 option 传入组件里
      if (id === resolvedVirtualModuleId) return `export default ${JSON.stringify(option)}`;

      // 在 Layout.vue 插槽插入自定义组件
      if (id.endsWith("vitepress/dist/client/theme-default/Layout.vue")) {
        // 读取原始的 Vue 文件内容
        const code = readFileSync(id, "utf-8");

        // 插入自定义组件
        const slotPosition = '<slot name="not-found" />';
        const setupPosition = '<script setup lang="ts">';

        return code
          .replace(slotPosition, `<${componentName}><template #not-found>${slotPosition}</template></${componentName}>`)
          .replace(setupPosition, `${setupPosition}\nimport ${componentName} from './${componentFile}'`);
      }
    },
  };
}
