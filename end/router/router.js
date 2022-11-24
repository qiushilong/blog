const Router = require("@koa/router");
const router = new Router();

const userRoute = require("./admin/user.route");

router.use(userRoute.routes(), userRoute.allowedMethods());

module.exports = router;
