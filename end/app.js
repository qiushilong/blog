const Koa = require("koa");
const app = new Koa();
const { koaBody } = require("koa-body");

const router = require("./router/router");

// app.use(koaBody());

app.use(router.routes());

app.listen(3000, () => {
  console.log("server in http://localhost:3000");
});
