<template>
  <n-card title="待办列表">
    <n-list hoverable clickable class="list">
      <n-list-item v-for="item in listData" :key="item.id">
        <n-checkbox
          :checked="item.finished"
          @update:checked="handleCheckedChange(item.id, $event)"
        />
        <span :class="{ finished: item.finished }">
          {{ item.content }}
        </span>
      </n-list-item>
    </n-list>
  </n-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ITodoItem } from "@/types/home";
import { fetchTodoList, updateTodoList } from "@/services/home";

export default defineComponent({
  setup() {
    const listData = ref<ITodoItem[]>([]);

    const getTodoList = () => {
      fetchTodoList().then((result) => {
        if (result) {
          listData.value = result.data.data;
          console.log(result);
        }
      });
    };

    getTodoList();

    const handleCheckedChange = (id: number, value: boolean) => {
      updateTodoList({ id, finished: value }).then((result) => {
        if (result) {
          (
            listData.value.find((item) => item.id === id) as ITodoItem
          ).finished = value;
        }
      });
    };

    return {
      listData,
      handleCheckedChange,
    };
  },
});
</script>

<style scoped lang="less">
.list {
  .n-checkbox {
    margin-right: 10px;
  }

  .finished {
    text-decoration: line-through;
    color: #999;
  }
}
</style>
