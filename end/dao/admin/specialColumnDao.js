const pool = require("~/connection/connection");
const updateTool = require("~/util/updateTool");

async function getSpecialColumnList() {
  const [res] = await pool.query("select * from special_column");
  return res;
}

async function addSpecialColumn(payload) {
  const { title, introduce, cover } = payload;
  await pool.query(
    "insert into special_column(id,title,createDate,introduce,cover) values(null,?,now(),?,?)",
    [title, introduce, cover]
  );
}

async function updateSpecialColumn(payload) {
  const { id, title, introduce, cover } = payload;
  const [str, arr] = updateTool({ title, introduce, cover });
  console.log(str, arr);
  await pool.query(
    `update special_column set updateDate=now(),${str} where id=?`,
    [...arr, id]
  );
}

async function deleteSpecialColumn(id) {
  await pool.query("delete from special_column where id=?", [id]);
}

module.exports = {
  getSpecialColumnList,
  addSpecialColumn,
  updateSpecialColumn,
  deleteSpecialColumn,
};
