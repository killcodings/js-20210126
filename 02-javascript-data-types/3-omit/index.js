/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const getFields = [...fields];
  const newObj = {};
  for (let item in obj) {
    if (!getFields.includes(item)) {
      newObj[item] = item;
    }
  }
  return newObj;
};
