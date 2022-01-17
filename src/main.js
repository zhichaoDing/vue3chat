import { createApp } from "vue";
import "ant-design-vue/dist/antd.css";

import App from "./App.vue";

//路由
import route from "./route/route";

const app = createApp(App);
app.use(route);
app.mount("#app");
