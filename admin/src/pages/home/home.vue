<template>
  <Header></Header>
  <content></content>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from "vue";
import { fetchUserInfo } from "@/services/login";
import Header from "./header.vue";
import Content from "./content.vue";
import { IUserInfo } from "@/types/user";

export default defineComponent({
  components: {
    Header,
    Content,
  },
  setup() {
    const userInfo = ref<IUserInfo>({} as IUserInfo);

    provide("userInfo", userInfo);

    fetchUserInfo().then((result) => {
      if (result) {
        userInfo.value = result.data.data;
      }
    });
  },
});
</script>
