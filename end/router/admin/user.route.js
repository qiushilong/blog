const Router = require("@koa/router");
const { koaBody } = require("koa-body");
const jwt = require("jsonwebtoken");
const { login, getUserInfo } = require("~/dao/admin/userDao");
const { secret, expiresIn } = require("~/config/config");
const router = new Router();

router.get("/user", (ctx, next) => {
  ctx.body = "Hello World!";
});

router.post("/login", koaBody(), async (ctx, next) => {
  const result = await login(ctx.request.body);
  if (result.length !== 0) {
    const token = jwt.sign(ctx.request.body, secret, { expiresIn });

    ctx.body = {
      code: 200,
      msg: "账号密码正确",
      data: null,
      token,
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      code: 401,
      msg: "账号密码错误",
      data: null,
      token: null,
    };
  }
});

router.get("/user/info", koaBody(), async (ctx, next) => {
  const {
    header: { authorization: token },
  } = ctx.request;

  console.log(token);

  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    const { account } = decoded;
    const result = await getUserInfo(account);
    console.log(result);
    ctx.body = {
      code: 200,
      msg: "获取用户信息成功",
      data: result,
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: 401,
      msg: "获取用户信息失败",
      data: null,
    };
  }
});

module.exports = router;
