<template>
  <n-grid>
    <n-gi :span="8">
      <user-info style="margin-bottom: 20px"></user-info>
      <language-info></language-info>
    </n-gi>
    <n-gi :span="15" :offset="1">
      <num-info style="margin-bottom: 20px"></num-info>
      <todo-list></todo-list>
    </n-gi>
  </n-grid>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import UserInfo from "./view/user-info.vue";
import LanguageInfo from "./view/language-info.vue";
import NumInfo from "./view/num-info.vue";
import TodoList from "./view/todo-list.vue";

export default defineComponent({
  components: {
    UserInfo,
    LanguageInfo,
    NumInfo,
    TodoList,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="less"></style>
