const Router = require("koa-router");
const router = new Router();

const { echoType } = require("./utils");

//获取用户账号信息
let userContor = require("./userContor");

//路由登录
router.post("/login", async (ctx) => {
  const { username, password } = ctx.request.body;
  ctx.status = 200;
  if (!username || !password) {
    ctx.body = {
      code: -1,
      username: ctx.request.body.username,
      msg: "用户名或密码不能为空",
    };
  }
  if (userContor.checkUser(username, password)) {
    //登录成功设置cookie
    ctx.cookies.set("username", username, {
      maxAge: 60 * 1000,
    });
    ctx.body = {
      code: 0,
      username: ctx.request.body.username,
      msg: "登录成功",
    };
  } else {
    ctx.body = {
      code: -1,
      username: ctx.request.body.username,
      msg: "用户名或密码错误",
    };
  }
});

//注册
router.post("/register", async (ctx) => {
  const { username, password } = ctx.request.body;
  ctx.status = 200;
  if (!username || !password) {
    ctx.body = {
      code: -1,
      username: ctx.request.body.username,
      msg: "用户名或密码不能为空",
    };
  }
  let data = userContor.addUser(username, password);
  if (echoType(data) === "boolean") {
    ctx.body = {
      code: -1,
      msg: "该用户名已存在",
    };
  } else {
    ctx.body = {
      code: 0,
      username: data.username,
      msg: "恭喜注册成功！",
    };
  }
});

module.exports = router;
