<template>
  <header class="header">
    <div class="logo" @click="goHome">个人博客后台管理系统</div>

    <div class="logout" @click="goLogin">logout</div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
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

  .logout {
    cursor: pointer;
  }
}
</style>
