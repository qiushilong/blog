const pool = require("~/connection/connection");
const { updateTool, fuzzyQueryTool } = require("~/util/sqlTool");

async function getArticleList(payload) {
  const { page, pageSize, title, specialColumn, tags } = payload;
  const [str, arr] = fuzzyQueryTool({ title, specialColumn, tags });
  console.log(`select * from article ${str} limit ?,?`);
  const [res] = await pool.query(`select * from article ${str} limit ?,?`, [
    ...arr,
    (page - 1) * pageSize,
    pageSize,
  ]);
  const [[{ total }]] = await pool.query(
    `select count(*) total from article ${str}`,
    arr
  );
  return {
    list: res,
    total: total,
  };
}

async function addArticle(payload) {
  const { title, specialColumn, cover, content, tags } = payload;
  await pool.query(
    "insert into article(id,title,createDate,content,cover,specialColumn,tags) values(null,?,now(),?,?,?,?)",
    [title, content, cover, specialColumn, JSON.stringify(tags)]
  );
}

async function updateArticle(payload) {
  const { id, title, content, cover, column, tags } = payload;
  const [str, arr] = updateTool({ title, content, cover, column, tags });
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
