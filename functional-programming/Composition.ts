// NOTE: Terms
// unary - Functions in lambda calculus are always unary,  meaning they only accept a single parameter
// currying - The transformation from an n-ary function to a series of unary functions is know  as currying
// compose - right to left
// pipe - left to right

function increment(x: number) { return x + 1 }
function decrement(x: number) { return x - 1 }
function double(x: number) { return x * 2 }
function half(x: number) { return x / 2 }

type Callback = (input: number) => number

function compose(...fns: Callback[]) {
  // here we just reverse the order of functions to be executed
  return pipe(...fns.reverse())
}

function pipe(...fns: Callback[]) {
  return function piped(result: number) {
    for (let i = 0; i < fns.length; i++) {
      result = fns[i](result)
    }
    return result
  }
}

let c = compose(decrement, double, increment, half)
let p = pipe(half, increment, double, decrement)

c(3) === 4 // ?

c(3) === p(3) // ?