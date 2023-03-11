/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined) {
    return string;
  }
  let counter = 0;
  const newStringArray = [];

  let currentSymbol = string.slice(0, 1);
  if (size > 0) {
    for (let symbol of [...string]) {
      if (currentSymbol !== symbol) {
        currentSymbol = symbol;
        counter = 1;
        newStringArray.push(symbol);
      } else {
        if (counter < size) {
          counter++;
          newStringArray.push(symbol);
        }
      }
    }
  }
  return newStringArray.join('');
}
// console.log(trimSymbols('xxxaaaaab', 1));


// export function trimSymbols2(string, size) {
//   if (size === 0) return '';
//   if (size === undefined) return string;
//
//   const firstSlice = string.slice(0, size);
//   const rest = [...string.slice(size)];
//
//   return rest.reduce((accumStr, char) => {
//     if (!accumStr.endWith(char.repeat(size))) {
//       accumStr += char;
//     }
//     return accumStr;
//   }, firstSlice);
// }

