// MODULE: AMBIENT DECLARATION - If It Doesn’t Exists, Declare It
// INFO: https://stackoverflow.com/questions/35019987/what-does-declare-do-in-export-declare-class-actions
// INFO: https://stackoverflow.com/questions/43335962/purpose-of-declare-keyword-in-typescript

// Not all JavaScript libraries/frameworks have TypeScript declaration files. 
// On the other hand, we might want to use libraries/frameworks in our TypeScript files without getting compilation errors. What can we do?

// One solution is to use the `declare` keyword. The `declare` keyword is used for `ambient declarations` where you want to define a variable that may not have originated from a TypeScript file.

// For example, lets imagine that we have a library called myLibrary that doesn’t have a TypeScript declaration file and have a namespace called myLibrary in the global namespace. If you want to use that library in your TypeScript code, you can use the following code:

declare var myLibrary;

// The type that the TypeScript runtime will give to myLibrary variable is the any type. The problem here is that you won’t have Intellisense for that variable in design time but you will be able to use the library in your code. Another option to have the same behavior without using the declare keyword is just using a variable with the any type:

var myLibrary: any;

// Both of the code examples will result in the same JavaScript output but the declare example is more readable and expresses an ambient declaration.

// The TypeScript declare keyword is used to declare variables that may not have originated from a TypeScript file.