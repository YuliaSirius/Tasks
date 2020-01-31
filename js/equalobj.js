'use strict';
// the first way
function equalObj(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
let obj1 = { 1: 'red', 2: 'yellow', 3: { 4: 'orange' } };
let obj2 = { 1: 'red', 2: 'yellow' };
let obj3 = { 1: 'red', 2: 'yellow' };
console.log(equalObj(obj1, obj2));

// the second way
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  } else {
    if (Object.keys(obj1).length != Object.keys(obj2).length) {
      return false;
    }
    for (let item in obj1) {
      if (!(item in obj2)) {
        return false;
      }
      if (obj1[item].valueOf() !== obj2[item].valueOf()) {
        if (!deepEqual(obj1[item], obj2[item])) {
          return false;
        }
      }
    }
  }
  return true;
}
console.log(deepEqual(obj1, obj2));
console.log(equalObj(obj3, obj2));



//  Object.getOwnPropertyNames(a));
//   Object.keys(a));
//   for ... in;
