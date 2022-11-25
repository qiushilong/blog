<template>
  <div class="login" hoverable>
    <h2 class="title">个人博客后台管理系统</h2>

    <n-card title="登录" class="card">
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="account" :show-label="false">
          <n-input
            v-model:value="model.account"
            @keydown.enter.prevent
            placeholder="账号"
          >
            <template #prefix>
              <n-icon :component="Person" />
            </template>
          </n-input>
        </n-form-item>

        <n-form-item path="password" :show-label="false">
          <n-input
            v-model:value="model.password"
            type="password"
            placeholder="密码"
          >
            <template #prefix>
              <n-icon :component="LockClosed" />
            </template>
          </n-input>
        </n-form-item>
      </n-form>

      <n-button type="primary" @click="handleLogin">登录</n-button>
    </n-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { FormInst, FormItemInst, useMessage, FormRules } from "naive-ui";
import { Person, LockClosed } from "@vicons/ionicons5";
import { postLogin } from "@/services/login";

interface ModelType {
  account: string;
  password: string;
}

export default defineComponent({
  setup() {
    const formRef = ref<FormInst | null>(null);
    const rPasswordFormItemRef = ref<FormItemInst | null>(null);
    const message = useMessage();
    const router = useRouter();
    const modelRef = ref<ModelType>({
      account: "",
      password: "",
    });
    const rules: FormRules = {
      account: [
        {
          required: true,
          trigger: ["input", "blur"],
          message: "请输入账号",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
        },
      ],
    };

    const handleLogin = () => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          console.log(modelRef.value);
          postLogin(modelRef.value).then((result) => {
            if (result) {
              const { code, msg, data } = result.data;
              message.success("登录成功");
              router.push("/");
            }
          });
        } else {
          console.log(errors);
        }
      });
    };

    return {
      formRef,
      rPasswordFormItemRef,
      model: modelRef,
      rules,
      Person,
      LockClosed,
      handleLogin,
    };
  },
});
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100vh;
  background-color: skyblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(@/assets/loginBg.webp) no-repeat center center;

  .title {
    color: #fff;
    font-size: 24px;
  }

  .card {
    width: 400px;
    height: 300px;
    opacity: 0.95;
  }
}
</style>
