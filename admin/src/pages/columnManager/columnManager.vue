<template>
  <n-card id="container-card">
    <n-grid :x-gap="12" :y-gap="8" :cols="cols">
      <n-grid-item>
        <div class="light-green card">
          <div class="title">ts 使用指南</div>
          <p class="introduce">ts 使用指南 ......</p>
          <div class="createDate">2022.10</div>
        </div>
      </n-grid-item>
    </n-grid>
  </n-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import { debounce } from "lodash";
import ColumnCard from "@/components/columnCard.vue";

export default defineComponent({
  setup() {
    const cols = ref<number>(5);

    const resizeObserver = new ResizeObserver(
      debounce(([entry]) => {
        if (entry.contentBoxSize) {
          const contentBoxSize = Array.isArray(entry.contentBoxSize)
            ? entry.contentBoxSize[0]
            : entry.contentBoxSize;
          const newCols = Math.floor(contentBoxSize.inlineSize / 170);
          cols.value = newCols;
        }
      }, 100)
    );

    onMounted(() => {
      const dom = document.querySelector("#container-card")!;
      resizeObserver.observe(dom);
    });

    onBeforeUnmount(() => {
      const dom = document.querySelector("#container-card")!;
      resizeObserver.unobserve(dom);
    });

    return {
      ColumnCard,
      cols,
    };
  },
});
</script>

<style scoped lang="less">
#container-card {
  .card {
    padding: 10px;
    width: 150px;
    height: 200px;
    transition: all 0.5s;
    &:hover {
      transform: translate(2px, -2px);
    }
    .title {
      font-weight: bold;
    }
    .introduce {
    }
  }
}

.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
  width: 150px;
  height: 200px;
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
  width: 150px;
  height: 200px;
}
</style>
