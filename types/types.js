"use strict";
var myRealAge = 27;
myRealAge = 28;
var address = ["Emerald", 90];
var Color;
(function (Color) {
    Color[Color["Gray"] = 0] = "Gray";
    Color[Color["Green"] = 100] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var myColor = Color.Blue;
var numerals = [1, 10, 99, -5];
Math.max.apply(Math, numerals);
function makeArray(name) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    console.log(name);
    return args;
}
var hobbies = ["Cooking", "Sports"];
hobbies = [100];
var car = 'BMW';
car = { brand: 'BMW', series: 3 };
function returnMyName() {
    return 'str';
}
var returnFullName = function (fName, lName) { return fName + ' ' + lName; };
function sayHello() {
    console.log('Hello!');
}
function multiply(value1, value2) {
    return value1 * value2;
}
var myMultiply;
myMultiply = multiply;
myMultiply(5, 2);
var userData = {
    name: "Barry",
    age: 25
};
var complex = {
    data: [100, 3.99, 10],
    output: function (all) {
        console.log(all);
        return this.data;
    }
};
console.log(complex.output(true));
var complex2 = {
    data: [100, 3.99, 10],
    output: function (all) {
        console.log(all);
        return this.data;
    }
};
var myRealRealAge;
myRealRealAge = '27';
var finalValue = 30;
if (typeof finalValue == "number") {
    console.log("Final Value is a nu mber");
}
function neverReturns() {
    throw new Error('An Error');
}
var canBeNull = null;
canBeNull = 12;
var bankAccount = {
    money: 2000,
    deposit: function (value) {
        return this.money += value;
    }
};
var mySelf = {
    name: "Barry",
    bankAccount: bankAccount,
    hobbies: ["Sports", "Programming"]
};
mySelf.bankAccount.deposit(3000);
var double = function (value) { return value * 2; };
console.log(double(10));
var greet = function (name) {
    if (name === void 0) { name = "Barry"; }
    if (name === undefined) {
        name = "Max";
    }
    console.log("Hello, " + name);
};
greet();
greet("Anna");
var numbers = [-3, 33, 38, 5];
console.log(Math.min.apply(Math, numbers));
var newArray = [55, 20];
newArray.push.apply(newArray, numbers);
console.log(newArray);
var _a = [3.89, 2.99, 1.38], result1 = _a[0], result2 = _a[1], result3 = _a[2];
console.log(result1, result2, result3);
var _b = { firstName: "Will", experience: 12 }, firstName = _b.firstName, experience = _b.experience;
console.log(firstName, experience);
