// [MORE INFO]: https://www.typescriptlang.org/docs/handbook/advanced-types.html

// MODULE: 1. Intersection Types (&) combines multiple types into one.
// This allows you to add together existing types to get a single type that has all the features you need.
// You will mostly see intersection types used for mixins and other concepts that don’t fit in the classic object-oriented mold.
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
    // [MORE INFO]: https://basarat.gitbooks.io/typescript/content/docs/types/type-assertion.html
    // [MORE INFO]: https://stackoverflow.com/questions/42551681/typescript-what-is-mean-this-as-any
    // [MORE INFO]: https://acdcjunior.github.io/typescript-cast-object-to-other-type-or-instanceof.html
    // explicity cast/assert any
    // ({ name: "jim" })["name"]
    (result as any)[id] = (<any>first)[id]; // ?
  }

  for (let id in second) {
      if (!result.hasOwnProperty(id)) {
        (<any>result)[id] = (<any>second)[id]; // ?
      }
  }

  return result;
}

class Person2 {
  constructor(public name: string) { }
}

interface Loggable {
  log(): void;
}

class ConsoleLogger {
  public log() {
      console.log('This is console logger')
  }
}

var jim = extend(new Person2("Jim"), new ConsoleLogger()); // ?
(<any>jim).log


// MODULE: 2. Union Types. A union type describes a value that can be one of several types. We use the vertical bar (|) to separate each type.

interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

// Union types can be a bit tricky here, but it just takes a bit of intuition to get used to. If a value has the type A | B, we only know for certain that it has members that both A and B have. In this example, Bird has a member named fly. We can’t be sure whether a variable typed as Bird | Fish has a fly method. If the variable is really a Fish at runtime, then calling pet.fly() will fail.

function getSmallPet(): Fish | Bird {
  // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors