//1. functions are like variables
const foo = ()=>{
    console.log("Hello")
}
console.log(foo);
foo();

//2.assigning functions to the arrays

let values = ["Functions are members of array",
               (msg)=>console.log(msg)
            ]
values[1](values[0])

//function passed as an argument

const displayInfo = logger => {
    logger("Hello Functional Programming");
}
const logger = msg => console.log(msg);

// displayInfo((msg=>console.log(msg)))
displayInfo(logger)


let fruits = ["apples", "strawberries", "blueberries", "oranges", "grapes"];

// const newFruits = fruits.map((fruit)=>fruit.toUpperCase());
const newFruits = fruits.map((fruit,index)=> index%2==0?fruit:fruit.toUpperCase()
);
console.log(newFruits)

// const filteredFruits = fruits.filter((fruit)=>fruit.length>8)
const filteredFruits = fruits.filter((fruit)=>fruit.includes("berry"))
console.log(filteredFruits);

const numbers = [1,2,3,4,5];
const ans = numbers.reduce((prev,curr)=>{
    console.log(`Prev: ${prev} and current ${curr}`);
    return prev+curr;
},1)
console.log(ans);