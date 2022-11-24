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
          :inverted="true"
          @update:value="chooseFn"
        />
      </n-layout-sider>

      <n-layout style="padding: 15px 20px; background-color: #f0f0f0">
        <router-view></router-view>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { NMenu } from "naive-ui";
import type { MenuOption } from "naive-ui";
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
    };
  },
});
</script>
