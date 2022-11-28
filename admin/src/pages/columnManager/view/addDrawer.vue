<template>
  <n-drawer
    :show="visible"
    :width="502"
    placement="right"
    :on-update:show="updateShow"
  >
    <n-drawer-content title="新增专栏" closable>
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="title" label="标题">
          <n-input v-model:value="model.title" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="introduce" label="介绍">
          <n-input v-model:value="model.introduce" />
        </n-form-item>
        <n-form-item path="cover" label="封面">
          <n-upload
            v-model:file-list="fileList"
            accept="image/png, image/jpeg"
            @update:file-list="fileUp"
            list-type="image-card"
            :max="1"
          >
          </n-upload>
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button round type="primary" @click="handleValidateButtonClick">
                提交
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, render } from "vue";
import {
  FormInst,
  FormItemInst,
  FormItemRule,
  useMessage,
  FormRules,
  UploadFileInfo,
} from "naive-ui";
import { addColumn } from "@/services/column";
import { IColumn } from "@/types/column";

interface ModelType {
  title: string;
  cover: File | null | undefined;
  introduce: string;
}
export default defineComponent({
  props: ["visible"],

  setup(props, ctx) {
    const formRef = ref<FormInst | null>(null);
    const rPasswordFormItemRef = ref<FormItemInst | null>(null);
    const message = useMessage();
    const modelRef = ref<ModelType>({
      title: "",
      cover: undefined,
      introduce: "",
    });
    const fileList = ref<UploadFileInfo[]>([]);

    const rules: FormRules = {
      title: [
        {
          required: true,
          trigger: ["input", "blur"],
          message: "标题是必须的",
        },
      ],
    };

    console.log(props.visible);

    return {
      formRef,
      rPasswordFormItemRef,
      model: modelRef,
      rules,
      fileList,
      handleValidateButtonClick(e: MouseEvent) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
          if (!errors) {
            const formData = new FormData();
            for (const key of Object.keys(modelRef.value) as Array<
              keyof ModelType
            >) {
              formData.append(key, modelRef.value[key] as string | Blob);
            }
            console.log(formData.get("cover"));
            addColumn(formData).then((result) => {});
          } else {
            console.log(errors);
            message.error("验证失败");
          }
        });
      },
      updateShow(visible: boolean) {
        ctx.emit("updateShow", visible);
      },
      fileUp(file: UploadFileInfo[]) {
        if (file[0]) {
          modelRef.value.cover = file[0].file;
          file[0].url = file[0].file ? URL.createObjectURL(file[0].file) : "";
          file[0].status = "finished";
        }
        fileList.value = file;
      },
    };
  },
});
</script>
