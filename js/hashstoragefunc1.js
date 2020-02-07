'use strict';
function HashStorageFunc(name, info) {
  let hash = {};
  hash[name] = info;
  this.addvalue = function addValue(key, value) {
    hash[key] = value;
  };
  this.getvalue = function getValue(key) {
    return hash[key];
  };
  this.delete = function deleteValue(key) {
    return hash[key] ? delete hash[key] : false;
  };
  this.getkeys = function getKeys() {
    return Object.keys(hash);
  };
}

let drinkStorage = new HashStorageFunc('Margarita', {
  Alcoholic: 'yes',
  Ingredients: ['Strawberry', 'Tequila']
});

drinkStorage.addvalue('Pina Colada', {
  Alcoholic: 'yes',
  Ingredients: ['Сoconut milk', 'Pineapple juice']
});
console.log(drinkStorage.getvalue('Margarita'));
console.log(drinkStorage.delete(' '));
console.log(drinkStorage.getkeys());
