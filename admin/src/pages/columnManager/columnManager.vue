<template>
  <n-card id="container-card" title="">
    <header class="header">
      <n-form
        ref="formRef"
        inline
        :label-width="80"
        :model="formValue"
        size="medium"
        label-placement="left"
      >
        <n-form-item label="标题：" path="title">
          <n-input v-model:value="formValue.title" placeholder="标题" />
        </n-form-item>
      </n-form>

      <n-button type="primary" @click="showAddDrawer">新增</n-button>
    </header>

    <n-grid :x-gap="12" :y-gap="8" :cols="cols">
      <n-grid-item v-for="column in dataSource">
        <div class="light-green card">
          <div class="title">{{ column.title }}</div>
          <p class="introduce">{{ column.introduce }}</p>
          <div class="createDate">{{ column.createDate }}</div>
        </div>
      </n-grid-item>
    </n-grid>
  </n-card>

  <add-drawer :visible="drawerVisible" @updateShow="updateVisible"></add-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import { debounce } from "lodash";
import { FormInst } from "naive-ui";
import { fetchColumn } from "@/services/column";
import { IColumn } from "@/types/column";
import AddDrawer from "./view/addDrawer.vue";

export default defineComponent({
  components: {
    AddDrawer,
  },
  setup() {
    const cols = ref<number>(5);
    const dataSource = ref<IColumn[]>([]);
    const formRef = ref<FormInst | null>(null);
    const drawerVisible = ref<boolean>(false);

    fetchColumn().then((result) => {
      if (result) {
        const { code, data } = result.data;
        if (code === 200) {
          dataSource.value = data;
        }
      }
    });

    const resizeObserver = new ResizeObserver(
      debounce(([entry]) => {
        if (entry.contentBoxSize) {
          const contentBoxSize = Array.isArray(entry.contentBoxSize)
            ? entry.contentBoxSize[0]
            : entry.contentBoxSize;
          const newCols = Math.floor(contentBoxSize.inlineSize / 170);
          cols.value = newCols;
        }
      }, 100)
    );

    onMounted(() => {
      const dom = document.querySelector("#container-card")!;
      resizeObserver.observe(dom);
    });

    onBeforeUnmount(() => {
      const dom = document.querySelector("#container-card")!;
      resizeObserver.unobserve(dom);
    });

    return {
      cols,
      dataSource,
      formValue: ref({
        title: "",
        specialColumn: "",
        tags: "",
      }),
      formRef,
      drawerVisible,
      updateVisible(visible: boolean) {
        drawerVisible.value = visible;
      },
      showAddDrawer() {
        drawerVisible.value = true;
      },
    };
  },
});
</script>

<style scoped lang="less">
#container-card {
  .header {
    display: flex;
    justify-content: space-between;
  }

  .card {
    padding: 10px;
    width: 150px;
    height: 200px;
    transition: all 0.5s;
    &:hover {
      transform: translate(2px, -2px);
    }
    .title {
      font-weight: bold;
    }
  }
}

.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
  width: 150px;
  height: 200px;
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
  width: 150px;
  height: 200px;
}
</style>
