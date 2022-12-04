<template>
  <header class="header">
    <div class="site">ddu blog</div>
    1
    <svg-icon name="more"></svg-icon>
    2
    <ul class="menu">
      <li>搜索</li>
      <li>文章</li>
      <li>专栏</li>
      <li>标签</li>
    </ul>
    <div class="slider-menu">
      <ul>
        <li>搜索</li>
        <li>文章</li>
        <li>专栏</li>
        <li>标签</li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;

  .site {
    font-size: 30px;
  }

  .menu {
    display: flex;
    > li {
      margin-right: 10px;
    }
  }

  .slider-menu {
    display: none;
  }

  @media (max-width: 500px) {
    .menu {
      display: none;
    }
    .slider-menu {
      display: block;
    }
  }
}
</style>
