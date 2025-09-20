"use strict"
const someObj = {
    courses: ["1280","3380"],
    print(){
        setTimeout(function (){
            console.log(this) //window
            console.log(this.courses.join()) //
        }, 1000)
    },
    printArrow(){
        setTimeout(()=>{
            console.log(this) //
            console.log(this.courses.join())
        }, 1000)
    }
}
someObj.print();
someObj.printArrow();