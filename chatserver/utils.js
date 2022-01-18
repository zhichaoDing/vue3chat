//返回类型
function echoType(data) {
  const _toString = Object.prototype.toString;
  const type = _toString
    .call(data)
    .replace(/^\[object\s([a-zA-Z]+)\]$/gi, function (a, b) {
      console.log(a, b);
      return b.toLocaleLowerCase();
    });

  return type;
}

module.exports = {
  echoType,
};
