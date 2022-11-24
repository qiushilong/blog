<template>
  <n-card class="user-info" hoverable>
    <div class="base-info">
      <n-avatar
        round
        :size="120"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
      <div class="name-role">
        <div class="name">{{ username }}</div>
        <div class="role">{{ role }}</div>
      </div>
    </div>

    <hr class="hr" />

    <div class="last-info">
      <div class="color999">上次登录时间：{{ lastLoginTime }}</div>
      <div class="color999">上次登录地点：{{ lastLoginAddress }}</div>
    </div>
  </n-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const username = ref<string>("qsl");
    const role = ref<string>("管理员");
    const lastLoginTime = ref<string>("2022-11-20");
    const lastLoginAddress = ref<string>("深圳");
    return {
      username,
      role,
      lastLoginTime,
      lastLoginAddress,
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
