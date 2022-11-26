<template>
  <header class="header">
    <div class="logo" @click="goHome">个人博客后台管理系统</div>

    <div class="other">
      <n-icon size="25" :component="NotificationsOutline" />

      <n-avatar
        round
        size="small"
        :src="userInfo?.avatar"
        style="margin: 0 20px"
      />

      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        {{ userInfo?.role }}
      </n-dropdown>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { useRouter } from "vue-router";
import { NotificationsOutline } from "@vicons/ionicons5";
import { IUserInfo } from "@/types/user";
import { getItem } from "@/util/storage";

export default defineComponent({
  setup() {
    const userInfo = inject<IUserInfo>("userInfo");

    const router = useRouter();

    const goHome = () => {
      router.push("/");
    };

    const goLogin = () => {
      router.push("/login");
    };
    return {
      goHome,
      goLogin,
      NotificationsOutline,
      userInfo,
      options: [
        {
          label: "个人中心",
          key: "my center",
        },
        {
          label: "退出登录",
          key: "logout",
        },
      ],
      handleSelect(key: string | number) {
        if (key === "logout") {
          goLogin();
        }
      },
    };
  },
});
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 100px;
  // width: 100%;
  height: 70px;
  background-color: #242f42;
  color: #fff;
  .logo {
    cursor: pointer;
    font-size: 22px;
    font-weight: bold;
  }

  .other {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
