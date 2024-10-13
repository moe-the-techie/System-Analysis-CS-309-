// SYNTAX

// VARIABLES:

// var: variable that has global scope (the entire module).
var test1 = 1

// let: variable with the scope being limited like a private variable in Java.
let test2 = true

// const: constant value that cannot be altered.
const test3 = 5

// examples:
let arr = [1,2,3,4]

// It is advised to never use var.

// CONTROL STRUCTURES

// FOR LOOP
for (let i=0; i<9; i ++) {
    // Action
}

// CODE SAMPLES:

let arr1 = [1,2,3]

let sum1 = 0

let sum2 = 0

for (let i=0; i<arr1.length; i++) {
    sum1 += arr[i]
}

// Which can be reduced down to what's below using arrow functions (more on this later)
sum2 = arr.reduce((a,b) => (a+b))

// Definition of an arrow function
const arrow_sum = (x,y) => { return x+y }

// Which is too complex for a simple function, this can be reduced to
const arrow_sum_improved = (x,y) => x+y

// What's good about this way of defining functions is that you can pass them to other functions such as eventlisteners allowing for great automation potential


// Some built-in array functions (that use anonymous functions as paraemters)
let arr3 = [1,2,3,4,23,12,6]

console.log(arr3.filter(e => e > 3))

console.log(arr3.findIndex(e => e == 4))

console.log(arr3.find(e => e == 5))

console.log(arr3.map(e => 5))

// Reduce here takes two parameters acc -> accumulat and cur -> current meaning that whatever's operation is done on the paremteres its output is stored in acc and the
// iteration takes place on cur only. (TL;DR: cur changes and the output is stored into acc).
console.log(arr3.reduce((acc, cur) => acc + cur))

console.log(arr.reduce((acc, cur) => {if (acc > cur) { return cur } else {return acc}}))

// Which can be simplified using the ? operator to find the minimum as well
arr.reduce((acc, cur) =>  (acc > cur) ? cur : acc)

// More array operations:
console.log([1,2,3].push(4)) // -> [1,2,3,4]

console.log([1,2,3].pop()) // -> 3 (and changes [1,2,3] to [1,2])

console.log([1,2,3].shift()) // -> 1 (and changes [1,2,3] to [2,3])

console.log([1,2,3].unshift(1)) // -> [1,1,2,3]

// Map (dict)
let map = {"key1": "value1", "key2": "value2"}
console.log(map["key1"])