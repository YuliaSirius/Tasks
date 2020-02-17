'use strict';
let salaries = {1:200, 2:300, 3:400};

function sumSalaries(obj) {
  let result = 0;
  let arr = Object.values(obj);
  console.log(arr);
  for (let value of arr) {
result +=value;
  }
  return result;
}

console.log(sumSalaries(salaries));