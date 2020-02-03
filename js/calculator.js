'use strict';
let calc = (function() {
  let result = 0;
  return {
    clear() {
      result = 0;
    },
    add(x) {
      result += x;
    },
    substract(x) {
      result -= x;
    },
    multiply(x) {
      result *= x;
    },
    divide(x) {
      result /= x;
    },
    pow(x) {
      result **= x;
    },
    sqrt(x) {
      result = Math.sqrt(x);
    },
    pct(x) {
      result %= x;
    },
    cos(x) {
      result = Math.cos(x);
    },
    sin(x) {
      result = Math.sin(x);
    },
    tan(x) {
      result = Math.tan(x);
    },
    pi() {
      result = Math.PI;
    },
    print() {
      return result;
    }
  };
})();

calc.add(2); // 2
console.log(calc.print());
calc.pow(2); // 4
console.log(calc.print());
calc.sqrt(25); // 5
console.log(calc.print());
calc.sin(25); // -0,13
console.log(calc.print());
calc.pi(); //  3,14
console.log(calc.print());


// (function () {
//   let x = Number(prompt('Enter x', 0));
//   let y = Number(prompt('Enter y', 0));
//   let result = 0;
//   let clear = () => 0;
//   let add = () => {
//     result = x + y;
//   };
//   let minus = () => {
//     result = x - y;
//   };
//   let multiply = () => {
//     result = x * y;
//   };
//   let divide = () => {
//     result = x / y;
//   };
//   let pow = () => {
//     result = x ^ y;
//   };
//   let sqrt = () => {
//     result = x ** y;
//   };
//   let pct = () => {
//     result = x % y;
//   };
//   // При клике на соответствующую кнопку html, вызывается одна из ф-ций:
//   clear();
//   add();
//   minus();
//   multiply();
//   divide();
//   pow();
//   sqrt();
//   pct();
//   alert(result);
// })();
