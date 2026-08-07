/*question 1: greet */
function sayHello (name){
    return `Hello, ${name}!`
};
    console.log(sayHello("Aver"));

    
    /*question 2: subtraction function*/
 const subtract = function(a,b){
        return a - b 
};
console.log(subtract(32,24));

/*question 3: division function */
const divide = (x,y) => (x/y)
console.log(divide(20,2));

/*question 4:welcome function */
function welcome(name = "visitor", city = "Unknown"){
    return `${name} is from ${city}`
};
console.log(welcome());

/*question 5: higher-order function */
function double (num){
    return num * 2;
}
function square (num){
    return num * num;
}
function operate(num, func1, func2){
    return func2(func1(num));
}
console.log(operate(2, double, square));

/*question 6: IIFE */
(function (){
    console.log("i run immediately!")
})();

/*question 7: object */
const car = {
    brand: "toyota",
    getinfo(){
        return `This car is a ${this.brand}`;
    }
};
console.log(car.getinfo());

/*question 8:even arrow function */
const isEven = (n) => n % 2 == 0;
console.log(isEven(16));
console.log(isEven(17));