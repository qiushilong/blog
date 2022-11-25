const jwt = require("jsonwebtoken");
const { secret } = require("~/config/config");

async function tokenVerify(ctx, next) {
  const {
    url,
    header: { authorization: token },
  } = ctx.request;

  // 不需要验证 token 的路径放行
  if (!url.includes("/api/private") || url.includes("/api/private/login")) {
    await next();
    return;
  }

  // 验证 token
  try {
    jwt.verify(token, secret);
    await next();
  } catch (error) {
    console.log(error);
    ctx.status = 401;
    ctx.body = {
      data: null,
      code: 401,
      msg: "token 无效",
    };
  }
}

module.exports = tokenVerify;
