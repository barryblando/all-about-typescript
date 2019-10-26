// [MORE INFO]: https://www.typescriptlang.org/docs/handbook/generics.html
// [MORE INFO]: https://www.typescriptlang.org/docs/handbook/type-compatibility.html
// [MORE INFO]: https://medium.com/better-programming/typescript-generics-90be93d8c292

// MODULE: When to Use Generics?
// Generics give us great flexibility for assigning data to items in a type-safe way, but should not be used unless such an abstraction makes sense, that is, when simplifying or minimizing code where multiple types can be utilized.

// Viable use cases for generics are not far reaching; you will often find a suitable use case in your codebase here and there to save repetition of code — but in general there are two criteria we should meet when deciding whether to use generics:

// - When your function, interface or class will work with a variety of data types
// - When your function, interface or class uses that data type in several places

// It may well be the case that you will not have a component that warrants using generics early on in a project. But as the project grows, a component’s capabilities often expand. This added extensibility may well eventually adhere to the above two criteria, in which case introducing generics would be a cleaner alternative than to duplicate components just to satisfy a range of data types.

// T means type variable, a special kind of variable that works on types rather than values
// This T allows us to capture the type the user provides (e.g. number, string, boolean), and then use it to denote what is being returned

// Type variables and generic types
// With static typing, you have two levels:
// - Values exist at the object level.
// - Types exist at a meta level.

// Similarly:
// - Normal variables exist at the object level.
// - Type variables exist at the meta level. They are variables whose values are types.

// Normal variables are introduced via const, let, etc. Type variables are introduced via angle brackets (< >). For example...

// Basic Syntax for generic function: function [identifierName]<TypeVariable>(...args): [ReturnType] { ... }
function genericEcho<T>(data: T): T {
  return data;
}

// Once we’ve written the generic identity function, we can call it in one of two ways.

// The first way is to pass all of the arguments, including the type argument,
// to the function (This is needed when compiler fails to infer the type):
genericEcho<{ name: string; age?: number }>({ name: "Barry", age: 24 }); // ?
genericEcho<number>(27) // ?

// The second way is also perhaps the most common. Here we use type argument inference – that is, we want the compiler to set the value of T for us automatically based on the type of the argument we passed in, omit the type parameter
genericEcho("Barry") // ?

// Built-in Generics

// Array, generic type by default
const testResult: Array<number> = [1.94, 1.33];

// Arrays
function printAll<T>(args: Array<T>) {
  args.forEach(el => console.log(el));
}

printAll<string>(["Apple", "Banana"]);

// MODULE: Generic Types

// assigning generic type to a normal constant making this type assignment
const echo2: <T>(data: T) => T = genericEcho;
echo2<string>("Hello World!");

// The type of generic functions is just like those of non-generic functions, with the type parameters listed first, similarly to function declarations:
function identity1<T>(arg: T): T {
  return arg;
}

let myIdentity1: <T>(arg: T) => T = identity1;

// We could also have used a different name for the generic type parameter in the type, as long as the number of type variables and how the type variables are used line up.
function identity2<T>(arg: T): T {
  return arg;
}

let myIdentity2: <U>(arg: U) => U = identity2;

// We can also write the generic type as a call signature of an object literal type:
function identity3<T>(arg: T): T {
  return arg;
}

let myIdentity3: {<T>(arg: T): T} = identity3;

// Which leads us to writing our first generic interface. Let’s take the object literal from the previous example and move it to an interface:
interface GenericIdentityFn {
  <T>(arg: T): T;
}

function identity4<T>(arg: T): T {
  return arg;
}

let myIdentity4: GenericIdentityFn = identity4;


// Generic with custom types P.S change target back to es5 on tsconfig after doing this Promise-based

type Player = {
  name: string,
  age: number,
  position: "STRIKER" | "GOALKEEPER"
};

type F = () => Promise<Array<Player>>;

const f1: F = () => {
  return Promise.all([
      {
          name: "David Gomes",
          age: 23,
          position: "GOALKEEPER",
      }, {
          name: "Cristiano Ronaldo",
          age: 33,
          position: "STRIKER",
      }
  ]);
};

f1() // ?

// EXERCISE: Difference, INFO: about declaring https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html

// First is a generic function, T is decided by the caller,
type FP1 = <T>(arg: T) => T;

declare const fn1: FP1;
fn1<number>(1);
fn1<string>(""); 

// Second is a generic type that happens to be a function, T is decided when you instantiate the type. 
type FP2<T> = (arg: T) => T;

declare const fn2: FP2<number>;
fn2(1); //ok
// fn2(""); //err

// MODULE: Generic Interface

interface Stack<T> {
  arrNum?: number[]
  push(x: T): void
  pop(): T
}

// Stack is a stack of values that all have a given type T. You must fill in T whenever you mention Stack.
// Method .push() accepts values of type T.
// Method .pop() returns values of type T.

const dummyStack: Stack<number> = {
  arrNum: [],
  push(x: number) {
    this.arrNum.push(x);
  },
  pop() { return this.arrNum },
};

// MODULE: Practical Generic Interface

// This is an interface for an Array whose elements are of type T that we have to fill in whenever we use this interface
interface ArrayGen<T> {
  // method .concat() has zero or more parameters (defined via the rest operator). Each of those parameters has the type T[]|T. That is, it is either an Array of T values or a single T value.
  concat(...items: Array<T[] | T>): T[];
  // method .reduce() introduces its own type variable, U. U expresses the fact that the following entities all have the same type (which you don’t need to specify, it is inferred automatically):
  // - Parameter state of callback() (which is a function)
  // - Result of callback()
  // - Optional parameter firstState of .reduce()
  // - Optional parameter firstState of .reduce()
  // - Result of .reduce()
  reduce<U>(
    // callback also gets a parameter element whose type has the same type T as the Array elements, a parameter index that is a number and a parameter array with T values
    callback: (state: U, element: T, index: number, array: T[]) => U,
    firstState?: U): U;
}

class StringClass<T extends ArrayGen<T>> { }

// Maps are typed generically in TypeScript. For example:

const myMap: Map<boolean,string> = new Map([
  [false, 'no'],
  [true, 'yes'],
]);




// MODULE: Generic Classes. NOTE: that it is not possible to create generic enums and namespaces.

// NOTE: Generic Class with extending a base type(s), a "Generic Constraint"
// INFO: Sometimes a generic type will require that certain properties exists on that type tied to it
class SimpleMath<T extends number | string, U extends number | string> {
  baseValue: T ;
  multiplyValue: U;

  constructor(baseValue: T, multiplyValue: U) {
    this.baseValue = baseValue;
    this.multiplyValue = multiplyValue;
  }

  calculate(): number {
    return +this.baseValue * +this.multiplyValue
  }
}

const simpleMath = new SimpleMath<string, number>("10", 20);
simpleMath.calculate() // ?

// MODULE: Generic working w/ Objects
const makeFullName = <T extends { firstName: string; lastName:  string }>(obj: T) => {
  return {
    ...obj,
    fullName: obj.firstName + ' ' + obj.lastName
  }
}

const v5 = makeFullName({ firstName: "bob", lastName: "junior", age: 15 })


// MODULE: Generic extending a Class
class Programmer {

    // NOTE: The constructor here uses automatic constructor parameter assignment, 
    // a feature of Typescript that assigns class properties directly from constructor arguments.
    constructor(public fName: string,  public lName: string) { }
}

function logProgrammer<T extends Programmer>(prog: T): void {
    console.log(`${ prog.fName} ${prog.lName}` );
}

const programmer = new Programmer("Shamina", "Alyssa");
logProgrammer(programmer); // > Shamina Alyssa

// MODULE: Practical Generic Constraints incl. Interface - Using constraints to ensure type properties exist

// Sometimes we may wish to limit the amount of types we accept with each type variable — and as the name suggests — that is exactly what generic constraints do. Sometimes a generic type will require that certain properties exists on that type. Not only this, the compiler will not be aware that particular properties exist unless we explicitly define them to type variables.

// Instead of working with any and all types, we’d like to constrain this function to work with any and all types that also have the other property. As long as the type has this member, we’ll allow it, but it’s required to have at least this member. To do so, we must list our requirement as a constraint on what T can be and then we’ll use this interface and the extends keyword to denote our constraint:

interface Crocodile { personality: string; }
interface Taxes { year: number; }
interface Container<T> { unit: T }

let crocContainer: Container<Crocodile> = { unit: { personality: "mean" } };
let taxContainer: Container<Taxes> = { unit: { year: 2011 } };

interface RedCroc extends Crocodile { color: "red"; }
interface BlueCroc extends Crocodile { color: "blue"; }
interface CrocContainer<T extends Crocodile> { crocUnit: T; }

let redCrocContainer: CrocContainer<RedCroc> = { crocUnit: { personality: "irate", color: "red" } }
let blueCrocContainer: CrocContainer<BlueCroc> = { crocUnit: { personality: "cool", color: "blue" } }

class ClassyContainer<T extends Crocodile> {
  classCrocUnit: T;
  constructor(classCrocUnit: T) {
    this.classCrocUnit = classCrocUnit
  }
}

// when you don't pass RedCroc as Type Argument then class will use generic constraint which is Crocodile
let classyCrocContainer = new ClassyContainer<RedCroc>({ personality: "classy", color: "red" });

class CCC<T extends Crocodile> {
  constructor(public cccUnit: T) {}
}

// you can omit <Type Argument> as long as class has the generic constraint
let cccInstance =  new CCC<BlueCroc>({ personality: "ultra cheesy", color: "blue" });




// ----- Exercise -----

class MyMap<T extends number | string> {
  private _map: { [key: string]: T } = {}

  setItem(key: string, item: T) {
    this._map[key] = item;
  }

  getItem(key: string) {
    return this._map[key];
  }

  clear() {
    this._map = {};
  }

  printMap() {
    console.log(this._map);
  }

}

const numberMap = new MyMap<number>();
numberMap.setItem('apples', 5);
numberMap.setItem('bananas', 10);
numberMap.getItem('bananas') // ?
numberMap.printMap() // ?

const stringMap = new MyMap<string>();
stringMap.setItem('name', "Max");
stringMap.setItem('age', "27");
stringMap.getItem('age') // ?
stringMap.printMap() // ?
