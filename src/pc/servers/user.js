import axios from "axios";
import qs from "qs";

axios.defaults.withCredentials = true; //设置添加cookie

//用户登录
export function userLogin(username, password) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/login", qs.stringify({ username, password }))
      .then((response) => resolve(response.data))
      .catch((err) => {
        reject(err);
      });
  });
}

//用户注册
export function userRegister(username, password) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/register", qs.stringify({ username, password }))
      .then((response) => resolve(response.data))
      .catch((err) => {
        reject(err);
      });
  });
}
