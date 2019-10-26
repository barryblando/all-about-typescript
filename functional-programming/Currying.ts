// https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983

// Currying
function curry(func: (...args: number[]) => number) {
  return function curried(...args: any[]) {
    // sum(a, b, c). Three arguments, so func.length = 3, PS .length is a built-in property for function that return the # of parameters
    if (args.length >= func.length) {
      // Invoke func, if passed args count is the same as the original function has in its definition (func.length) or longer, then just pass and call to it.
      return func.apply({}, [...args]);
    } else {
      // Get a partial: otherwise, func is not called yet. Instead, another wrapper pass is returned, that will re-apply curried providing previous arguments together with the new ones. Then on a new call, again, we’ll get either a new partial (if not enough arguments) or, finally, the result.
      return function pass(...args2: number[]) {
        return curried.apply({}, [...args, ...args2]);
        // return curried.apply(this, args.concat(args2));
      }
    }
  };

}

function sum(a: number, b: number, c: number) {
  this // ?
  return a + b + c;
}


// Partial Apply
let curriedSum: (...args: number[]) => any = curry(sum);

// still callable normally
curriedSum(1, 2, 3); // ?

// get the partial with curried(1) and call it with 2 other arguments
curriedSum(1)(2,3); // ?

// full curried form
curriedSum(1)(2)(3); // ?