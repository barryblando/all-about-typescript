// [MORE INFO]: https://www.typescriptlang.org/docs/handbook/generics.html
// [MORE INFO]: https://www.typescriptlang.org/docs/handbook/type-compatibility.html

// Generics is use to create a component that can work over a variety of types rather than a single one.
// This allows users to consume these components and use their own types.

// T means type variable, a special kind of variable that works on types rather than values
// This T allows us to capture the type the user provides (e.g. number, string, boolean), and then use it to denote what is being returned

// Type variables and generic types
// With static typing, you have two levels:
// - Values exist at the object level.
// - Types exist at a meta level.

// Similarly:
// - Normal variables exist at the object level.
// - There are also type variables, which exist at the meta level. They are variables whose values are types.

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

// The second way is also perhaps the most common. Here we use type argument inference – that is, we want the compiler to set the value of T for us automatically based on the type of the argument we pass in omit the type parameter
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

// We could also have used a different name for the generic type parameter in the type, so long as the number of type variables and how the type variables are used line up.
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
  return Promise.all<Player>([
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






// MODULE: Generic Interface

interface Stack<T> {
  push(x: T): void;
  pop(): T;
}

// Stack is a stack of values that all have a given type T. You must fill in T whenever you mention Stack.
// Method .push() accepts values of type T.
// Method .pop() returns values of type T.

const dummyStack: Stack<number> = {
  push(x: number) {},
  pop() { return 123 },
};

// Practical Generic Interface

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
// Generic Class with extending a base type(s), a "Generic Constraint"

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

// Practical Generic Constraints

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

// you can omit <Type Argument> as long as instance has the constraint
let ccc =  new CCC<BlueCroc>({ personality: "ultra cheesy", color: "blue" });




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
