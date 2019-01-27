// [MORE INFO]: https://www.typescriptlang.org/docs/handbook/interfaces.html
// [MORE INFO]: https://www.typescriptlang.org/docs/handbook/type-compatibility.html

// Also NOTE: Interface-as-records: A fixed amount of properties that are known at development time. Each property can have a different type.

// interface is a contract signed by an object which have certain property / methods that been agreed
// - guarantee your code that certain property or methods setup in the interface are available

// It’s worth pointing out that the type-checker does not require that these properties come in any sort of order,
// only that the properties the interface requires are present and have the required type.
interface NamedPerson {
  readonly firstName: string; // signatures readonly in order to prevent assignment to their indices
  // (?) means optional, Not all properties of an interface may be required. Some exist under certain conditions or may not be there at all.
  age?: number;
  // string index signature if you’re sure that the object can have some extra properties that are used in some special way
  // where you don't know how they might be named at the time of creation
  [propName: string]: any;
  greet(lastName: string): void
  insurgent?(name: string): void
}

function greetPerson(person: NamedPerson): void {
  console.log("Hello, " + person.firstName);
}

function changeName(person: NamedPerson) {
  // person.firstName = "Shamina"; // error! cannot be changed, readonly
  console.log("Sorry your name can't be changed, " + person);
}

const person: NamedPerson = {
  firstName: "Barry",
  age: 24,
  hobbies: ["Cooking", "Competitive Gaming"],
  greet(lName: string) {
    console.log("Hi, I am" + this.firstName + " " + lName);
  }
}

// greetPerson({ firstName: "Barry" });
changeName(person)
greetPerson(person);

// if you want an interface with dynamic property with value of number only
interface IntOnly {
  [propName: string]: number
}

function greetInt(num: IntOnly) {
  return num.age;
}

greetInt({ age: 23 })





// ------ Indexable Types ------

interface StringArray {
  // This index signature states that when a StringArray is indexed with a number, it will return a string
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

// There are two types of supported index signatures: string and number. It is possible to support both types of indexers, but the type returned from a numeric indexer must be a subtype of the type returned from the string indexer. This is because when indexing with a number, JavaScript will actually convert that to a string before indexing into an object. That means that indexing with 100 (a number) is the same thing as indexing with "100" (a string), so the two need to be consistent.

class Animal {
  // name: string;
}
class Dog extends Animal2 {
  // breed: string;
}

// Error: indexing with a numeric string might get you a completely separate type of Animal!
interface NotOkay {
  [x: number]: Animal2;
  [x: string]: Dog;
}

// While string index signatures are a powerful way to describe the “dictionary” pattern, they also enforce that all properties match their return type.

interface NumberDictionary {
  [index: string]: number;
  length: number;    // ok, length is a number
  // name: string;      // error, the type of 'name' is not a subtype of the indexer
}

// Finally, you can make index signatures readonly in order to prevent assignment to their indices:

interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArrayReadonly: ReadonlyStringArray = ["Alice", "Bob"];
// myArrayReadonly[2] = "Mallory"; // error!, because the index signature is readonly





// ------ Interface for an Array of Objects ------
interface Hero {
  id: number
  name: string
  localized_name: string
  primary_attr: string
  attack_type: string
  roles: string[]
  legs?: number
}

function heroAtt(hero: Hero[]): void {
  console.log(hero)
}

const heroCharacteristic: Hero[] = [
  {
    id: 1, name: "Barry",
    localized_name: "Retr0_0x315",
    primary_attr: "Strength",
    attack_type: "One Punch",
    roles: ["Support", "Captain"]
  },
  {
    id: 2,
    name: "Alyssa",
    localized_name: "AllInfinity31",
    primary_attr: "Intelligence",
    attack_type: "Shock Wave",
    roles: ["Mechanic", "Healer"]
  },
];

heroAtt(heroCharacteristic);





// ----- Classes with Interface ------
// with implements, means that you should implement what's required property on NamedPerson inside the class
// explicitly enforcing that a class meets a particular contract
class PersonWithInterface implements NamedPerson {

  firstName: string;

  constructor (fName: string) {
    this.firstName = fName;
  }

  greet(lName: string) {
    console.log("Hi, I am" + this.firstName + " " + lName);
  }
}

const myPersonInstance = new PersonWithInterface("Barry");
greetPerson(myPersonInstance);

// ----- Complex Class Interface implementation -----

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  hours: number;
  minutes: number;

  constructor(h: number, m: number) {
    this.hours = h;
    this.minutes = m;
  }

  tick() {
      console.log("beep beep");
  }
}

class AnalogClock implements ClockInterface {
  hours: number;
  minutes: number;

  constructor(h: number, m: number) {
    this.hours = h;
    this.minutes = m;
   }
  tick() {
      console.log(this.hours, this.minutes )
      console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);





// ----- Function Types with Interface ------
interface DoubleValueFunc {
  (number1: number, number2: number): number
}

let myDoubleFunction: DoubleValueFunc;
myDoubleFunction = function(num1: number, num2: number) {
  return (num1 + num2) * 2
}

myDoubleFunction(10, 20) // ?

// Implicit Interfaces
interface Book {
  title: string;
  publisher: string;
  price: number;
  pages?: number;
}

// Below is an example of implicit conversion of an anonymous object to an interface.

function getBooks(): Array<Book> {
  return [
      {title: 'Title1', publisher: 'Publisher1', price: 100, pages: 100},
      {title: 'Title2', publisher: 'Publisher2', price: 200, pages: 50},
      {title: 'Title3', publisher: 'Publisher3', price: 300, pages: 200}
  ];
}

// The above^ code allows the returned objects to identify as Book objects because of the implicit implementation of the Book interface.





// ----- Interface Inheritance ------
// Like classes, interfaces can extend each other. This allows you to copy the members of one interface into another,
// which gives you more flexibility in how you separate your interfaces into reusable components.
interface AgedPerson extends NamedPerson {
  age: number // now age is required when you use AgePerson as type, polymorphism
}

const oldPerson: AgedPerson = {
  age: 24,
  firstName: "Barry",
  greet(lName: string) {
    console.log("Hello, " + lName)
  }
}

oldPerson // ?


// An interface can extend multiple interfaces, creating a combination of all of the interfaces.
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;





// ----- Hybrid Types -----
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) { start };
  counter.interval = 123;
  counter.reset = function () { };
  return counter; // ?
}

let c = getCounter(); // ?
c(10);
c.reset();
c.interval = 5.0;