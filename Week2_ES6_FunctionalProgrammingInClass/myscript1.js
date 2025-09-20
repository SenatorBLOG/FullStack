/* 1. Object Destructuring
2. Destructuring incoming function arguments
3. Array Destructuring
4. Object Literal Enhancement / Restructuring --> opposite of destructuring
5. Spread Operator and its uses
first use -to combine two arrays
second use -to clone an array
third use -get the remaining items in the array
fourth use -collect function arguments as an array --REST parameters
6. Different types of for Loops
7. Using Classes */

//2. Destructuring incoming function arguments
const person = {
    name: "John Doe",
    age: 21,
    courses: ["1280", "3280", "3380"]
}

/* const displayInfo = (obj)=>{
    console.log(`Name is: ${obj.name}`)
    console.log(`Age is: ${obj['age']}`)
} */
const displayInfo = ({age:a,name})=>{
    console.log(`Name is: ${name}`)
    console.log(`Age is: ${a}`)
}

displayInfo(person)

//3. Array Destructuring
let numbers = [11,22,33,44,55,66,77];

//list matching with commas
let [first,second,,,fifth] = numbers; //numbers[0]
console.log(first,second,fifth); //11 22

//4. Object Literal Enhancement / Restructuring --> opposite of destructuring

let itemName = "desk";
let color = "brown";

let item = {
    itemName,
    color
}

console.log(item.color); //brown
color="green";
console.log(item.color); //brown

//Spread Operator --> ...

let fruits = ["apple", "grapes", "strawberrires"];
let colors = ["red", "green", "blue"];

let newArr = [...fruits,"reading","travelling",...colors,11,22,33];
console.log(newArr)

//clone an array
/* 
let newFruits = fruits;

newFruits[0] = "blueberries";
console.log(newFruits)
console.log(fruits) */

// let newFruits = fruits.slice()
let newFruits = [...fruits];
newFruits[0] = "blueberries";
console.log(newFruits)
console.log(fruits)

//use ... to collect the remaining elements in an array
console.log(numbers)
let [f,s,t,...rest]=numbers;

console.log(rest)

//collect the incoming arguments - rest parameter
let num1=10,num2=20,num3=30,num4=40;
const findSum = (...args)=>{
    console.log(args.length)
    console.log(args[0])
}

findSum(num1,num2,num3,num4);
 findSum("hello", "world!!")

 //different types of for loops

 //a. simple for loop
 for (let i=0;i<fruits.length;i++){
    console.log(`${i}: ${fruits[i]}`)
 }

 //b. for of loop --> access the element

 for(let fruit of fruits){
    console.log(`${fruit}`)
 }
 //c. for in - with objects to iterate through the properties of the object

 for(let i in person){
    console.log(`${i}: ${person[i]}`)
 }

 //d. forEach --> index, element, arr

 /*  fruits.forEach(function(){
    
 }) */

/* fruits.forEach((fruit,index)=>{
   console.log(`${index}: ${fruit}`)
}) */

const callbck = (e,i,arr)=>{
    console.log(`${i}: ${e}`)
}

fruits.forEach(callbck)