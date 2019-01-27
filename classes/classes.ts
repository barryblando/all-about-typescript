// [MORE INFO]: https://www.typescriptlang.org/docs/handbook/classes.html
// [MORE INFO]: https://www.typescriptlang.org/docs/handbook/type-compatibility.html

// ---- CLASSES ----

class Person {
  // class properties
  name: string;
  private typeF: number; // within the class
  protected age: number; // up to extended class

  constructor(name: string, public username: string, typeF: number, age: number = 25) {
    this.name = name;
    this.typeF = typeF;
    this.age = age;
  }

  printAge(): void {
    console.log(this.age);
    this.setType(this.typeF)
  }

  private setType(typeF: number) {
    if (typeF === 3) console.log("Old Guy");
  }
}

// Inheritance
// - Derived classes are often called subclasses, and base classes are often called superclasses.

class Barry extends Person {
  // name = "Barry"

  constructor(username: string, typeF: number) {
    super("Barry", username, typeF);
    this.age = 31;
    // console.log(this.typeF); // can't access typeF only accessible on Person
  }
}

// Class as "Type"

class Animal2 {
  name: string;
  constructor(theName: string) { this.name = theName; }
  move(distanceInMeters: number = 0) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal2 {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 5) {
      console.log("Slithering...");
      super.move(distanceInMeters);
  }
}

class Horse extends Animal2 {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 45) {
      console.log("Galloping...");
      super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python"); // ?
let tom: Animal2 = new Horse("Tommy the Palomino"); // ?

// Note that even though tom is declared as an Animal, since its value is a Horse,
// calling tom.move(34) will call the overriding method in Horse
sam.move();
tom.move(34);

// Getter & Setters / Accessors
// - control access to your properties and making sure that certain criteria are met before returning/assigning a value
// - when using it you don't call it like a method, you call it as property
// - accessors with a get and no set are automatically inferred to be readonly.
//   This is helpful when generating a .d.ts file from your code, because users of your property can see that they can’t change it.

class Plant {
  // underscore(_)name coding style for private property
  private _species: string = "Default";

  get species() {
    return this._species;
  }

  set species(value: string) {
    if(value.length > 3) {
      this._species = value;
    }

    this.species;
  }
}

let plant = new Plant();

plant.species = "Green" // ?
plant.species // ?

// Static Properties & Methods - useful for utility / helper class tools
class Helpers {
  // static means property/method can be access outside of class without instantiating the class or do instance of it
  static PI: number = 3.14

  static calcCircumference(diameter: number): number {
    return this.PI *  diameter;
  }
}

2 * Helpers.PI // ?
Helpers.calcCircumference(8) // ?

// Abstract Classes
// - cannot be instantiated directly but to be extend only
// - use if you want to bundle some general functionality or logic in these abstract base classes

abstract class Project {
  projectName: string = "Default";
  budget: number = 2;

  // abstract method - defined first in abstract class but the logic statement will be done/implemented in derived classes
  abstract changeName(name: string): void;

  calcBudget() {
    return this.budget * 2;
  }
}

class ITProject extends Project {
  changeName(name: string): void {
    this.projectName = name;
  }
}

let newITProject = new ITProject();
newITProject.changeName("ABE Construction");
newITProject // ?

// Private constructor
// Singleton - setup a class where you only want to have one instance during runtime
class OnlyOne {
  private static instance: OnlyOne;
  // readonly properties - This allows you to work in a functional way (unexpected mutation is bad)
  public readonly name: string;

  private constructor(name: string) {
    this.name = name;
  }

  static getInstance() {
    if(!OnlyOne.instance) {
      OnlyOne.instance = new OnlyOne('The Only One');
    }
    return OnlyOne.instance;
  }
}

// let wrong = new OnlyOne('The OnlyOne'); // can't be instantiated 'cause constructor is private
let right = OnlyOne.getInstance(); // Once instantiated, no more 'new' keyword for its class


// Parameter Properties for readonly
// - Parameter properties let you create and initialize a member in one place
// - no need to initialize at their declaration - like numberOfLegs
// - put directly on constructor parameter
class Octopus {
  readonly numberOfLegs: number = 8;
  constructor(readonly name: string) {
  }
}

const oct = new Octopus("KickAss"); // ?

// ---- EXERCISES ----

// Exercise 1 - Class
class Car {
  name: string;
  acceleration: number = 0;

  constructor(name: string) {
    this.name = name;
  }

  honk() {
    console.log('Tooooot!');
  }

  accelerate(speed: number) {
    this.acceleration = this.acceleration + speed;
  }
}

const carInstance = new Car("BMW");
carInstance.honk();
console.log(carInstance.acceleration);
carInstance.accelerate(20);
console.log(carInstance.acceleration);

// Exercise 2 - Inheritance
class BaseObject {
  // public class properties, you can omit public keyword
  width = 0;
  length = 0;
}

class Rectangle extends BaseObject {
  calcSize() {
    return this.width * this.length
  }
}

const rectangleInstance = new Rectangle();
rectangleInstance.width = 5;
rectangleInstance.length = 10;
rectangleInstance.calcSize();

// Exercise 3 - Getters & Setters
class PersonGetterSetter {
  private _firstName: string = "";

  get firstName() {
    return this._firstName
  }

  set firstName(value: string) {
    if (value.length > 3) {
      this._firstName = value;
    } else {
      this._firstName = "";
    }
  }
}

const personInstance = new PersonGetterSetter();

personInstance.firstName = "He";
personInstance.firstName // ?
