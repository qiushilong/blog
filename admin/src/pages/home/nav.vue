<template>
  <n-space vertical>
    <n-layout has-sider style="height: calc(100vh - 70px)">
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        :inverted="true"
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :render-label="renderMenuLabel"
          :render-icon="renderMenuIcon"
          :expand-icon="expandIcon"
          :inverted="true"
          @update:value="chooseFn"
        />
      </n-layout-sider>
      <n-layout style="padding: 15px 20px">
        <router-view></router-view>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script lang="ts">
import { h, ref, defineComponent } from "vue";
import { NIcon, NMenu } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5";
import { useRouter } from "vue-router";

import menuOptions from "./menu";

export default defineComponent({
  setup() {
    const router = useRouter();

    return {
      collapsed: ref(true),
      menuOptions,
      chooseFn(key: string, item: MenuOption) {
        console.log(router);
        router.push(`/${key}`);
      },
      renderMenuLabel(option: MenuOption) {
        if ("href" in option) {
          return h(
            "a",
            { href: option.href, target: "_blank" },
            option.label as string
          );
        }
        return option.label as string;
      },
      renderMenuIcon(option: MenuOption) {
        // 渲染图标占位符以保持缩进
        if (option.key === "sheep-man") return true;
        // 返回 falsy 值，不再渲染图标及占位符
        if (option.key === "food") return null;
        return h(NIcon, null, { default: () => h(BookmarkOutline) });
      },
      expandIcon() {
        return h(NIcon, null, { default: () => h(CaretDownOutline) });
      },
    };
  },
});
</script>
