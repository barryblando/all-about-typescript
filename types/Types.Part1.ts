// MODULE: Basics
// everything after colon and before equal sign is a type assignment/annotation

const a: string = "foo";
const b = 1;
const c = false;
const d = [1, 2, 3];
const e = ["a", "b", "c"];
const f = { id: 1 };
const g = null;
const h = undefined;

// `const a : string = "foo"` (ok)
// ---------------------------------------------------------------------
// `const a : number = "foo"` // !Error
// We will get the following error:
// Type '"foo"' is not assignable to type 'number'.
// ---------------------------------------------------------------------
// So assign the type for learning purposes. In reality you would rely on type inference.
// there are several places where type inference is used to provide type information when there is no explicit type annotation.

let x = 3;

// ^ The type of the x variable is inferred to be number. This kind of inference takes place when initializing variables and members, setting parameter default values, and determining function return types.

const aTyped: string = 'foo'
const bTyped: number = 1
const cTyped: boolean = false

// The first three are relatively clear. But how do we type d?

const dTyped1: number[] = [1, 2, 3]
// or
const dTyped2 : Array<number> = [1, 2, 3]

const eTyped: Array<string> = ["a", "b", "c"];
const fTyped1: Object = { id: 1 };
// or better
const fTyped2: { id: number } = { id: 1 };
const gTyped: null = null

// What about undefined?
// In TypeScript you can use the undefined type to declare a value as undefined.

const hTyped : undefined = undefined;

// MODULE: Any Vs. Unknown

// Sometimes you can't tell what the exact type is or you are currently converting from an existing non-typed code base gradually.
// Here is where any and unknown are helpful. It's important to note that they fulfill different purposes.
// any should be used as a last resort, as it skips type checking.
// In contrast unknown is useful when you can't be sure what the input type, as the name already implies, is. Check the following example:

const double = (input: unknown) => {
  if (typeof input === 'string') {
    return input + ' - ' + input
  }
  if (Array.isArray(input)) {
    return input.concat(input)
  }
  return input
}

const result = double('foo') // ok

// We need to refine the input by checking the type and then returning an appropriate value else the compiler will complain.
// With any we completely bypass the type checker. We can pass in any value to length and will never receive an error. As already mentioned use any as a last resort if possible!

const lengthT = (input: any) => {
  if (typeof input === "string") {
    return input.length;
  }

  if (Array.isArray(input)) {
    return input.length;
  }

  return 0;
};

lengthT("foo");
lengthT([1, 2, 3, 4]);
lengthT(1); // no Error!

// MODULE: Optional Values

// Sometimes we want a certain value to be optional. For example take a look at the following function:

const optionalLength = (input?: string | Array<any>) => {
  if (typeof input === "string") {
    return input.length;
  }

  if (Array.isArray(input)) {
    return input.length;
  }

  return false;
};

optionalLength();
optionalLength(undefined);
optionalLength([1, 2, 3, 4]);
optionalLength("foo");

// As we can see, we can call optionalLength with undefined, an array or a string.
// But as you would expect, passing in a number would cause an error.

// - optionalLength(1) // !Error

// Also passing in null will result in an error:

// - optionalLength(null); // !Error We need to be explicit about null

// To fix this we need to change the type signature to expect null: const optionalLength = (input?: string | Array<any> | null) => {};



// MODULE: Functions

// Now that we have covered the very basics, it's time to get more advanced. We have already seen a couple of functions in the previous section, but let's take a more detailed look at Function types. First off all, we would like to type the input and output of a function, so let's see how this is done.

let add = (a: number, b: number): number => {
  return a + a;
};

add(2, 2);
// add(2, "a"); // Error!
const addResult: number = add(2, 2);

// Function as literal type
const greet: (name?: string) => void = (name: string = "Barry") => {
  if (name === undefined) { name = "Max"; }
  console.log("Hello, " + name);
};

greet();
greet("Anna");

// MODULE: Arrays
// There are two ways to type an array: Array<Type> or Type[]. So f.e. these two are equivalent:

const aArray : Array<number> = [1, 2, 3]
const aArrayShortHand : number[] = [1, 2, 3]

// SPREAD
Math.max(...aArray);

// REST
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");

// What if we might have a null value inside our array. The answer is very similar to
// what we have seen in the Optional section. We need to be explicit about null or undefined in this specific case.

const aOptionalArray: Array<number | null | undefined> = [
  1,
  null,
  2,
  undefined
];

const aOptionalArrayShortHand: (number | null | undefined)[] = [
  1,
  null,
  2,
  undefined
];

// What if we want to be more specific with our array definition?
// Take the following example:
// We have an array consisting of exactly three items, in short a tuple containing a string, a number and another string: ['foo', 1, 'bar'].

const tupleA: [string, number, string] = ["foo", 1, "bar"];
// const tupleB: [string, number, number] = ["foo", 1, "bar"]; // !Error

// Another important aspect is that once you have a tuple defined, you can still use any of the existing Array methods which mutate the array. The compiler will not complain as opposed to Flow, where the compiler would complain.

tupleA.push("foobar");
// tupleA.push(null); // !Error

// So once you define a tuple you can push any type that exists inside the tuple. For example pushing a null into a tuple that expects either string or number results in an error:

// ---------------------------------------------------------------------------------
// Argument of Type 'null' is not assignable to parameter of type 'string | number'.
// ---------------------------------------------------------------------------------

// Let's take a look at traditional arrays:

const bArray: Array<number> = [1, 2, 3];
bArray.push(4);
// bArray.push("foo"); // Error!

// We can see similar results as in the previous tuple example. It's possible to push into an existing array, as long as the types match. For example pushing a string "foo" into an array of numbers would result in the following error:

// ---------------------------------------------------------------------------------
// Argument of Type '"foo"' is not assignable to parameter of type 'number'.
// ---------------------------------------------------------------------------------

// Another example for tuples is the result of Object.entries(obj): an Array with one [key, value] pair for each property of obj.

const obj: Array<[string, any]> = Object.entries({ a:1, b:2 })

// MODULE: Objects

const aObject: Object = { id: 1, name: "foo" };
// const bObject: { id: number } = { id: 1, name: "foo" }; // !Error

// We need to be explicit about the type definition.
// ---------------------------------------------------------------------------------
// Type '{id: number; name: string;}' is not assignable to type '{id: number;}'.
// ---------------------------------------------------------------------------------

const cObject: { id: number; name: string } = { id: 1, name: "foo" };
// const dObject : {id: number, name: string, points: number} = {id: 1, name: 'foo'} // !Error

// dObject will cause an error as points is not defined. We want to make points optional.
// We've already seen how to make a value optional, so let's see how to achieve the same for an object property.

const dRefinedObject : {id: number, name: string, points?: number} = {id: 1, name: 'foo'}

// By declaring points?: number, we are saying that points might not be defined. To make things more readable,you will probably resort back to defining a type alias for the object declaration. This is especially helpful if you also plan to reuse a type definition.

type E = { id: number; name: string; points?: number };
const eObject: E = { id: 1, name: "foo" };

// Another important thing to note when working with objects, is that we can not add non existent properties to a defined object. Take a look at the following code snippet:

const fObject = {
  id: 1
}

// fObject.name = 'foo' // !Error

// ---------------------------------------------------------------------------------
// Property 'name' does not exist on type {id: number;}.
// ---------------------------------------------------------------------------------

// So the above doesn't work. Per definition we can add new properties to an object with defined properties. We need to be more explicit about the types, to be able to make an object expandable. We can define a type that expect a key of type string and string property types f.e.

const gObject: { [key: string]: string } = {};
gObject.name = "foo";

// Another important aspect when working with objects is that we have to be exact with our type definition.

type F2 = {id: number, name: string}
// const fObject : F2 = {id: 1, name: 'foo', points: 100} // !Error

// But what if wanted can't be exact? We can work around having to be exact

type G = { id: number, name: string, [key: string]: string | number };
const gObject2 : G = {id: 1, name: 'foo', points: 100} // No Error!

// A common approach in JavaScript is to use objects as a map:

const aMap: { [key: number]: string } = {};
aMap[1] = "foo";
// aMap["a"] = "foo"; // !Error
// aMap[1] = 1; // !Error

const otherMap: { [key: string]: number } = {};
otherMap["foo"] = 1;
otherMap[1] = 2; // No Error!
// otherMap["bar"] = "foo"; // !Error

// We can also mix property declarations with dynamic key/value pairs

const mixedMap: {
  id: number;
  [key: string]: number;
} = {
  id: 1
};

mixedMap["foo"] = 1;
mixedMap[1] = 2; // No Error!
// mixedMap["bar"] = "foo"; // !Error



