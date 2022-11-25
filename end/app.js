require("module-alias/register");
const Koa = require("koa");
const tokenVerify = require("~/middleware/tokenVerify");
const router = require("./router/router");

const app = new Koa();

app.use(tokenVerify);

app.use(router.routes());

app.listen(3000, () => {
  console.log("server in http://localhost:3000");
});
