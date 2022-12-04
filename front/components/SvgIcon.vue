<template>
  <svg :class="`svg-icon icon-${name}`">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    require: true,
    default: '',
  },
})
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  text-align: center;
  line-height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
