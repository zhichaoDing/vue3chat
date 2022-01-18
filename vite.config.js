import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";  //提供 Vue 3 单文件组件支持
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
  resolve:{ 
    extensions:['.js','.vue']  //配置导入时需要省略的后缀名
  },
  server:{
    proxy:{  //配置代理 处理跨域
      '/api': {
        target: 'http://localhost:3333',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 将api 替换为空 如请求api/login -->  http://localhost:3333/login
      },
    }
  }
});
