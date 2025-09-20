//uses {} and exact names -->named export
import {num1,print,obj} from './module1.js'
//no {}, no exact names --> export default
import Test from './myscript2.js';

console.log(num1);
print("Hello World!!");
console.log(obj.id)
const trip1 = new Test("Grouse Mountain",2,["sunglasses", "water"]);
trip1.display();