<template>
  <md-editor v-model="text" />
  <n-button type="primary" @click="addArticle">添加文章</n-button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

export default defineComponent({
  components: {
    MdEditor,
  },
  setup() {
    const text = ref<string>("");

    return {
      text,
      addArticle() {
        console.log(text.value);
      },
    };
  },
});
</script>
