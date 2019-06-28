// MODULE: In TS 2.0, a new primitive type called 'never' was introduced.
// INFO: https://stackoverflow.com/questions/40251524/typescript-never-type-inference

// It represents the type of values that never occur. The never type is used in the following two places:
// - As the return type of functions that never return.
// - As the type of variables under type guards that are never true.

// These are the exact characteristics of the never type as described:

// - never is a subtype of and assignable to every type.
// - No type is a subtype of or assignable to never (except never itself).
// - In a function expression or arrow function with no return type annotation, if the function has no return statements, or only return
//    statements with expressions of type never, and if the end point of the function is not reachable (as determined by control flow
//    analysis), the inferred return type for the function is never.
// - In a function with an explicit never return type annotation, all return statements (if any) must have expressions of type never
//   and the end point of the function must not be reachable.

// MODULE: Functions that never return

// Type () => never
const sing = function() {
  while (true) {
    console.log("Never gonna give you up");
    console.log("Never gonna let you down");
    console.log("Never gonna run around and desert you");
    console.log("Never gonna make you cry");
    console.log("Never gonna say goodbye");
    console.log("Never gonna tell a lie and hurt you");
  }
};

// The body of the function expression consists of an infinite loop that doesn't contain any break or return statements. There's no way to break out of the loop, given that console.log doesn't throw. Therefore, never is inferred for the function's return type.

// Similarly, the return type of the following function is inferred to be never:

// Type (message: string) => never
const failWith = (message: string) => {
  throw new Error(message);
};

// TypeScript infers the never type because the function neither has a return type annotation nor a reachable end point, as determined by control flow analysis.

// MODULE: Variables with Impossible Types
// Another case where the never type is inferred is within type guards that are never true. In the following example, we check whether the value parameter is both a string and a number, which is impossible:

function impossibleTypeGuard(value: any) {
  if (
    typeof value === "string" &&
    typeof value === "number"
  ) {
    value; // Type never
  }
}

// This example was obviously contrived, so let's look at a more realistic use case. The example below showcases that TypeScript's control flow analysis narrows union types of variables under type guards. Intuitively speaking, the type checker knows that value cannot be a number once we've checked that it's a string, and vice-versa:

function controlFlowAnalysisWithNever(
  value: string | number
) {
  if (typeof value === "string") {
    value; // Type string
  } else if (typeof value === "number") {
    value; // Type number
  } else {
    value; // Type never
  }
}

// Note that value can neither be a string nor a number within the last else branch. In that case, TypeScript infers the never type because we've annotated the value parameter to be of type string | number, that is, no other type than string or number is possible for the value parameter.

// Once control flow analysis has eliminated both string and number as candidates for the type of value, the type checker infers the never type, the only possibility remaining. However, we cannot do anything useful with value because it's of type never, so vscode doesn't show any autocompletion suggestions.

function NoAutoCompletion(
  value: string | number
) {
  if (typeof value === "string") {
    value; // Type string
  } else if (typeof value === "number") {
    value; // Type number
  } else {
    // value.; // Type never <- No autocompletion
  }
}

// MODULE: The Difference Between never and void

// You might ask yourself why TypeScript needs a never type when it already has a void type. Although the two might seem similar, they represent two different concepts:

// - A function that doesn't explicitly return a value implicitly returns the value undefined in JavaScript. Although we typically say that such a function "doesn't return anything", it returns. We usually ignore the return value in these cases. Such a function is inferred to have a void return type in TypeScript.

// - A function that has a never return type never returns. It doesn't return undefined, either. The function doesn't have a normal completion, which means it throws an error or never finishes running at all.

// If you're interested in type theory, the never type is a 'bottom type', also known as a zero type or an empty type. It's often denoted as ⊥ and signals that a computation doesn't return a result to its caller. The void type, on the other hand, is a 'unit type' (a type that allows only one value) with no defined operations.

// MODULE: Type Inference for Function Declarations

// There's a little gotcha regarding the return type inference of function declarations. If you read closely through the characteristics of the never type It mentions function expressions and arrow functions, but not function declarations. That is, the return type inferred for a function expression might differ from the one inferred for a function declaration:

// Return type: void ('undefined')
function failWith1(message: string) {
  throw new Error(message);
}

// Return type: never
const failWith2 = function(message: string) {
  throw new Error(message);
};

// The reason for this behavior is backward compatibility. If you want a function declaration to have the return type never, you can explicitly annotate it:

function failWith3(message: string): never {
  throw new Error(message);
}