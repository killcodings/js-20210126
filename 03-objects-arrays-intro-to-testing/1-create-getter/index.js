import {omit} from "../../02-javascript-data-types/3-omit";

/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const pathArr = path.split('.');
  return (obj) => {
    for (let pathStr of pathArr) {
      if (obj) {
        obj = obj[pathStr];
      } else {
        break;
      }
    }
    return obj;
  };
}

// const getter = createGetter('more.nested.property');
// console.log((getter({more: {nested: {property: 1}}})));
//
// const obj = {
//   category: {
//     title: 'Goods',
//     foo: undefined
//   }
// };
// const getter2 = createGetter('category.title');
// console.log((getter2(obj)));
