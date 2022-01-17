<template>
  <a-row>
    <a-col :span="12" :offset="6">
      {{ user.userID }}:{{ user.userName }}
      <ul ref="myRef">
        <li
          v-for="(item, idx) of modelRef.msgArr"
          :key="idx"
          :class="{ self: item.self }"
        >
          <div>{{ item.from }}:</div>
          <p>{{ item.msg }}</p>
        </li>
      </ul>

      <a-input @keyup.enter="send" v-model:value="modelRef.sendmsg" />
      <a-button @click="send">发送</a-button></a-col
    >
  </a-row>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRaw,
  onMounted,
  onDeactivated,
  onBeforeUnmount,
  onUpdated,
  ref,
} from "vue";
import { message } from "ant-design-vue";
import { useRouter, useRoute } from "vue-router";
import socket from "../../socket";
export default defineComponent({
  setup() {
    const myRef = ref(null);
    const router = useRouter();
    const modelRef = reactive({
      sendmsg: "",
      msgArr: [],
    });
    const user = reactive({
      userID: "",
      from: "", //来自于谁
      userName: window.localStorage.getItem("username"),
    });
    onMounted(() => {
      console.log("onMounted");

      if (!user.userName) {
        router.push("/");
        return;
      }
      socket.auth = { username: user.userName };
      socket.connect();
      socket.on("connection", (res) => {
        console.log("#connection: ", res);
        console.log(socket.id);
      });
      socket.on("users", (users) => {
        user.userID = socket.id;
        console.log(users);
        users.map((item) => {
          if (user.userID === item.userID && !user.userName) {
            user.userName = item.username;
          }
        });
      });
      socket.on("connect_error", (err) => {
        console.log(err);
      });
      socket.on("onmsg", (data) => {
        // let _msggArr = modelRef.msgArr.map((item) => item);
        // _msggArr.push(data);
        modelRef.msgArr.push(data);
        msgUltoBottom();
        // modelRef.msgArr = _msggArr;
      });
    });
    //todo 不知道为什么不触发
    // //调用onUpdated
    // onBeforeUnmount(() => {
    //   console.log("5...onUpdated()在组件更新之后执行");
    // });
    // onUpdated(() => {
    //   console.log(myRef.value.scrollHeight);
    //   myRef.value.scrollTo(0, myRef.value.scrollHeight);
    // });
    onDeactivated(() => {
      socket.off("conenct_error");
    });

    const msgUltoBottom = () => {
      setTimeout(() => {
        myRef.value.scrollTo(0, myRef.value.scrollHeight);
      }, 10);
    };

    const send = () => {
      var data = toRaw(modelRef);
      let msg = data.sendmsg.trim();
      if (msg === "") {
        warning();
        return;
      }
      socket.emit("msg", { msg: data.sendmsg, to: user.userID });
      modelRef.sendmsg = "";
    };
    const warning = () => {
      message.error("消息不能为空");
    };

    return {
      modelRef,
      user,
      send,
      myRef,
    };
  },
});
</script>
<style scoped>
ul {
  list-style: none;
  background-color: #ccc;
  min-height: 40px;
  padding: 10px;
  max-height: calc(100vh - 130px);
  overflow: auto;
}
li {
  text-align: left;
}

li p {
  background-color: rgb(68, 141, 68);
  display: inline-block;
  padding: 0 5px;
  border-radius: 0 5px 5px 5px;
}
.self {
  text-align: right;
}
.self p {
  border-radius: 5px 0px 5px 5px;
  background-color: #fff;
}
</style>