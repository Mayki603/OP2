const memoize = require("./memoize");

const multiply = (a, b) => {
    console.log(`Calculating ${a} * ${b}...`);
    return a * b;
};

const memoMulti = memoize(multiply, {
    maxSize: 2,
    eviction: "LFU"
});

console.log(memoMulti(2, 3)); 
console.log(memoMulti(2, 3)); 
console.log(memoMulti(4, 5)); 
console.log(memoMulti(4, 5)); 
console.log(memoMulti(6, 7)); 

console.log(memoMulti(2, 3)); 
console.log(memoMulti(4, 5));