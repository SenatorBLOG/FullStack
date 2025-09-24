/* 
1. Object Destructuring
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

//1. Object Destructuring
const address = {
    street:"Royal Street",
    city:"New Westminster",
    province: "BC"
}
let {street,city:c} = address;
c="vancouver"
console.log(c); // vancouver

console.log(address.city); //New Westminster

const person ={
    first:"John",
    last:"Doe",
    address
}
const {address:{province:p},first} = person;
console.log(`${first} of ${p}`)

// 2. Destructuring incoming function arguments
const displayMessage=({first})=>{
    // console.log(`First name is ${obj.first}`)
    console.log(`First name is ${first}`)
}
displayMessage(person);

// 3. Array Destructuring
const colors = ["red", "green", "blue", "yellow"];
const [firstColor, secondColor, ...restColors] = colors;
console.log(firstColor); // red
console.log(secondColor); // green
console.log(restColors); // ["blue", "yellow"]

// 4. Object Literal Enhancement / Restructuring --> opposite of destructuring
const a = 10;
const b = 20;

const obj1 = {
    a:a,
    b:b
};
//Shorthand
const obj2 = {a,b};
console.log(obj2); // {a: 10, b: 20}

// 5. Spread Operator
const arr1 = [1,2];
const arr2 = [3,4];
const combinedArr = [...arr1,...arr2];
console.log(combinedArr);

const originalArr = [1, 2, 3];
const clonedArr = [...originalArr];
clonedArr[0] = 99;
console.log(originalArr); // [1, 2, 3]

function sum(a, b, ...theRest) {
  console.log(theRest); // [3, 4, 5]
}
sum(1, 2, 3, 4, 5);

// 6. Different types of for Loops
// for IN 
const person1 = {name: "Alice", age: 30};
for (const key in person1) {
    console.log(`${key}: ${person1[key]}`);
}
//for OF
const numbers = [10, 20, 30];
for (const num of numbers) {
    console.log(num); // 10, 20, 30
}
// 7. Using Classes 
class Car {
    constructor(make,model){
        this.make =make;
        this.model=model;
    }
    drive(){
        console.log(`The ${this.make} ${this.model} is driving!`);
    }
}
const myCar = new Car ("Lada", "Priora");
myCar.drive();
