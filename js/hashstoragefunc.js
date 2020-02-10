'use strict';
function HashStorageFunc() {
  this._hash = {};
  this.addValue = function(key, value) {
    this._hash[key] = value;
  };
  this.getValue = function(key) {
    return this._hash[key];
  };
  this.deleteKey = function(key) {
    return this._hash[key] ? delete this._hash[key] : false;
  };
  this.getKeys = function() {
    return Object.keys(this._hash);
  };
}

function ClassA() {
  HashStorageFunc.apply(this, arguments);
  this.countDrinks = function() {
    return Object.keys(this._hash).length;
  };
  let parentAddValue = this.addValue;
  this.addValue = function(key) {
    parentAddValue.apply(this, arguments);
    alert(`${key} added to list`);
    return true;
  };
}

function ClassB() {
  HashStorageFunc.apply(this, arguments);
  this.deleteAll = function() {
    for (let key in this._hash) {
      delete this._hash[key];
    }
  };
  let parentGetValue = this.getValue;
  this.getValue = function(key) {
    parentGetValue.apply(this, arguments);
    if (this._hash[key]) {
      alert(`${key} is on the list`);
    } else alert("This drink isn't on the list");
  };
}

let drinkStorage = new HashStorageFunc();
let classA = new ClassA();
let classB = new ClassB();

// drinkStorage.addValue('Margarita', {
//   Alcoholic: 'yes',
//   Ingredients: ['Strawberry', 'Tequila']
// });
// classB.addValue('Pina Colada', {
//   Alcoholic: 'yes',
//   Ingredients: ['Сoconut milk', 'Pineapple juice']
// });
// console.log(classB);
// console.log(classB.getKeys());
// classB.getValue('Pina Coada');
