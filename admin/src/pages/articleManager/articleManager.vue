<template>
  <n-card>
    <n-form
      ref="formRef"
      inline
      :label-width="80"
      :model="formValue"
      :size="size"
      label-placement="left"
    >
      <n-form-item label="标题：" path="title">
        <n-input v-model:value="formValue.title" placeholder="标题" />
      </n-form-item>
      <n-form-item label="专栏：" path="specialColumn">
        <n-input v-model:value="formValue.specialColumn" placeholder="专栏" />
      </n-form-item>
      <n-form-item label="标签：" path="tags">
        <n-input v-model:value="formValue.tags" placeholder="标签" />
      </n-form-item>
    </n-form>

    <n-data-table
      :columns="columns"
      :data="dataSource"
      :pagination="pagination"
      :bordered="false"
    />
  </n-card>
</template>

<script lang="ts">
import { h, defineComponent, ref } from "vue";
import { NButton, NTag, useMessage } from "naive-ui";
import type { DataTableColumns, FormInst } from "naive-ui";
import { formatDate } from "@/util/date";
import { IArticle } from "@/types/article";
import { fetchArticle } from "@/services/article";

const columns: DataTableColumns<IArticle> = [
  {
    title: "编号",
    key: "id",
    width: 70,
  },
  {
    title: "标题",
    key: "title",
  },
  {
    title: "内容",
    key: "content",
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "创建时间",
    key: "createDate",
    render(row) {
      return row.createDate ? formatDate(row.createDate) : "";
    },
  },
  {
    title: "更新时间",
    key: "updateDate",
    render(row) {
      return row.updateDate ? formatDate(row.updateDate) : "";
    },
  },
  {
    title: "封面",
    key: "cover",
  },
  {
    title: "专栏",
    key: "specialColumn",
  },

  {
    title: "标签",
    key: "tags",
    render(row) {
      return row.tags.map((tag) =>
        h(
          NTag,
          {
            style: "margin-right:10px",
          },
          tag
        )
      );
    },
  },
];

export default defineComponent({
  setup() {
    const dataSource = ref<IArticle[]>([]);
    const formRef = ref<FormInst | null>(null);
    const message = useMessage();
    fetchArticle().then((result) => {
      if (result) {
        const { code, data } = result.data;
        if (code === 200) {
          dataSource.value = data;
        }
      }
    });
    return {
      dataSource,
      columns,
      pagination: false as const,
      formRef,
      size: ref<"small" | "medium" | "large">("medium"),
      formValue: ref({
        title: "",
        specialColumn: "",
        tags: "",
      }),
      handleValidateClick(e: MouseEvent) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success("Valid");
          } else {
            console.log(errors);
            message.error("Invalid");
          }
        });
      },
      formatDate,
    };
  },
});
</script>
