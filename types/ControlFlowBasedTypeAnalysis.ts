// MODULE: Control Flow Based Type Analysis

// With TypeScript 2.0, the type checker analyses all possible flows of control in statements and expressions to produce the most specific type possible (the narrowed type) at any given location for a local variable or parameter that is declared to have a union type.

// Here's an example that illustrates how TypeScript understands the effect of assignments to a local variable, and how it narrows the type of that variable accordingly

let command: string | string[];

command = "pwd";
command.toLowerCase(); // Here, command is of type 'string'

command = ["ls", "-la"];
command.join(" "); // Here, command is of type 'string[]'

// Note that all code resides within the same scope. Still, the type checker uses the most specific type possible for the command variable at any given location:

/**
 * *After the string "pwd" has been assigned, there's no way for the command variable to be a string array (the only other option within the union type). Therefore, TypeScript treats command as a variable of type string and allows the call to the toLowerCase() method.
 *
 * *After the string array ["ls", "-la"] is assigned, the command variable is no longer treated as a string. It is now known to be a string array, so the call to the join method succeeds.
 */

// MODULE: Strict Null Checks

// Control flow based type analysis is particularly helpful when used in conjunction with nullable types, which are represented using union types including null or undefined. The type checker now understands the semantics of assignments and jumps in control flow, thereby greatly reducing the need for type guards. Usually, we need to check whether a variable of a nullable type has a non-null value before we can work with it:

type PersonCF = {
  firstName: string;
  lastName?: string | null | undefined;
};

function getFullName(person: PersonCF): string {
  const { firstName, lastName } = person;

  // Here, we check for a falsy value of the `lastName` property,
  // which covers `null` and `undefined` (and other values like "")
  if (!lastName) {
    return firstName;
  }

  return `${firstName} ${lastName}`;
}

// Definite Assignment Analysis another new feature built on top of control flow.
// In strict null checking mode, local variables cannot be referenced before they have been assigned:

let nameCF: string; // INFO: should use union type whose type include undefined

// !Error: Variable 'name' is used before being assigned.
// console.log(nameCF);

// INFO: Definite assignment analysis is another protection measure against nullability bugs. The idea is to make sure that every non-nullable local variable has been initialized properly before it's being used.

