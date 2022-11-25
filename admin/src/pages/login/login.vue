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

      <n-button type="primary" @click="login">登录</n-button>
    </n-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  FormInst,
  FormItemInst,
  FormItemRule,
  useMessage,
  FormRules,
} from "naive-ui";
import { Person, LockClosed } from "@vicons/ionicons5";
import request from "@/util/request";

interface ModelType {
  account: string | null;
  password: string | null;
}

export default defineComponent({
  setup() {
    const formRef = ref<FormInst | null>(null);
    const rPasswordFormItemRef = ref<FormItemInst | null>(null);
    const message = useMessage();
    const modelRef = ref<ModelType>({
      account: null,
      password: null,
    });
    const rules: FormRules = {
      account: [
        {
          required: true,
          // validator(rule: FormItemRule, value: string) {
          //   return true;
          // },
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

    const login = () => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          message.success("验证成功");
          request.get("/login");
        } else {
          console.log(errors);
          message.error("验证失败");
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
      login,
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
  background: url(/loginBg.webp) no-repeat center center;

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
