const pool = require("~/connection/connection");
const updateTool = require("~/util/updateTool");

async function getArticleList() {
  const [res] = await pool.query("select * from article");
  return res;
}

async function addArticle(title, specialColumn, cover, column, tags) {
  await pool.query(
    "insert into article(id,title,createDate,content,cover,specialColumn,tags) values(null,?,now(),?,?,?,?)",
    [title, "1", cover, specialColumn, JSON.stringify(tags)]
  );
}

async function updateArticle(id, title, content, cover, column, tags) {
  const [str, arr] = updateTool({ title, content, cover, column, tags });
  console.log(str, arr);
  await pool.query(`update article set updateDate=now(),${str} where id=?`, [
    ...arr,
    id,
  ]);
}

async function deleteArticle(id) {
  await pool.query("delete from article where id=?", [id]);
}

module.exports = {
  getArticleList,
  addArticle,
  updateArticle,
  deleteArticle,
};
