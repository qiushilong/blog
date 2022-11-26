<template>
  <n-card class="user-info" hoverable>
    <div class="base-info">
      <n-avatar round :size="120" :src="userInfo?.avatar" />
      <div class="name-role">
        <div class="name">{{ userInfo?.name }}</div>
        <div class="role">{{ userInfo?.role }}</div>
      </div>
    </div>

    <hr class="hr" />

    <div class="last-info">
      <div class="color999">上次登录时间：{{ userInfo?.lastLoginTime }}</div>
      <div class="color999">上次登录地点：{{ userInfo?.lastLoginAddress }}</div>
    </div>
  </n-card>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from "vue";
import { IUserInfo } from "@/types/user";

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
.user-info {
  max-height: 260px;

  .base-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;

    .name-role {
      flex: 1;
      padding-left: 50px;

      .name {
        font-size: 30px;
        color: #222;
      }

      .role {
        font-size: 14px;
        color: #999;
      }
    }
  }

  .hr {
    background-color: #999;
    border: none;
    height: 1px;
  }

  .last-info {
    > div {
      padding: 10px 0;
    }
  }
}

.color999 {
  color: #999;
}
</style>
