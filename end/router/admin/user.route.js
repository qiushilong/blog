const Router = require("@koa/router");
const { koaBody } = require("koa-body");
const jwt = require("jsonwebtoken");
const { login, getUserInfo } = require("~/dao/admin/userDao");
const { secret, expiresIn } = require("~/config/config");
const router = new Router();

/**
 * @api {post} /login 登录接口
 * @apiName login
 * @apiGroup 用户模块
 *
 * @apiParam {string} account 账号
 * @apiParam {string} password 密码
 *
 * @apiSuccess {number} code 状态码
 * @apiSuccess {string} msg 提示信息
 * @apiSuccess {string} data 用户信息
 * @apiSuccess {string} token token值
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "msg": "账号密码正确",
 *       "data": {
 *         "id": 1,
 *         "name": "qiushilong",
 *         "account": "root",
 *         "avatar": null,
 *         "lastLoginTime": "2022-11-25T19:29:33.000Z",
 *         "lastLoginAddress": "深圳",
 *         "phone": null,
 *         "role": "admin",
 *         "motto": "世上无难事，只怕有心人"
 *       },
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50Ijoicm9vdCIsInBhc3N3b3JkIjoiYWRtaW4iLCJpYXQiOjE2Njk0NTEyNzAsImV4cCI6MTY2OTQ1ODQ3MH0.3-PvyBVcSn7kEEwJVAaEVgRdpuH7me3oma9lcY56lPs"
 *     }
 */
router.post("/login", koaBody(), async (ctx, next) => {
  const { account, password } = ctx.request.body;
  const result = await login(account, password);
  if (result.length !== 0) {
    const token = jwt.sign(ctx.request.body, secret, { expiresIn });

    delete result[0].password;

    ctx.body = {
      code: 200,
      msg: "账号密码正确",
      data: result[0],
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

/**
 * @api {get} /user/info 获取用户信息
 * @apiName getUserInfo
 * @apiGroup 用户模块
 *
 * @apiSuccess {number} code 状态码
 * @apiSuccess {string} msg 提示信息
 * @apiSuccess {string} data 用户信息
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "msg": "获取用户信息成功",
 *       "data": {
 *         "id": 1,
 *         "name": "qiushilong",
 *         "account": "root",
 *         "avatar": null,
 *         "lastLoginTime": "2022-11-25T19:29:33.000Z",
 *         "lastLoginAddress": "深圳",
 *         "phone": null,
 *         "role": "admin",
 *         "motto": "世上无难事，只怕有心人"
 *       },
 *     }
 */
router.get("/user/info", koaBody(), async (ctx, next) => {
  const {
    header: { authorization: token },
  } = ctx.request;

  try {
    const decoded = jwt.verify(token, secret);
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
      code: 500,
      msg: "获取用户信息失败",
      data: null,
    };
  }
});

module.exports = router;
