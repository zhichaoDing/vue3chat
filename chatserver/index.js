const Koa = require("koa");
const app = new Koa();
const path = require("path");

var cors = require("koa2-cors");

const Router = require("koa-router");
const router = new Router();

const koaStatic = require("koa-static");
app.use(koaStatic(path.join(__dirname, "../dist")));
app.use(koaStatic(__dirname, "../dist"));

var bodyParser = require("koa-bodyparser");
app.use(bodyParser());

const http = require("http");
const server = http.createServer(app.callback());
//接入socket
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    // origin: ["http://localhost:3000","http://192.168.0.106:3333"], //需要放开的跨域地址
    origin: "*", //需要放开的跨域地址
  },
});

let users = [];
//socket
// 们注册一个中间件来检查用户名并允许连接
io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});
io.on("connection", (socket) => {
  users = [];
  for (let [id, socket] of io.of("/").sockets) {
    console.log(socket.username);
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  io.emit("users", users);
  //   监听消息
  socket.on("msg", ({ msg: content, to }) => {
    console.log("message: " + content);
    console.log("ID: " + to);
    // io.emit("onmsg", data.msg); //所有用户
    socket.broadcast.emit("onmsg", { msg: content, self: false, from: to }); //处了链接自身的用户
    socket.to(to).emit("onmsg", {
      //指定人发
      msg: content,
      self: true,
    });
    socket.emit("onmsg", {
      //给自己发
      msg: content,
      from: to,
      self: true,
    });
  });
});

//配置路由
//静态路由 /index?title
router.post("/login", async (ctx) => {
  //ctx 包含了request response
  //获取参数的两种方式
  ctx.set("Access-Control-Allow-Origin", "*");
  console.log(ctx.request.body);
  ctx.status = 200;
  ctx.body = {
    code: 0,
    username:ctx.request.body.username
  };
});

app.use(cors());
app.use(router.routes()).use(router.allowedMethods()); //官方推荐

server.listen(3333, () => {
  console.log("server 127.0.0.1:3333");
});
