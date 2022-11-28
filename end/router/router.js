const Router = require("@koa/router");
const router = new Router();

const userRoute = require("./admin/user.route");
const todoListRoute = require("./admin/todoList.route");
const articleRoute = require("./admin/article.route");
const specialColumnRoute = require("./admin/specialColumn.route");

router.use("/api/private", userRoute.routes(), userRoute.allowedMethods());
router.use(
  "/api/private",
  todoListRoute.routes(),
  todoListRoute.allowedMethods()
);
router.use(
  "/api/private",
  articleRoute.routes(),
  articleRoute.allowedMethods()
);
router.use(
  "/api/private",
  specialColumnRoute.routes(),
  specialColumnRoute.allowedMethods()
);

module.exports = router;
