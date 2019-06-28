// MODULE: Literal Types, i and j could either be assigned a primitive type, but interestingly a literal type as well.

const i = 2;
const j = "foo";

// STRING AND NUMERIC LITERAL TYPE
const iTyped: 2 = 2;
const jTyped: "foo" = "foo";

// Now you might be wondering what value we gain from literal types? We can constraint what values we expect.

type ExpectedInput = 1 | 2 | 3;

const doSomething = (input: ExpectedInput) => {
  switch (input) {
    case 1:
      return "Level 1";
    case 2:
      return "Level 2";
    case 3:
      return "Level 3";
  }
};

// doSomething(0) // error: This type is incompatible with the expected param type of number enum
doSomething(1); // ok

// We were dealing with const variables up until now. What about let or var? While const variables can't be reassigned,
// so TypeScript can inter the type and know for sure it will never change.
// This is not the case when working with let or var.

let aVar: string = "foo";

aVar = "bar";
// aVar = 1  // Error! Not assignable to type 'string'

// As we can see in the above example, once you assign a type to a let or var variable any re-assignment has to be of that same type otherwise TypeScript will complain.

// Take a look at the following example:
// ---------------------------------------------------------------------
// const i : 3 = 2
// Error: Type '2' is not assignable to Type '3'.
// ---------------------------------------------------------------------

// With TypeScript 2.0, literal types are no longer restricted to string literals.
// The following literal types have been added to the type system:
// - Boolean
// - Numeric (already given an example at the top)
// - Enum

// BOOLEAN LITERAL TYPE
// While boolean literal types are rarely useful in isolation, they work great in conjunction with tagged union types and control flow based type analysis. For instance, a generic Result<T> type that either holds a value of type T or an error message of type string can be defined as follows:

type Result<T> =
  | { success: true; value: T }
  | { success: false; error: string };

// did you notice that the only TypeScript artifacts in this entire code example are the declaration of Result<T> and the type annotations in the function signature? The remainder of the code is plain, idiomatic JavaScript that is still fully typed due to control flow based type analysis.

function parseEmailAddress(input: string | null | undefined): Result<string> {
  // If the input is null, undefined, or the empty string
  // (all of which are falsy values), we return early.
  if (!input) {
    return {
      success: false,
      error: "The email address cannot be empty."
    };
  }

  // We're only checking that the input matches the pattern
  //   <something> @ <something> DOT <something>
  // to keep it simple. Properly validating email addresses
  // via regex is hard, so let's not even try here.
  if (!/^\S+@\S+\.\S+$/.test(input)) {
    return {
      success: false,
      error: "The email address has an invalid format."
    };
  }

  // At this point, control flow based type analysis
  // has determined that the input has type string.
  // Thus, we can assign input to the value property.
  return {
    success: true,
    value: input
  };
}

// Note that with the strictNullChecks option enabled, string is a non-nullable type. In order for the function to accept a value of a nullable type for its input parameter, the null and undefined types must explicitly be included in the union type.

const parsed = parseEmailAddress("example@example.com");

if (parsed.success) {
  parsed.value; // OK
  // parsed.error; // !Error
} else {
  // parsed.value; // !Error
  parsed.error; // OK
}

// - If parsed.success is true, parsed must have type { success: true; value: string }.
//   We can access value in this case, but not error.

// If parsed.success is false, parsed must have type { success: false; error: string }.
//   We can access error in this case, but not value
