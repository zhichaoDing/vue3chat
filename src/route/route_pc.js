import { createRouter, createWebHashHistory } from "vue-router";
import Info from "../pc/page/Info";
import Home from "../pc/page/Home";
import Register from "../pc/page/Register";

const routes = [
  { path: "/", redirect: '/login' }, //重定向
  // { path: "/login", component: Home , alias: '/'  }, //取别名
  { path: "/login", component: Home },
  { path: "/info", component: Info },
  { path: "/register", component: Register },
];

const routes_pc = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default routes_pc;
