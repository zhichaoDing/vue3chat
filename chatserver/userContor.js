//用户一些操作
//获取用户账号信息
const fs = require("fs");
let usersData = require("./user.json");

//校验用户信息
function checkUser(username, password) {
  const { users } = usersData;
  let flag = false;
  users.map(item => {
    if (item.password === password && item.username === username) {
      flag = true;
    }
  });
  return flag;
}

module.exports = { checkUser };
