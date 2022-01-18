<template>
  <a-layout>
    <a-layout-content class="layout">
      <a-row>
        <a-col :span="6" :offset="9">
          <a-card class="login-card">
            <img
              alt="Vue logo"
              src="../../assets/logo.png"
              style="width: 70px"
            />
            <h1>欢迎{{msg}}</h1>
            <slot></slot>
          </a-card>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>
<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
let msg = ref("登录");
if (route.path == "/register") {
  msg = "注册";
} else {
  msg = "登录";
}
console.log(route.path);

</script>
<style scoped>
.layout {
  padding-top: 100px;
  height: 100vh;
}
.login-card {
  box-shadow: 0px 0px 5px 7px #23a184ab;
  border-radius: 20px;
  height: 370px;
}
</style>