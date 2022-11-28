const Router = require("@koa/router");
const { koaBody } = require("koa-body");
const {
  getTodoList,
  addTodoList,
  updateTodoList,
  deleteTodoList,
} = require("~/dao/admin/todoListDao");
const router = new Router();

/**
 * @api {get} /todoList/info 获取 todo list
 * @apiName getTodoList
 * @apiGroup todoList 模块
 *
 * @apiSuccess {number} code 状态码
 * @apiSuccess {string} msg 提示信息
 * @apiSuccess {string} data todo list 列表
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "code": 200,
 *         "msg": "获取 todo list 成功",
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
router.get("/todoList/info", async (ctx, next) => {
  try {
    const result = await getTodoList();
    ctx.body = {
      code: 200,
      msg: "获取 todo list 成功",
      data: result.map((item) => {
        item.finished = !!item.finished;
        return item;
      }),
    };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = {
      code: 500,
      msg: "获取 todo list 失败",
      data: null,
    };
  }
});

/**
 * @api {post} /todoList/add 添加 todo list 项
 * @apiName addTodoList
 * @apiGroup todoList 模块
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
 *         "msg": "添加 todo list 成功",
 *         "data": null
 *     }
 */
router.post("/todoList/add", koaBody(), async (ctx, next) => {
  try {
    const { content, finished } = ctx.request.body;
    await addTodoList(content, +finished);
    ctx.body = {
      code: 200,
      msg: "添加 todo list 成功",
      data: null,
    };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = {
      code: 500,
      msg: "添加 todo list 失败",
      data: null,
    };
  }
});

/**
 * @api {post} /todoList/update 更新 todo list 项
 * @apiName updateTodoList
 * @apiGroup todoList 模块
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
 *         "msg": "更新 todo list 成功",
 *         "data": null
 *     }
 */
router.post("/todoList/update", koaBody(), async (ctx, next) => {
  try {
    const { id, content, finished } = ctx.request.body;
    await updateTodoList(id, content, +finished);
    ctx.body = {
      code: 200,
      msg: "更新 todo list 成功",
      data: null,
    };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = {
      code: 500,
      msg: "更新 todo list 失败",
      data: null,
    };
  }
});

/**
 * @api {post} /todoList/delete 删除 todo list 项
 * @apiName deleteTodoList
 * @apiGroup todoList 模块
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
 *         "msg": "删除 todo list 成功",
 *         "data": null
 *     }
 */
router.post("/todoList/delete", koaBody(), async (ctx, next) => {
  try {
    const { id } = ctx.request.body;
    await deleteTodoList(id);
    ctx.body = {
      code: 200,
      msg: "删除 todo list 成功",
      data: null,
    };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = {
      code: 500,
      msg: "删除 todo list 失败",
      data: null,
    };
  }
});

module.exports = router;
