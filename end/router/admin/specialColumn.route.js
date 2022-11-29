const Router = require("@koa/router");
const { koaBody } = require("koa-body");
const multer = require("@koa/multer");
const {
  getSpecialColumnList,
  addSpecialColumn,
  updateSpecialColumn,
  deleteSpecialColumn,
} = require("~/dao/admin/specialColumnDao");
const router = new Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log("file", file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});
const upload = multer({ storage });

/**
 * @api {post} /specialColumn/info 获取 specialColumn
 * @apiName getSpecialColumn
 * @apiGroup specialColumn 模块
 *
 * @apiSuccess {number} code 状态码
 * @apiSuccess {string} msg 提示信息
 * @apiSuccess {string} data specialColumn 列表
 *
 * @apiParam {number} current 页码
 * @apiParam {number} pageSize 页容量
 * @apiParam {string} title 标题
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "code": 200,
 *         "msg": "获取 specialColumn 成功",
 *         "data": [
 *             {
 *               "id": 1,
 *               "title": "demo1",
 *               "createDate": "2022-11-26T16:21:29.000Z",
 *               "updateDate": null,
 *               "content": "# hello",
 *               "cover": "",
 *               "specialColumn": "",
 *               "tags": ""
 *             }
 *         ]
 *     }
 */
router.post("/specialColumn/info", koaBody(), async (ctx, next) => {
  try {
    const result = await getSpecialColumnList();
    ctx.body = {
      code: 200,
      msg: "获取 specialColumn 成功",
      data: result,
    };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = {
      code: 500,
      msg: "获取 specialColumn 失败",
      data: null,
    };
  }
});

/**
 * @api {post} /specialColumn/add 添加 specialColumn 项
 * @apiName addSpecialColumn
 * @apiGroup specialColumn 模块
 *
 * @apiParam {string} title 标题
 * @apiParam {string} introduce 介绍
 * @apiParam {string} cover 封面
 *
 * @apiSuccess {number} code 状态码
 * @apiSuccess {string} msg 提示信息
 * @apiSuccess {string} data 返回值
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "code": 200,
 *         "msg": "添加 specialColumn 成功",
 *         "data": null
 *     }
 */
router.post("/specialColumn/add", upload.single("cover"), async (ctx, next) => {
  try {
    console.log("ctx.request.file", ctx.request.file);
    console.log("ctx.file", ctx.file);
    console.log("ctx.request.body", ctx.request.body);

    await addSpecialColumn({ ...ctx.request.body, cover: ctx.file?.filename });
    ctx.body = {
      code: 200,
      msg: "添加 specialColumn 成功",
      data: null,
    };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = {
      code: 500,
      msg: "添加 specialColumn 失败",
      data: null,
    };
  }
});

/**
 * @api {post} /specialColumn/update 更新 specialColumn 项
 * @apiName updateSpecialColumn
 * @apiGroup specialColumn 模块
 *
 * @apiParam {string} id id
 * @apiParam {string} title 标题
 * @apiParam {string} introduce 介绍
 * @apiParam {string} cover 封面
 *
 * @apiSuccess {number} code 状态码
 * @apiSuccess {string} msg 提示信息
 * @apiSuccess {string} data 返回值
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "code": 200,
 *         "msg": "更新 specialColumn 成功",
 *         "data": null
 *     }
 */
router.post("/specialColumn/update", koaBody(), async (ctx, next) => {
  try {
    await updateSpecialColumn(ctx.request.body);
    ctx.body = {
      code: 200,
      msg: "更新 specialColumn 成功",
      data: null,
    };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = {
      code: 500,
      msg: "更新 specialColumn 失败",
      data: null,
    };
  }
});

/**
 * @api {post} /specialColumn/delete 删除 specialColumn 项
 * @apiName deleteSpecialColumn
 * @apiGroup specialColumn 模块
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
 *         "msg": "删除 specialColumn 成功",
 *         "data": null
 *     }
 */
router.post("/specialColumn/delete", koaBody(), async (ctx, next) => {
  try {
    const { id } = ctx.request.body;
    await deleteSpecialColumn(id);
    ctx.body = {
      code: 200,
      msg: "删除 specialColumn 成功",
      data: null,
    };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = {
      code: 500,
      msg: "删除 specialColumn 失败",
      data: null,
    };
  }
});

module.exports = router;
