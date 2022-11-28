import { h, Component } from "vue";
import type { MenuOption } from "naive-ui";
import { NIcon } from "naive-ui";
import {
  BrushOutline,
  HomeOutline,
  BookOutline,
  AlbumsOutline,
  PricetagsOutline,
} from "@vicons/ionicons5";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

// 每一项的 key 应当保持唯一
const menu: MenuOption[] = [
  {
    label: "首页",
    key: "",
    icon: renderIcon(HomeOutline),
  },
  {
    label: "写文章",
    key: "write-article",
    icon: renderIcon(BrushOutline),
  },
  {
    label: "文章管理",
    key: "article-manager",
    icon: renderIcon(BookOutline),
  },
  {
    label: "专栏管理",
    key: "column-manager",
    icon: renderIcon(AlbumsOutline),
  },
  {
    label: "标签管理",
    key: "tag-manager",
    icon: renderIcon(PricetagsOutline),
  },
];

export default menu;
