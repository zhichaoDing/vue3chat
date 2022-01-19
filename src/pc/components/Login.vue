<template>
  <a-form :wrapper-col="wrapperCol">
    <a-form-item :="validateInfos.username">
      <a-input
        :wrapper-col="wrapperCol"
        v-model:value="modelRef.username"
        placeholder="请输入用户名"
      />
    </a-form-item>
    <a-form-item :="validateInfos.password">
      <a-input-password
        :wrapper-col="wrapperCol"
        v-model:value="modelRef.password"
        placeholder="请输入账号密码"
      />
    </a-form-item>
    <a-col :offset="10">
      <router-link to="/register">
        <a-button type="link">注 册</a-button>
      </router-link>
    </a-col>
    <a-form-item>
      <a-button block @click.prevent="onSubmit" type="primary">登 录</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, toRaw } from "vue";
import { Form, message } from "ant-design-vue";
import { useRouter, useRoute } from "vue-router";
import { userLogin } from "../servers/user";
import _ from "loadsh";

const useForm = Form.useForm;
export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const modelRef = reactive({
      username: "",
      password: "",
    });
    const rulesRef = reactive({
      username: [
        {
          required: true,
          message: "请输入用户名",
        },
        {
          min: 2,
          message: "用户名最少3位",
        },
        {
          max: 8,
          message: "用户名最多8位",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入账号密码",
        },
        {
          pattern: /^[a-zA-Z0-9]{6,10}$/gi,
          message: "请输入6-10位数字、字母",
        },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      rulesRef
    );
    const onSubmit = _.debounce(() => {
      validate()
        .then(async () => {
          let { username, password } = toRaw(modelRef);
          try {
            const { code, msg } = await userLogin(username, password);
            if (code === 0) {
              window.localStorage.setItem("username", username);
              router.push("/info");
              message.success(msg);
            } else {
              message.error(msg);
            }
          } catch (error) {
            console.log(error);
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    },1000);
    return {
      wrapperCol: {
        span: 16,
        offset: 4,
      },
      validateInfos,
      resetFields,
      modelRef,
      onSubmit,
    };
  },
});
</script>