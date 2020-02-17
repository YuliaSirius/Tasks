'use strict';
let arr = [1, 5, 15, 2.58, 38, 12, 17, 25, 4];

let inRange = (min, max) => item => min <= item && item <= max;

let filtered = arr.filter(inRange(3, 15)); // [5, 15, 12, 4]


['1.2', '15'].map(parseInt); // [1, NaN]
['1.2', '15'].map(item => parseInt(item)); // [1, 15]

