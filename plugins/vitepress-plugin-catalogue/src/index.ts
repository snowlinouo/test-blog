import type { Plugin } from "vite";
import { Catalogue, CatalogueOption } from "./types";
import createCatalogues from "./helper";
import { join } from "node:path";
import logger from "./log";

export * from "./types";

export default function VitePluginVitePressCatalogue(option: CatalogueOption = {}): Plugin & { name: string } {
  return {
    name: "vite-plugin-vitepress-catalogue",
    config(config: any) {
      const {
        site: { themeConfig },
        srcDir,
      } = config.vitepress;

      // 防止 vitepress build 时重复执行
      if (themeConfig.catalogues) return;

      const baseDir = option.path ? join(process.cwd(), option.path) : srcDir;
      const catalogues = createCatalogues({ ...option, path: baseDir });

      const finalCatalogues: Catalogue = { arr: catalogues, map: {}, inv: {} };

      catalogues.forEach(item => {
        const { filePath, path, catalogues = [] } = item;

        finalCatalogues.map[filePath] = { path, catalogues };
        finalCatalogues.inv[path] = { filePath, catalogues };
      });

      themeConfig.catalogues = finalCatalogues;

      logger.info("Injected Catalogues Data Successfully. 注入目录页数据成功!");
    },
  };
}
