'use strict';
// the first way
function unique(arr) {
  arr.sort((a, b) => a - b);
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i + 1]) {
      result.push(arr[i]);
    }
  }
  return result;
}
console.log(unique([1, 1, 6, 3, 10, 10, 3, 5, 6, 6, 6, 9]));

// the second way
function uniqueItem(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!result.includes(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result.sort((a, b) => a - b);
}
console.log(uniqueItem([5, 5, 2, 2, 8, 3, 6, 18, 3]));

// the third way
function uniqueEl(arr) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (item in obj) {
      continue;
    }
    obj[item] = true;
  }
  let result = [];
  for (let i in obj) result.push(Number(i));
  return result;
}
console.log(uniqueEl([5, 3, 3, 8, 3, 6, 46, 56, 3]));

// the fourth way
function uniqueElem(arr) {
  var count = {};
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (!(item in count)) count[item] = 0;
    count[item]++;
  }
  let result = [];
  for (let i in count) {
    result.push(Number(i));
  }
  return result;
}
console.log(uniqueElem([4, 20, 4, 5, 6, 20, 5, 20, 89]));



// filter
// set
