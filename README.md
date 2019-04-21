---
author: Barry
---

# Gradual Typing

- Typescript typing system typically lies somewhere in-between Static and Dynamic Typing

  ```js
  let name = "John";
  ```

   If you hover over the variable name in the playground, you’ll see that TypeScript managed to associate name with the string variable. In fact, TypeScript provides type inference as well.

  ```ts
    let sum: (a:any, b:any) => any
  ```

   In this case, TypeScript didn’t associate a particular type to either **a** , **b** or the return value of sum . The types of the sum function’s arguments or return could be anything. These types will be determined in runtime when executing the function. This is due to the **'+'** operator, which is not specific to any particular type in TypeScript or JavaScript.

   **Conclusion:**

   In a gradually-typed language such as TypeScript, some declarations will have their types checked during compile-time and others will have their types checked at run-time.

# Sources

- [TypeScript 2.0: Built-In Type Declarations](https://mariusschulz.com/blog/typescript-2-0-built-in-type-declarations)
- [TypeScript 2.1: External Helpers Library](https://mariusschulz.com/blog/typescript-2-1-external-helpers-library)
- [30 seconds of Code](https://30secondsofcode.org/)
