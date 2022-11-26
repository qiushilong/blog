const Router = require("@koa/router");
const router = new Router();

const userRoute = require("./admin/user.route");
const todoListRoute = require("./admin/todoList.route");

router.use("/api/private", userRoute.routes(), userRoute.allowedMethods());
router.use(
  "/api/private",
  todoListRoute.routes(),
  todoListRoute.allowedMethods()
);

module.exports = router;
