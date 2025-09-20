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