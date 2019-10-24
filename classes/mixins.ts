// In TypeScript, we can’t inherit or extend from more than one class but Mixins helps us to get around that.

// Mixins create `partial` classes which we can combine to form a single class that contains all the methods and properties from the partial classes.

// Say we have two classes, Car and Lorry which contain the drive and carry methods respectively and we want to create a third class called Truck. A truck should contain both drive and carry methods but we can only extend one class in TypeScript. To solve this, we can use mixins:

export class Car {
  drive(name:string) {
    console.log(`This ${name} can drive very fast`);
  }
}

export class Lorry {
  carry(weight:number) {
    console.log(`This vehicle can carry ${weight} kg`);
  }
}

// export class Truck extends Car, Lorry {} // error: Classes can only extend a single class

// NOTE: To create a mixin, we’ll take advantage of two functionalities of TypeScript:
// Interface class extension
// Declaration merging

// MODULE: Interface class extension
// Unlike classes, interfaces can extend multiple classes in TypeScript. 
// When an interface extends a class, it extends only the members of the class but not their implementation because interfaces don’t contain implementations.

interface ClassB {}
interface ClassC {}

interface A extends ClassB, ClassC {}

// MODULE: Declaration Merging
// When two or more declarations are declared with the same name, TypeScript merges them into one.

interface Alligator {
  eyes: number;
  nose: number;
}

interface Alligator {
  tail: number;
}

// contains properties from both Alligator interfaces
const gator: Alligator = {
    eyes: 2,
    nose: 1,
    tail: 1
};

// By leveraging these two functionalities in TypeScript, we can create an interface with the same name as Truck and extend both the Car and Lorry classes:

export class Truck {}
export interface Truck extends Car, Lorry {}

// Due to declaration merging, the Truck class will be merged with the Truck interface. 
// This means that, the Truck class will now contain the function definitions from both Car and Lorry classes. 
// Remember, just the definitions not the implementation because once again, interfaces don’t contain implementations.

// To enable the Truck class to have implementations of the functions inherited from Car and Lorry, we’ll use a helper function found in the TypeScript docs.

// The function takes the name of the class to which we want to copy the implementations to as the first argument, which in our case is Truck 
// and takes an array of classes from which we want to copy the implementations as the second argument, which in our case is Car and Lorry.

// the helper function
function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      // @ts-ignore
      Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
    });
  });
}

applyMixins(Truck, [Car, Lorry]); // Now, we can access the methods in Car and Lorry from a truck object.

const truck = new Truck()
truck.drive("truck"); // This truck can drive very fast
truck.carry(10); // This vehicle can carry 10 kg