'use strict';
function myBind(func, context, ...arrfix) {
  // bind возвращает ф-цию
    return function wrapper(...arr) {
        let i = 0;
    let key = 'key';
    while (key in context) {
      key = 'key' + i++; // создаю уникальный ключ в контексте
    }
    context[key] = func; // присваиваю ключу функцию
    let result = context[key](...arrfix.concat(arr)); // let result =  результат func;
    delete context[key]; // удаляю созданный ключ
    return result; 
  };
}
function func(d, e, f) {
  console.log(this.name + ' ' + d + ' -' + e + ' ' + this.month);
  console.log(f);
  let res = 1 + 2;
  return res;
}
let context = {
  name: 'Yulia',
  month: 'аugust',
  key: 2,
  key0: 2
};
let wr = func.bind(context, 'Miasnikova', 18)(5)
myBind(func, context, 'Miasnikova', 19, 5)(66, 289, 6);
myBind(func, context, 'Miasnikova')(19, 5);
myBind(func, context)('Miasnikova', 19, 5);

// // через apply
function myBindApply(func, context, ...arr) {
    return function (...args) {
    func.apply(context, arr.concat(args));
     };
}

// через call
function myBindCall(func, context, ...arr) {
  return function (...args) {
  func.call(context, ...arr.concat(args));
   };
}
myBindApply(func, context, 'Miasnikova', 20, 5)(66, 289, 6);
myBindApply(func, context, 'Miasnikova')(20, 5);
myBindApply(func, context)('Miasnikova', 20, 5);
myBindCall(func, context, 'Miasnikova', 21, 5)(66, 289, 6);
myBindCall(func, context, 'Miasnikova')(21, 5);
myBindCall(func, context)('Miasnikova', 21, 5);
