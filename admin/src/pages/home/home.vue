<template>
  <Header></Header>
  <content></content>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./header.vue";
import Content from "./content.vue";

export default defineComponent({
  components: {
    Header,
    Content,
  },
});
</script>
