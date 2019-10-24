# Typescript

## Warning before learning

- TypeScript is Mostly Boring JavaScript

## Why do we care about types

- Types are used by the Typescript Compiler to analyze our code for errors
- Types allow other engineers to understand what values are flowing around our codebase

## Where do we use types

- Everywhere in application, Every value you define

## Type Annotation & Inference

- Annotation(`Developer Side`): Code we add to tell Typescript what type of value a variable will refer to
  - Use when you declare a variable on one line then initialize it later
  - Use when you want a variable to have a type that can't be inferred
  - Use when a function returns the 'any' type and we need to clarify the value
- Inference(`Compiler Side`): Typescript tries to figure out what type of value a variable refers to
  - Rely whenever necessary

  ```ts
    declaration       initialization
     ----^----          ----^----
    const color     =     'red'
  ```

  - if declaration and initialization are on the same line, Typescript will figure out the type of 'color' for us

## Soundness and Completeness

- They want to **stop you from writing code that will raise type errors**
  - This is called **soundness**: a sound type system will catch every type error that could happen at run-time. If you program type-checks, you'll never encounter a type error. No false negatives.
  
  ```ts
    Having array and map indexes return T | undefined would be more sound, but less complete.
  ```

  - When you get an element from an array, it might be undefined but Typescript doesn't track that.

- They want to **not prevent you from writing code that won't raise type errors**
  - This is called **completeness**: a complete type system will accept any program that can't throw a type error(only yell type errors when there's a real legitimate type error) on run-time. No false positives.
- They want to **work well with existing idioms that predate the type system**
  - **Gradual Typing**, this is where typescript falls and gets tricky
  
## Gradual Typing

- Typescript typing system typically lies somewhere in-between Static and Dynamic Typing

  ```js
  let name = "John";
  ```

   If you hover over the variable name in the playground, you’ll see that TypeScript managed to associate name with the string variable. In fact, TypeScript provides type inference as well.

  ```ts
  let sum: (a:any, b:any) => any <- avoid any as much as possible
  ```

   In this case, TypeScript didn’t associate a particular type to either **a** , **b** or the return value of sum . The types of the sum function’s arguments or return could be anything. These types will be determined in runtime when executing the function. This is due to the **'+'** operator, which is not specific to any particular type in TypeScript or JavaScript.

   **Conclusion:**

   In a gradually-typed language such as TypeScript, some declarations will have their types checked during compile-time and others will have their types checked at run-time.

## Variance

- Variance describes rules for subtyping. Variance describes how the subtyping relationships of containers(like an Array, Map, or Function) relates to the inner type / their contents.
- A type **T** is a subtype of a type **U** if anywhere that expects a **U**, you can use a **T** instead
- Typescript generally uses **covariance**, which makes intuitive sense but is unsound when you mutate your arguments

## Other Sources about typescript

- [Type Narrowing in Typescript](https://medium.com/@jackhmwilliams/type-narrowing-in-typescript-44a6757c5a64)
- [TypeScript 2.0: Built-In Type Declarations](https://mariusschulz.com/blog/typescript-2-0-built-in-type-declarations)
- [TypeScript 2.1: External Helpers Library](https://mariusschulz.com/blog/typescript-2-1-external-helpers-library)
- [10++ TypeScript Pro tips/patterns with (or without) React](https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680)
- [20 Basic TypeScript Interview Questions (2018 Edition)](https://www.fullstack.cafe/blog/20-typescript-interview-questions-and-answers-in-2018)
- [TypeScript Type Inference Guide](http://ducin.it/typescript-type-inference-guide)
- [How to think and type in TypeScript](https://areknawo.com/how-to-think-and-type-in-typescript/)
- [Advanced TypeScript Types with Examples](https://levelup.gitconnected.com/advanced-typescript-types-with-examples-1d144e4eda9e)
- ["Typing the Untyped: Soundness in Gradual Type Systems" by Ben Weissmann](https://www.youtube.com/watch?v=uJHD2xyv7xo)
  