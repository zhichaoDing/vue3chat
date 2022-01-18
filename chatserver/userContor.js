//用户一些操作
//获取用户账号信息
const fs = require("fs");
let usersData = require("./user.json");

//校验用户信息
function checkUser(username, password) {
  const { users } = usersData;
  let flag = false;
  users.map((item) => {
    if (item.password === password && item.username === username) {
      flag = true;
    }
  });
  return flag;
}

//添加用户
//1、先校验用户名是否存在 返回boolean
function addUser(username, password) {
  const { users } = usersData;
  let flag = false;
  let _users = users.map((item) => {
    if (item.username === username) {
      flag = true;
    }
    return item;
  });
  if (flag) {
    return flag;
  }
  _users.push({ username, password });
  usersData.users = _users;
  const _userStr = JSON.stringify(usersData, 4); //4个空格序列输出
  fs.writeFileSync("./user.json", _userStr);
  return {
    username,
  };
}

module.exports = { checkUser, addUser };
