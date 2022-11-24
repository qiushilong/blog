<template>
  <n-card title="语言信息" hoverable>
    JavaScript
    <n-progress type="line" :percentage="60" :indicator-placement="'inside'" />
    Vue
    <n-progress type="line" :percentage="40" :indicator-placement="'inside'" />
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped lang="less"></style>
