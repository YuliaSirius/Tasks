'use strict';
//  prototype style
function HashStorageFunc() {
  this._hash = {};
}
HashStorageFunc.prototype.addValue = function(key, value) {
  this._hash[key] = value;
};
HashStorageFunc.prototype.getValue = function(key) {
  return this._hash[key];
};
HashStorageFunc.prototype.deleteKey = function(key) {
  return this._hash[key] ? delete this._hash[key] : false;
};
HashStorageFunc.prototype.getKeys = function() {
  return Object.keys(this._hash);
};

function ClassA() {
  HashStorageFunc.apply(this, arguments);
  // or   this._hash = {};
}
ClassA.prototype = Object.create(HashStorageFunc.prototype);
ClassA.prototype.constructor = ClassA;
ClassA.prototype.countDrinks = function() {
  return Object.keys(this._hash).length;
};
ClassA.prototype.addValue = function(key) {
  HashStorageFunc.prototype.addValue.apply(this, arguments);
  alert(`${key} added to list`);
  return true;
};

function ClassB() {
  HashStorageFunc.apply(this, arguments);
}
ClassB.prototype = Object.create(HashStorageFunc.prototype);
ClassB.prototype.constructor = ClassB;
ClassB.prototype.deleteAll = function() {
  for (let key in this._hash) {
    delete this._hash[key];
  }
};
ClassB.prototype.getValue = function(key) {
  HashStorageFunc.prototype.getValue.apply(this, arguments);
  if (this._hash[key]) {
    alert(`${key} is on the list`);
  } else alert("This drink isn't on the list");
};

let drinkStorage = new HashStorageFunc();
let classA = new ClassA();
let classB = new ClassB();

// using classes
class HashStorageFunc {
  constructor() {
    this._hash = {};
  }
  addValue(key, value) {
    this._hash[key] = value;
  }
  getValue(key) {
    return this._hash[key];
  }
  deleteKey(key) {
    return this._hash[key] ? delete this._hash[key] : false;
  }
  getKeys() {
    return Object.keys(this._hash);
  }
}

class ClassA extends HashStorageFunc {
  countDrinks() {
    return Object.keys(this._hash).length;
  }
  addValue(key, value) {
    super.addValue(key, value);
    alert(`${key} added to list`);
    return true;
  }
}

class ClassB extends HashStorageFunc {
  deleteAll() {
    for (let key in this._hash) {
      delete this._hash[key];
    }
  }
  getValue(key) {
    if (this._hash[key]) {
      alert(`${key} is on the list`);
    } else alert("This drink isn't on the list");
    return super.getValue(key);
  }
}

let drinkStorage = new HashStorageFunc();
let classA = new ClassA();
let classB = new ClassB();
