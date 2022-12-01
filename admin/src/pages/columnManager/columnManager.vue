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

    <n-grid v-if="!loading" :x-gap="12" :y-gap="20" :cols="cols">
      <n-grid-item v-for="(column, index) in dataSource" :key="column.id">
        <div :class="`card ${index % 2 === 0 ? 'light-green' : 'green'}`">
          <div class="title">{{ column.title }}</div>
          <p class="introduce">{{ column.introduce }}</p>
          <div class="createDate">{{ formatDate(column.createDate) }}</div>
          <div class="opt">
            <n-icon class="icon" :component="CreateOutline" title="编辑" />
            <n-icon class="icon" :component="EyeOutline" title="查看" />
            <n-icon class="icon" :component="CloseCircleOutline" title="删除" />
          </div>
        </div>
      </n-grid-item>
    </n-grid>

    <div class="pagination" v-if="!loading">
      <n-pagination
        v-model:page="page"
        v-model:page-size="pageSize"
        :page-count="100"
        show-size-picker
        :page-sizes="[10, 20, 30, 40]"
      >
        <template #prefix> 共 {{ 1000 }} 条 </template>
      </n-pagination>
    </div>

    <n-spin size="large" v-if="loading" />
  </n-card>

  <add-drawer :visible="drawerVisible" @updateShow="updateVisible"></add-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import { FormInst } from "naive-ui";
import {
  EyeOutline,
  CreateOutline,
  CloseCircleOutline,
} from "@vicons/ionicons5";
import { fetchColumn } from "@/services/column";
import { IColumn } from "@/types/column";
import { formatDate } from "@/util/date";
import AddDrawer from "./view/addDrawer.vue";

export default defineComponent({
  components: {
    AddDrawer,
  },
  setup() {
    const cols = ref<number>(24);
    const dataSource = ref<IColumn[]>([]);
    const formRef = ref<FormInst | null>(null);
    const drawerVisible = ref<boolean>(false);
    const loading = ref<boolean>(false);

    const getColumnList = () => {
      loading.value = true;
      fetchColumn()
        .then((result) => {
          if (result) {
            const { code, data } = result.data;
            if (code === 200) {
              dataSource.value = data;
            }
          }
        })
        .finally(() => {
          loading.value = false;
        });
    };
    getColumnList();

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (entry.contentBoxSize) {
        const contentBoxSize = Array.isArray(entry.contentBoxSize)
          ? entry.contentBoxSize[0]
          : entry.contentBoxSize;
        const newCols = Math.floor(contentBoxSize.inlineSize / 170);
        cols.value = newCols;
      }
    });

    onMounted(() => {
      const dom = document.querySelector("#container-card")!;
      resizeObserver.observe(dom);
    });

    onBeforeUnmount(() => {
      const dom = document.querySelector("#container-card")!;
      resizeObserver.unobserve(dom);
    });

    return {
      page: ref(1),
      pageSize: ref(20),
      cols,
      dataSource,
      formValue: ref({
        title: "",
        specialColumn: "",
        tags: "",
      }),
      loading,
      formRef,
      drawerVisible,
      formatDate,
      EyeOutline,
      CreateOutline,
      CloseCircleOutline,
      updateVisible({
        visible,
        update,
      }: {
        visible: boolean;
        update: boolean;
      }) {
        drawerVisible.value = visible;
        update && getColumnList();
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
    position: relative;
    padding: 10px;
    width: 150px;
    height: 200px;
    transition: all 0.5s;
    &:hover {
      transform: translate(2px, -2px);
    }
    .title {
      font-weight: bold;
      font-size: 18px;
    }
    .createDate {
      font-size: 12px;
    }
    .opt {
      position: absolute;
      bottom: 20px;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .icon {
        font-size: 16px;
        cursor: pointer;
        &:nth-child(1):hover {
          color: green;
        }
        &:nth-child(2) {
          font-size: 18px;
        }
        &:nth-child(2):hover {
          color: purple;
        }
        &:nth-child(3):hover {
          color: red;
        }
      }
    }
  }

  .pagination {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 24px;
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
