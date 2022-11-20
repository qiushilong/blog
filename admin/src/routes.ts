import Home from "./pages/home/home.vue";
import Login from "./pages/login/login.vue";
import Register from "./pages/register/register.vue";
import WriteArticle from "./pages/writeArticle/writeArticle.vue";
import ArticleManager from "./pages/articleManager/articleManager.vue";
import ColumnManager from "./pages/columnManager/columnManager.vue";

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "write-article",
        component: WriteArticle,
      },
      {
        path: "article-manager",
        component: ArticleManager,
      },
      {
        path: "column-manager",
        component: ColumnManager,
      },
    ],
  },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

export default routes;
