/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const arrCopy = [...arr];
  const options = {
    caseFirst: 'upper'
  };
  arrCopy.sort((a, b) => {
    if (param === 'desc') {
      return b.localeCompare(a, 'ru', options);
    }
    return a.localeCompare(b, 'ru', options);
  });
  return arrCopy;
}
