<template>
  <n-card>
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
      <n-form-item label="专栏：" path="specialColumn">
        <n-input v-model:value="formValue.specialColumn" placeholder="专栏" />
      </n-form-item>
      <n-form-item label="标签：" path="tags">
        <n-input v-model:value="formValue.tags" placeholder="标签" />
      </n-form-item>
    </n-form>

    <n-data-table
      remote
      :loading="loading"
      :columns="columns"
      :data="dataSource"
      :pagination="pagination"
      :bordered="false"
    />
  </n-card>
</template>

<script lang="ts">
import { h, defineComponent, ref, reactive, watch } from "vue";
import { NTag, useMessage, useDialog } from "naive-ui";
import type { DataTableColumns, FormInst } from "naive-ui";
import { debounce } from "lodash";
import { formatDate } from "@/util/date";
import { IArticle } from "@/types/article";
import { fetchArticle, deleteArticle } from "@/services/article";

export default defineComponent({
  setup() {
    const dataSource = ref<IArticle[]>([]);
    const formRef = ref<FormInst | null>(null);
    const loading = ref(false);
    const formValue = ref({
      title: "",
      specialColumn: "",
      tags: "",
    });
    const paginationReactive = reactive({
      page: 1,
      pageSize: 10,
      showSizePicker: true,
      pageSizes: [10, 20, 50],
      pageCount: 10,
      itemCount: 0,
      prefix: () => `共 ${paginationReactive.itemCount} 条`,
      onChange: (page: number) => {
        paginationReactive.page = page;
        getArticleList();
      },
      onUpdatePageSize: (pageSize: number) => {
        paginationReactive.pageSize = pageSize;
        paginationReactive.page = 1;
        getArticleList();
      },
    });
    const message = useMessage();
    const dialog = useDialog();
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
          if (row.tags.length === 0) {
            return "";
          }
          return row.tags.map((tag) =>
            h(
              NTag,
              {
                style: "margin-right:10px",
              },
              { default: () => tag }
            )
          );
        },
      },
      {
        title: "操作",
        key: "opt",
        render(row) {
          return h(
            "div",
            {},
            {
              default: () => {
                return [
                  h(
                    "span",
                    {
                      style: "cursor:pointer",
                      onClick: () => clickEdit(row.id),
                    },
                    { default: () => "修改" }
                  ),
                  h(
                    "span",
                    {
                      style: "margin-left:10px;cursor:pointer",
                      onClick: () => clickDelete(row.id),
                    },
                    { default: () => "删除" }
                  ),
                ];
              },
            }
          );
        },
      },
    ];

    watch(
      [
        () => formValue.value.title,
        () => formValue.value.specialColumn,
        () => formValue.value.tags,
      ],
      debounce(() => {
        getArticleList();
      }, 500)
    );

    const getArticleList = () => {
      console.log(formValue.value);
      loading.value = true;
      fetchArticle({
        page: paginationReactive.page,
        pageSize: paginationReactive.pageSize,
        ...formValue.value,
      })
        .then((result) => {
          if (result) {
            const { code, data } = result.data;
            if (code === 200) {
              dataSource.value = data.list;
              paginationReactive.itemCount = data.total;
            }
          }
        })
        .finally(() => {
          loading.value = false;
        });
    };
    getArticleList();

    const clickEdit = (rowId: number) => {
      console.log("clickEdit", rowId);
    };

    const clickDelete = (rowId: number) => {
      console.log("clickDelete", rowId);
      dialog.warning({
        title: "警告",
        content: `你确定删除 id 为 ${rowId} 的这一项吗 ？`,
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: () => {
          deleteArticle({ id: rowId }).then((result) => {
            if (result) {
              const { code, msg } = result.data;
              if (code === 200) {
                message.success(msg);
                getArticleList();
              }
            }
          });
        },
        onNegativeClick: () => {
          // message.error("不确定");
        },
      });
    };

    return {
      loading,
      dataSource,
      columns,
      pagination: paginationReactive,
      formRef,
      formValue,
      clickEdit,
      clickDelete,
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

<style scoped lang="less">
.opt {
  .edit {
    cursor: pointer;
  }
}
</style>
