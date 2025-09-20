"use strict"
//1. let, var and const

var x = 10; //scope is function
let y = 20; //scope is block
const z = 30; //scope is block
// z=20; //gives error

//2. Template strings
console.log("x is: " + x + " and y is " + y);
console.log(`x is ${x} and y is ${y}`);

//3. Objects
const item = {
    itemName: "Table",
    color: "White",
    cost: 120,
      /*  adjustHeight: function(){

    } */
    adjustHeight(){
        console.log("Height Adjusted")
        console.log(this)
    },

    showMessage:()=>{
        console.log("Arrow function");
        console.log(this);
        
    }
}
console.log(item.color);
console.log(item["color"]);
item.adjustHeight();
item.showMessage();

//some function
function foo(){
    console.log("I am a standalone function")
    console.log(this);
}
foo();
const newFoo = foo.bind(item);
newFoo();

//4. three types of function declarations

// Function declarations
displayGreeting("Gupta");
/* 
    function with default values for the parameters
*/
function displayGreeting(first="John",last="Doe"){
    console.log(`Hello ${last}, ${first}!!`)
}

// Function expressions
const displayMessage = function(){
    console.log("Have a good day!")
}

displayMessage();
// Arrow functions
const displayMessage2 = ()=>{
    console.log("I am an arrow function");
    console.log(this)
}
displayMessage2();

/* const square = (num=5)=>{
    return num*num;
} */
const square = (num=2)=> num*num;

console.log(`The answer is ${square(6)}`)