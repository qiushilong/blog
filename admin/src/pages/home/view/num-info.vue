<template>
  <n-grid x-gap="15">
    <n-gi :span="8">
      <n-card
        hoverable
        class="visit-info"
        content-style="padding: 0;display: flex"
      >
        <div class="svg">
          <n-icon size="40" color="#fff">
            <person />
          </n-icon>
        </div>
        <div class="data">
          <p class="num">1234</p>
          <p class="name">用户访问量</p>
        </div>
      </n-card>
    </n-gi>
    <n-gi :span="8"
      ><n-card
        hoverable
        class="system-info"
        content-style="padding: 0;display: flex"
      >
        <div class="svg">
          <n-icon size="40" color="#fff">
            <chatbox-ellipses />
          </n-icon>
        </div>
        <div class="data">
          <p class="num">1234</p>
          <p class="name">系统消息</p>
        </div>
      </n-card></n-gi
    >
    <n-gi :span="8"
      ><n-card
        hoverable
        class="article-info"
        content-style="padding: 0;display: flex"
      >
        <div class="svg">
          <n-icon size="40" color="#fff">
            <book-sharp />
          </n-icon>
        </div>
        <div class="data">
          <p class="num">1234</p>
          <p class="name">文章数量</p>
        </div>
      </n-card></n-gi
    >
  </n-grid>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Person, ChatboxEllipses, BookSharp } from "@vicons/ionicons5";
export default defineComponent({
  components: {
    Person,
    ChatboxEllipses,
    BookSharp,
  },
});
</script>

<style scoped lang="less">
.mixin-info(@color) {
  height: 100px;

  .svg {
    width: 100px;
    height: 100px;
    margin-top: -1px;
    margin-left: -1px;
    background-color: @color;
    text-align: center;
    line-height: 120px;
  }
  .data {
    flex: 1;
    text-align: center;
    .num {
      font-size: 30px;
      font-weight: bold;
      color: @color;
      line-height: 0px;
    }
    .name {
      color: #999;
    }
  }
}

.visit-info {
  .mixin-info( @color: @primary-color);
}

.system-info {
  .mixin-info(@color: @success-color);
}

.article-info {
  .mixin-info(@color: @danger-color);
}
</style>
