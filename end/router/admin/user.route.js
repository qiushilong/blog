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
    ctx.body = {
      code: 200,
      msg: "账号密码正确",
      data: null,
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      code: 401,
      msg: "账号密码错误",
      data: null,
    };
  }
});

module.exports = router;
