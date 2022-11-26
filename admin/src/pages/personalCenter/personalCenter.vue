<template>
  <n-card title="基本信息" class="base-info">
    <div class="avatar-info">
      头像: {{ userInfo?.avatar }}

      <n-avatar
        round
        size="medium"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
    </div>
    <div class="info">昵称: {{ userInfo?.name }}</div>
    <div class="info">账号: {{ userInfo?.account }}</div>
    <div class="info">电话: {{ userInfo?.phone }}</div>
    <div class="info">角色: {{ userInfo?.role }}</div>
    <div class="info">座右铭: {{ userInfo?.motto }}</div>
  </n-card>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { IUserInfo } from "@/types/home";

export default defineComponent({
  setup() {
    const userInfo = inject<IUserInfo>("userInfo");
    return {
      userInfo,
    };
  },
});
</script>

<style scoped lang="less">
.base-info {
  .avatar-info {
    height: 50px;
  }
  .info {
    height: 30px;
  }
}
</style>
