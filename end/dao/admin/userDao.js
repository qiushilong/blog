const pool = require("../../connection/connection");

async function login(payload) {
  const { account, password } = payload;

  const [res] = await pool.query(
    "select * from user where account=? and password=?",
    [account, password]
  );

  return res;
}

module.exports = {
  login,
};
