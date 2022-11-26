const pool = require("~/connection/connection");
const updateTool = require("~/util/updateTool");

async function getTodoList() {
  const [res] = await pool.query("select * from todo_list");
  return res;
}

async function addTodoList(content, finished) {
  await pool.query(
    "insert into todo_list(id,content,createDate,finished) values(null,?,now(),?)",
    [content, finished]
  );
}

async function updateTodoList(id, content, finished) {
  const [str, arr] = updateTool({ content, finished });
  console.log(str, arr);
  await pool.query(`update todo_list set updateDate=now(),${str} where id=?`, [
    ...arr,
    id,
  ]);
}

async function deleteTodoList(id) {
  await pool.query("delete from todo_list where id=?", [id]);
}

module.exports = {
  getTodoList,
  addTodoList,
  updateTodoList,
  deleteTodoList,
};
