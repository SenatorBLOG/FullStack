class Vacation {
    constructor(destination,length){
        this.destination = destination;
        this.length = length;
    }
    displayInfo(){
        console.log(`A trip to ${this.destination} will take ${this.length} days.`)
    }
}
//construct object
const trip1 = new Vacation("Grouse Mountain",2);
trip1.displayInfo();

//inheritance

export default class Expedition extends Vacation {
    constructor(destination,length,gear){
        super(destination,length);
        this.gear= gear;
    }
    display(){
        this.displayInfo();
        console.log(`Please bring your ${this.gear.join(", and ")}`)
    }
}

let exp1 =  new Expedition("Cultus Lake",1,["water","snack","sunscreen"]);
exp1.display();