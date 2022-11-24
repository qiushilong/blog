const Router = require("@koa/router");
const { koaBody } = require("koa-body");
const { login } = require("../../dao/admin/userDao");
const router = new Router();

router.get("/user", (ctx, next) => {
  ctx.body = "Hello World!";
});

router.post("/login", koaBody(), async (ctx, next) => {
  console.log("ctx", ctx.request.body);
  const result = await login(ctx.request.body);
  if (result.length) {
    ctx.body = "success";
  } else {
    ctx.body = "error";
  }
});

module.exports = router;
