'use strict';
function deepEqual(a, b) {
  if (a === b) {
    return true;
  } else if (
    typeof a === 'object' &&
    typeof b === 'object' &&
    Object.keys(a).length === Object.keys(b).length
  ) {
    for (let item in a) {
      if (!deepEqual(a[item], b[item])) {
        return false;
      }
    }
    return true;
  }
  return false;
}

let obj1 = {
  1: 'red',
  3: { 4: 'orange' },
  4: [1, [1, { 5: 7 }, 23]]
};
let obj2 = {
  1: 'red',
  3: { 4: 'orange' },
  4: [1, [1, { 5: 5 }, 23]]
};
console.log(deepEqual(obj1, obj2));
