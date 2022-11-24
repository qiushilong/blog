<template>
  <n-card title="待办列表">
    <n-list hoverable clickable class="list">
      <n-list-item v-for="item in listData" :key="item.id">
        <n-checkbox
          :checked="item.finished"
          :value="item.finished"
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

interface IToDoItem {
  id: number;
  content: string;
  finished: boolean;
}

export default defineComponent({
  setup() {
    const listData = ref<IToDoItem[]>([
      {
        id: 1,
        content: "待办1",
        finished: false,
      },
      {
        id: 2,
        content: "待办2",
        finished: false,
      },
      {
        id: 3,
        content: "完成2",
        finished: true,
      },
    ]);

    const handleCheckedChange = (id: number, value: boolean) => {
      console.log(value, id);
      (listData.value.find((item) => item.id === id) as IToDoItem).finished =
        value;
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
