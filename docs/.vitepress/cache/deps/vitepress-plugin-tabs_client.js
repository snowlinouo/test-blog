import {
  reactive,
  watch
} from "./chunk-GQNILTAQ.js";

// node_modules/.pnpm/vitepress-plugin-tabs@0.6.0_ebfb61cc010ff31eff13764d33639b2f/node_modules/vitepress-plugin-tabs/src/client/index.ts
import PluginTabs from "E:/GitHub/test-blog/node_modules/.pnpm/vitepress-plugin-tabs@0.6.0_ebfb61cc010ff31eff13764d33639b2f/node_modules/vitepress-plugin-tabs/src/client/PluginTabs.vue";
import PluginTabsTab from "E:/GitHub/test-blog/node_modules/.pnpm/vitepress-plugin-tabs@0.6.0_ebfb61cc010ff31eff13764d33639b2f/node_modules/vitepress-plugin-tabs/src/client/PluginTabsTab.vue";

// node_modules/.pnpm/vitepress-plugin-tabs@0.6.0_ebfb61cc010ff31eff13764d33639b2f/node_modules/vitepress-plugin-tabs/src/client/useTabsSelectedState.ts
var injectionKey = "vitepress:tabSharedState";
var ls = typeof localStorage !== "undefined" ? localStorage : null;
var localStorageKey = "vitepress:tabsSharedState";
var setLocalStorageValue = (v) => {
  if (!ls) return;
  ls.setItem(localStorageKey, JSON.stringify(v));
};
var provideTabsSharedState = (app) => {
  const state = reactive({});
  watch(
    () => state.content,
    (newStateContent, oldStateContent) => {
      if (newStateContent && oldStateContent) {
        setLocalStorageValue(newStateContent);
      }
    },
    { deep: true }
  );
  app.provide(injectionKey, state);
};

// node_modules/.pnpm/vitepress-plugin-tabs@0.6.0_ebfb61cc010ff31eff13764d33639b2f/node_modules/vitepress-plugin-tabs/src/client/index.ts
var enhanceAppWithTabs = (app) => {
  provideTabsSharedState(app);
  app.component("PluginTabs", PluginTabs);
  app.component("PluginTabsTab", PluginTabsTab);
};
export {
  enhanceAppWithTabs
};
//# sourceMappingURL=vitepress-plugin-tabs_client.js.map
