const pool = require("~/connection/connection");

async function login(account, password) {
  const [res] = await pool.query(
    "select * from user where account=? and password=?",
    [account, password]
  );

  return res;
}

async function getUserInfo(account) {
  const [res] = await pool.query("select * from user where account=?", [
    account,
  ]);
  res?.[0] && delete res[0].password;
  return res?.[0] || {};
}

module.exports = {
  login,
  getUserInfo,
};
