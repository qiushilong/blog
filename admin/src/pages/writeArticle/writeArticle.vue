<template>
  <md-editor
    class="editor"
    v-model="text"
    :toolbars="toolbars"
    @onSave="saveToLocal"
  >
    <template #defToolbars>
      <normal-toolbar
        title="保存到服务器"
        @on-click="saveToServer"
        class="save-server"
      >
        <template #trigger>
          <n-icon size="16" :component="CloudUploadOutline" />
        </template>
      </normal-toolbar>
    </template>
  </md-editor>
  <n-modal
    v-model:show="showModal"
    preset="card"
    title="新增文章"
    style="width: 600px"
  >
    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      label-width="auto"
    >
      <n-form-item path="title" label="标题">
        <n-input
          v-model:value="model.title"
          @keydown.enter.prevent
          placeholder="请输入标题"
        />
      </n-form-item>
      <n-form-item path="column" label="专栏">
        <n-select
          v-model:value="model.column"
          :options="columnOptions"
          placeholder="请选择专栏"
          clearable
        />
      </n-form-item>
      <n-form-item path="tags" label="标签">
        <n-select
          v-model:value="model.tags"
          filterable
          multiple
          tag
          clearable
          :options="tagOptions"
          placeholder="请选择标签"
        />
      </n-form-item>
    </n-form>

    <template #footer>
      <n-button type="primary" @click="submit"> 提交 </n-button>
    </template>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MdEditor, { ToolbarNames } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { setItem, getItem } from "@/util/storage";
import { useMessage, FormRules, FormInst } from "naive-ui";
import { CloudUploadOutline } from "@vicons/ionicons5";
const NormalToolbar = MdEditor.NormalToolbar;

interface ModelType {
  title: string;
  column: string;
  tags?: any[];
}

export default defineComponent({
  components: {
    MdEditor,
    NormalToolbar,
  },
  setup() {
    const text = ref<string>(getItem("md"));
    const message = useMessage();
    const toolbars: ToolbarNames[] = [
      "bold",
      "underline",
      "italic",
      "strikeThrough",
      "-",
      "title",
      "sub",
      "sup",
      "quote",
      "unorderedList",
      "orderedList",
      "task",
      "-",
      "codeRow",
      "code",
      "link",
      "image",
      "table",
      "mermaid",
      "katex",
      "-",
      "revoke",
      "next",
      "save",
      0,
      "=",
      "pageFullscreen",
      "fullscreen",
      "preview",
      "htmlPreview",
      "catalog",
      "github",
    ];
    const showModal = ref<boolean>(false);
    const formRef = ref<FormInst | null>(null);
    const modelRef = ref<ModelType>({
      title: "",
      column: "",
    });

    const rules: FormRules = {
      title: [
        {
          required: true,
          message: "标题不能为空",
        },
      ],
    };

    const columnOptions = [
      {
        label: "专栏1",
        value: "column1",
      },
      {
        label: "专栏2",
        value: "column2",
      },
    ];

    const tagOptions = [
      {
        label: "JavaScrit",
        value: "js",
      },
      {
        label: "TypeScript",
        value: "ts",
      },
      {
        label: "Node",
        value: "node",
      },
    ];

    const saveToLocal = () => {
      setItem("md", text.value);
      message.success("成功保存在本地");
    };

    const saveToServer = () => {
      setItem("md", text.value);
      showModal.value = true;
    };

    const submit = () => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          console.log(modelRef.value, text);
        } else {
          console.log(errors);
        }
      });
    };

    return {
      text,
      saveToLocal,
      toolbars,
      saveToServer,
      CloudUploadOutline,
      showModal,
      model: modelRef,
      rules,
      columnOptions,
      tagOptions,
      formRef,
      submit,
    };
  },
});
</script>

<style scoped lang="less">
.editor {
  width: 100%;
  height: 100%;
  .save-server {
    display: flex;
    align-items: center;
  }
}
</style>
