// MODULE: Using constraints(extends) to check an object key exists

// A great use case for constraints is validating that a key exists on an object by using another piece of syntax: extends keyof. The following example checks whether a key exists on an object we are passing into our function
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// The first argument is the object we are taking a value from, and the second is the key of that value. The return type describes this relationship with T[K], although this function will also work with no return type defined.

// What our generics are doing here is ensuring that the key of our object exists so no runtime errors occur. This is a type-safe solution from simply calling something like let value = obj[key];.

// From here the getProperty function is simple to call, as done in the following example to get a property from a typescript_info object:

// the property we will get will be of type Difficulty
enum Difficulty {
  Easy,
  Intermediate,
  Hard
}
// defining the object we will get a property from
let typescript_info = {
  name: "Typescript",
  superSet_of: "Javascript",
  difficulty: Difficulty.Intermediate
};
// calling getProperty to retrieve a value from typescript_info
let superSet_of: Difficulty = getProperty(typescript_info, "difficulty");

superSet_of
// This example also throws in an enum to define the type of the difficulty property we have obtained with getProperty.
