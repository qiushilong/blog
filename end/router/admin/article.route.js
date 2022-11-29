const Router = require("@koa/router");
const { koaBody } = require("koa-body");
const {
  getArticleList,
  addArticle,
  updateArticle,
  deleteArticle,
} = require("~/dao/admin/articleDao");
const router = new Router();

/**
 * @api {post} /article/info 获取 article
 * @apiName getArticle
 * @apiGroup article 模块
 *
 * @apiParam {number} page 页码
 * @apiParam {number} pageSize 页容量
 *
 * @apiSuccess {number} code 状态码
 * @apiSuccess {string} msg 提示信息
 * @apiSuccess {string} data article 列表和 total
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 200,
 *       "msg": "获取 article 成功",
 *       "data": {
 *         "list": [
 *           {
 *             "id": 1,
 *             "title": "demo1",
 *             "createDate": "2022-11-26T16:21:29.000Z",
 *             "updateDate": null,
 *             "content": "#h",
 *             "cover": "",
 *             "specialColumn": "",
 *             "tags": []
 *           },
 *         ],
 *         "total": 5
 *       }
 *     }
 */
router.post("/article/info", koaBody(), async (ctx, next) => {
  try {
    const result = await getArticleList(ctx.request.body);
    ctx.body = {
      code: 200,
      msg: "获取 article 成功",
      data: {
        list: result.list.map((item) => {
          item.tags = item.tags ? JSON.parse(item.tags) : [];
          return item;
        }),
        total: result.total,
      },
    };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
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
 * @apiParam {string} title 标题
 * @apiParam {string} specialColumn 专栏
 * @apiParam {string} cover 封面
 * @apiParam {string} content 内容
 * @apiParam {string[]} tags 标签数组
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
    await addArticle(ctx.request.body);
    ctx.body = {
      code: 200,
      msg: "添加 article 成功",
      data: null,
    };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
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
 * @apiParam {string} title 标题
 * @apiParam {string} specialColumn 专栏
 * @apiParam {string} cover 封面
 * @apiParam {string} content 内容
 * @apiParam {string[]} tags 标签数组
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
    await updateArticle(ctx.request.body);
    ctx.body = {
      code: 200,
      msg: "更新 article 成功",
      data: null,
    };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
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
    ctx.status = 500;
    ctx.body = {
      code: 500,
      msg: "删除 article 失败",
      data: null,
    };
  }
});

module.exports = router;
