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
      <router-link to="/login">
        <a-button type="link">登 录</a-button>
      </router-link>
    </a-col>
    <a-form-item>
      <a-button block @click.prevent="onSubmit" type="primary">注 册</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, toRaw } from "vue";
import { Form, message } from "ant-design-vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import qs from "qs";

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
          pattern: /^[a-zA-Z0-9]{3,5}$/gi,
          message: "请输入3-5位数字、字母",
        },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      rulesRef
    );
    const onSubmit = () => {
      validate()
        .then(() => {
          let data = toRaw(modelRef);
          axios.defaults.withCredentials = true; //设置添加cookie
          axios
            .post("/api/register", qs.stringify(data))
            .then((response) => response.data)
            .then((data) => {
              const { code, msg, username } = data;
              if (code === 0) {
                router.push("/login");
                message.success(msg);
              } else {
                message.error(msg);
              }
            });
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
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