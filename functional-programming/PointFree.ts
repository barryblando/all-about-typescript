// The intent of 'point-free' (tacit programming) code is not that there's no point at all
// which a function definition does not include information regarding its arguments (or "points") on which they operate, 
// using combinators and function composition [...] instead of variables.
// It is that most of the code doesn't have points 'cause many times the points are unnecessary verbosity that confuses you visually

// Non Point-Free Style / Explicit Verbose of function
// foo(function(v) {a
//  return num(v)
// })
//

// POINT-FREE EXAMPLE

// EXAMPLE 1
function OrigFoo<T>(value: T) {
  return function(fn: (val: T) => T) {
    return fn(value);
  }
}

const num = (val: number) => val + 2;

const foo = OrigFoo<number>(2);

// Writing functions without mention of the arguments is called “point-free style”. To do it, you’ll call a function
// that returns the new function, rather than declaring the function explicitly. That means you won’t
// need the function keyword or the arrow syntax (=>).
foo(num); // ?


// EXAMPLE 2
function not<T>(fn: (val: number) => T) {
  return function negated(val: number) {
    return !fn(val);
  }
}

function isOdd(val: number) {
  return val % 2 == 1;
}

var isEvenNum = not<boolean>(isOdd);

isEvenNum(4) // ?
