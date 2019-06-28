// [MORE INFO]: https://www.typescriptlang.org/docs/handbook/variable-declarations.html
// [MORE INFO]: https://www.typescriptlang.org/docs/handbook/functions.html
// [MORE INFO]: https://www.typescriptlang.org/docs/handbook/enums.html
// [MORE INFO]: https://www.typescriptlang.org/docs/handbook/type-inference.html
// [MORE INFO]: https://www.typescriptlang.org/docs/handbook/type-compatibility.html
// [MORE INFO]: https://www.typescriptlang.org/docs/handbook/advanced-types.html
// [MORE INFO]: http://2ality.com/2018/04/type-notation-typescript.html


// Enums allow us to define a set of named constants. Using enums can make it easier to document intent, or create a set of distinct cases. TypeScript provides both numeric and string-based enums.
enum Color {
  Gray, // 0
  Green = 100, // 100
  Blue = 2 // 2
}

let myColor: Color = Color.Blue;

enum messageResponse {
  No = 0,
  Yes = 1,
}

function respond(recipient: string, message: messageResponse): void {
  // ...
}

// just access any member as a property off of the enum itself, and declare types using the name of the enum:
respond("Princess Caroline", messageResponse.Yes)

// --- FUNCTIONS ---

// string - return string
function returnMyName(): string {
  return 'str';
}

// string
const returnFullName = (fName: string, lName: string): string => fName + ' ' + lName;

// void
function sayHello(): void {
  console.log('Hello!')
}


// return specified object properties type
function createSquare(config: { color: string, area: number }): { color: string; area: number } {
  // ...
  return { color: config.color, area: config.area};
}

createSquare({ color: "Yellow", area: 27 })

// default values
function keepWholeObject(wholeObject: { a: string, b?: number }) {
  let { a, b = 1001 } = wholeObject;
}

// arguments
function multiply(value1: number, value2: number): number {
  return value1 * value2;
}

// function types - order of arguments matter and its not really a function, function are also a types on their own
// this indicates which functions this variable will be able to hold, in this case multiply function
// in JS its assigning a named function into a variable as callback
let myMultiply: (val1: number, val2: number) => number; // function type assignment using fat arrow if no return type, just put void

myMultiply = multiply;
myMultiply(5, 2);

// object types - property names order matter
// - First we assign types
let userData: { name: string, age: number } = {
  // - Second we assign property
  name: "Barry",
  age: 25
};

// complex object
let complex: { data: number[], output: (all: boolean) => number[] } = {
  data: [100, 3.99, 10],

  output: function(ali: boolean): number[] {
    console.log(ali);
    return this.data
  }
};

console.log(complex.output(true));

// type aliases - reusable custom type
type Complex = { data: number[], output: (all: boolean) => number[] };

let complex2: Complex = {
  data: [100, 3.99, 10],

  output: function(all: boolean): number[] {
    console.log(all);
    return this.data
  }
};

type C = { a: string, b?: number };

function func({ a, b }: C): void {
  console.log(a, b)
}

func({ a: 'hello', b: 123 })

// union types - you may chain more than two types
let myRealRealAge: number | string;
myRealRealAge = '27';

// check types
let finalValue = 30;
if (typeof finalValue == "number") {
  console.log("Final Value is a number");
}

// never - function that never returns
function neverReturns(): never {
  throw new Error('An Error')
}

// The values null and undefined are not generally included in types, in TypeScript, undefined and null are handled by separate, disjoint types.
// By default null and undefined are subtypes of all other types. That means you can assign null and undefined to something like number.

let s = "foo";
// s = null; // Error: Type null is not assignable to type string

// You need a type union such as undefined|string and null|string, if you want to allow them.

let z: undefined | string = "hello";
z = undefined;

let w: null | number = null;
w = 123;



// ------ EXERCISES ------

// created reusable type
type BankAccount = { money: number, deposit: (val: number) => number };

// assign type
let bankAccount: BankAccount = {
  money: 2000,
  deposit: function(value: number): number {
    return this.money += value;
  }
}

// assign type for bankAccount
let mySelf: { name: string, bankAccount: BankAccount, hobbies: string[] } = {
  name: "Barry",
  bankAccount,
  hobbies: ["Sports", "Programming"]
}

mySelf.bankAccount.deposit(3000);

// Exercise 1 - Arrow function
const double1 = (value: number): number => value * 2;

console.log(double1(10));

// Exercise 2 - Default Params
const greet2: (name?: string) => void = (name: string = "Barry") => {
  if (name === undefined) { name = "Max"; }
  console.log("Hello, " + name);
};

greet2();
greet2("Anna");

// Exercise 3 - Spread Operator
var numbers: number[] = [-3, 33, 38, 5];
console.log(Math.min(...numbers));

// Exercise 4 - Rest Operator
var newArray: number[] = [55, 20];
newArray.push(...numbers);
console.log(newArray);

// Exercise 5 - Array Type Destructuring
var [result1, result2, result3]: number[] = [3.89, 2.99, 1.38];
console.log(result1, result2, result3);

// Exercise 6 - Object Type Destructuring

type Scientist = {
  firstName: string,
  experience: number
}

var { firstName, experience }: Scientist = {firstName: "Will", experience: 12};
console.log(firstName, experience);




// ----- Function Overloads -----

let suits = ["hearts", "spades", "clubs", "diamonds"];

// This syntax of object type seems cringe 'cause of semicolon, As of TypeScript 1.6 or so, you can now use either , or ; as a delimiter in interface declarations or anonymous object types! The team decided that the flexibility to use one or the other outweighed the concerns

function pickCard(x: { suit: string; card: number; }[]): number;
function pickCard(x: number): { suit: string; card: number; };

// Note that the function pickCard(x): any piece is not part of the overload list, so it only has two overloads: one that takes an array of object and one that takes a number. Calling pickCard with any other parameter types would cause an error.
// [MORE INFO]: https://stackoverflow.com/questions/27994253/why-is-the-separator-in-a-typescript-typememberlist-semicolon-as-opposed-to-comm

// @ts-ignore for x
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);

