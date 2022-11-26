/**
 * @param {*} obj
 * @example 把 { name: 'zs', age: undefined, sex:'nan' } 变为 ['name=?,sex=?', ['zs', 'nan']]
 * @returns
 */
function updateTool(obj) {
  let resultStr = "";
  const resultArr = [];

  for (const key in obj) {
    if (obj[key] !== undefined) {
      resultArr.push(obj[key]);
      resultStr += resultStr.length === 0 ? key + "=?" : "," + key + "=?";
    }
  }

  return [resultStr, resultArr];
}

module.exports = updateTool;
