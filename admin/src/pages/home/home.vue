<template>
  <home-header></home-header>
  <home-nav></home-nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeHeader from "./header.vue";
import HomeNav from "./nav.vue";

export default defineComponent({
  components: {
    HomeHeader,
    HomeNav,
  },
});
</script>
