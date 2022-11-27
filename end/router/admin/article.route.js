const Router = require("@koa/router");
const { koaBody } = require("koa-body");
const {
  getArticle,
  addArticle,
  updateArticle,
  deleteArticle,
} = require("~/dao/admin/articleDao");
const router = new Router();

/**
 * @api {get} /article/info 获取 article
 * @apiName getArticle
 * @apiGroup article 模块
 *
 * @apiSuccess {number} code 状态码
 * @apiSuccess {string} msg 提示信息
 * @apiSuccess {string} data article 列表
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "code": 200,
 *         "msg": "获取 article 成功",
 *         "data": [
 *             {
 *                 "id": 1,
 *                 "content": "待办1",
 *                 "createDate": "2022-11-26T08:02:41.000Z",
 *                 "finished": 1,
 *                 "updateDate": null
 *             }
 *         ]
 *     }
 */
router.get("/article/info", async (ctx, next) => {
  try {
    const result = await getArticle();
    ctx.body = {
      code: 200,
      msg: "获取 article 成功",
      data: result,
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: 500,
      msg: "获取 article 失败",
      data: null,
    };
  }
});

/**
 * @api {post} /article/add 添加 article 项
 * @apiName addArticle
 * @apiGroup article 模块
 *
 * @apiParam {string} content todo 内容
 * @apiParam {boolean} finished 是否选中
 *
 * @apiSuccess {number} code 状态码
 * @apiSuccess {string} msg 提示信息
 * @apiSuccess {string} data 返回值
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "code": 200,
 *         "msg": "添加 article 成功",
 *         "data": null
 *     }
 */
router.post("/article/add", koaBody(), async (ctx, next) => {
  try {
    const { title, content, cover, specialColumn, tags } = ctx.request.body;
    await addArticle(title, content, cover, specialColumn, tags);
    ctx.body = {
      code: 200,
      msg: "添加 article 成功",
      data: null,
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: 500,
      msg: "添加 article 失败",
      data: null,
    };
  }
});

/**
 * @api {post} /article/update 更新 article 项
 * @apiName updateArticle
 * @apiGroup article 模块
 *
 * @apiParam {string} id id
 * @apiParam {string} content todo 内容
 * @apiParam {boolean} finished 是否选中
 *
 * @apiSuccess {number} code 状态码
 * @apiSuccess {string} msg 提示信息
 * @apiSuccess {string} data 返回值
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "code": 200,
 *         "msg": "更新 article 成功",
 *         "data": null
 *     }
 */
router.post("/article/update", koaBody(), async (ctx, next) => {
  try {
    const { id, title, content, cover, column, tags } = ctx.request.body;
    await updateArticle(id, title, content, cover, column, tags);
    ctx.body = {
      code: 200,
      msg: "更新 article 成功",
      data: null,
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: 500,
      msg: "更新 article 失败",
      data: null,
    };
  }
});

/**
 * @api {post} /article/delete 删除 article 项
 * @apiName deleteArticle
 * @apiGroup article 模块
 *
 * @apiParam {string} id id
 *
 * @apiSuccess {number} code 状态码
 * @apiSuccess {string} msg 提示信息
 * @apiSuccess {string} data 返回值
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "code": 200,
 *         "msg": "删除 article 成功",
 *         "data": null
 *     }
 */
router.post("/article/delete", koaBody(), async (ctx, next) => {
  try {
    const { id } = ctx.request.body;
    await deleteArticle(id);
    ctx.body = {
      code: 200,
      msg: "删除 article 成功",
      data: null,
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: 500,
      msg: "删除 article 失败",
      data: null,
    };
  }
});

module.exports = router;
