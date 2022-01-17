import routes_pc from "./route_pc";
let route = {};
if (
  navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
) {
  // 移动端逻辑
} else {
  // PC端逻辑
  route = routes_pc;
}

export default route;
