const pool = require("~/connection/connection");

async function getTodoList() {
  const [res] = await pool.query("select * from todo_list");
  return res;
}

async function addTodoList(text, checked) {
  await pool.query(
    "insert into todo_list(id,text,createDate,checked) values(null,?,now(),?)",
    [text, checked]
  );
}

async function updateTodoList(id, text, checked) {
  await pool.query(
    "update todo_list set text=?,updateDate=now(),checked=? where id=?",
    [text, checked, id]
  );
}

async function deleteTodoList(id) {
  await pool.query("delete from  todo_list where id=?", [id]);
}

module.exports = {
  getTodoList,
  addTodoList,
  updateTodoList,
  deleteTodoList,
};
