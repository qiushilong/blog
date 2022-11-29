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
      resultStr += resultStr.length === 0 ? `${key}=?` : `,${key}=?`;
    }
  }

  return [resultStr, resultArr];
}

/**
 * @param {*} obj
 * @example 把 { name: 'zs', age: undefined, sex:'nan' } 变为 [`where name like '%zs%' and sex like '&nan%'`, ['zs', 'nan']]
 * @returns
 */
function fuzzyQueryTool(obj) {
  let resultStr = "";
  const resultArr = [];

  for (const key in obj) {
    if (obj[key]) {
      resultArr.push(`%${obj[key]}%`);
      resultStr +=
        resultStr.length === 0 ? `where ${key} like ?` : ` and ${key} like ?`;
    }
  }
  return [resultStr, resultArr];
}

module.exports = {
  updateTool,
  fuzzyQueryTool,
};
