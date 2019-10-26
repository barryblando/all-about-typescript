interface PersonDM {
  name: string;
}

interface PersonDM {
  age: number;
}

interface PersonDM {
  height: number;
}

class Employee implements PersonDM {
  name = "Mensah"
  age = 100;
  height = 40
}

// Since all the interfaces were declared with the same name, `Person`, they are merged into one definition so the `Employee` class contains the properties from all the interfaces.

const employee = new Employee();
console.log(employee) // {name: "Mensah", age: 100, height: 40}

// MODULE: Same property names in interfaces (functions)
// When the elements in the merged interfaces are functions and they have the same name, they are overloaded, that is, depending on the type of argument passed, the appropriate function will be called.

interface PersonDM2 {
  // @ts-ignore
  speak(words: string)
}

interface PersonDM2 {
  // @ts-ignore
  speak(words: number)
}

const personDM: PersonDM2 = {
  speak: (wordsOrNum: string | number) => wordsOrNum
}

console.log(person.speak("Hi")) // speak(words: string) is used
console.log(person.speak(2)) // speak(words: number) is used

// When interfaces containing same-signature functions are merged, the functions in the last declared interfaces appear at the top of the merged interface and the functions declared in the first interface appear beneath.

interface PersonDM3 {
  speak(words:string): string;
}

interface PersonDM3 {
  speak(words: any): any;
}

interface PersonDM3 {
  speak(words: number): number;
  speak(words: boolean): boolean;
}

// This is how the final merged interface looks like
interface PersonDM3 {
  // functions in the last interface appear at the top
  speak(words: number): number;
  speak(words: boolean): boolean;

  // function in the middle interface appears next
  speak(words: any):number;

  // function in the first interface appears last
  speak(words: string):string;
}

// The reason for this is, is that later interfaces declared have a higher precedence over the initial interfaces declared. So in our example above, speak(words: string) will never be called because in the final merged Person interface, speak(words: any):number comes before speak(words: string):string and since any can stand for any type, it gets called even if a string is passed as an argument.

// To prove this, when you hover over the per variable in the code below, it will display const per: number and not const per: string even though we are passing in a string argument.

const per = personDM.speak("bacon");

// This is true for all interfaces expect when the same name functions parameters have a string literal as a type. It follows the same order described above but functions with string literal types are given a higher precedence and therefore appear at the top.

// It’s worth noting that, the string literals in later interfaces will appear before the initial interfaces like explained above.

interface Person {
  speak(words: number): number;
  speak(words: "World!"): string; // string literal type
}

interface Person {
  speak(words: "Hello"): string; // string literal type
}

interface Person {
  speak(words: string): string;
}


// merged interface output.
interface Person {
  // string literals are given precedence
  speak(words: "Hello"): string;
  speak(words: "World!"): string;

  // the rest of the functions are arranged using the same rules.
  speak(words: string): string;
  speak(words: number): number;
}