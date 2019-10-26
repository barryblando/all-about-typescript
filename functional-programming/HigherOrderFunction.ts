// Higher Order Function (HOF) - A  function that take other function as argument, or function that return function as their output
// https://codeburst.io/here-are-7-ways-higher-order-functions-can-improve-your-life-a392aa6b29d2
// INFO: Here are 7 Ways Higher Order Functions Can Improve Your Life:
// 1. They Enhance Your Existing Code, Increasing Confidence
// 2. They Save Precious, Valuable Time
// 3. They Give The Ability To Create “Private Worlds”
// 4. They Can Be Used As Quick And Hacky Solutions, Temporarily Decreasing Pressure
// 5. It Can Hold, Manipulate, And Pass The Manipulated Data Anywhere, Giving You An Easy Time Testing Several Solutions
// 6. It Gives You The Ability To Create New Versions Of Something
// 7. It Can Help You Develop A Healthy Relationship With Your Boss And Your Co-workers

// const connect = (injectedStateProp, injectedDispatchProp) => {
//   **CLOSURE&CURRYING**
//   return (WrappedComponent) => {
//     - we can still have access to variable StateProp & DispatchProp 'cause of closure & lexical env
//     - props here are values injected by other Component (e.g Router that passes down match prop)
//     - return function that returns WrappedComponent w/ props to render
//     return (props) => <WrappedComponent {...injectedStateProp} {...injectedDispatchProp} {...props} />
//   };
// };
//
//   **PARTIAL APPLICATION**
// connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

// MODULE: FUNCTIONs are first class citizens in javascript, why? take a look at this

// 1. Can be pass as an argument
function createSafeVersion(func) {
  /** CLOSURE & CURRYING - Works with Function **/
  /* lexical identifiers or name variables sits here */
  // 2. Can be return by a function
  return function(n, message) { //  <== (Lexically Sits!)
    if (n !== null && typeof n === 'number') {
      if (message !== null && typeof message === 'string') {
        return func(n, message); // Closure is when a function can remember and access its lexical scope even when it's invoked outside its lexical scope, we can access lexical names which are identifiers that are used to name variables (keywords, functions, etc..)
      }
    }
  }
  // PS Closure is logical conclusion of lexical scope, if you understand lexical scope you understand closure
}

function printMessageNTimes(n, message) {
  for (let i = 0; i < n; i++) { console.log(message) }
}

function getNthLetter(n, string) {
  return string.chartAt(n);
}

function getSubstringOfLength(n, string) {
  return string.substring(0, n);
}

// 3. Can be assign to variables
let printMessageNTimesSafe = createSafeVersion(printMessageNTimes);
let getNthLetterSafe = createSafeVersion(getNthLetter);
let getSubstringOfLengthSafe = createSafeVersion(getSubstringOfLength);

/** PARTIAL APPLICATION - Works with Data **/
printMessageNTimesSafe(4, 'Banana'); // 'Banana Banana Banana Banana'
getNthLetterSafe(2, 'Javascript'); // 'v'
getSubstringOfLengthSafe(5, 'Hello and welcome'); // 'Hello'

// *************************************************************************
// *************************************************************************

function breathe(amount) {
  return new Promise((resolve, reject) => {
    if(amount < 500) {
      reject('Ohh Noo! Too Low!')
    }
    setTimeout(() => resolve(`Done for ${amount} ms`), amount);
  });
}

function catchErrors(fn) {
  // using rest operator to gathers a set of values together from assignment context into an array - // ['Barry', 'Blando']
  return function(...params) {
    // using spread operator to spread all those in value context out into its individual values - // Barry Blando
    return fn(...params).catch((err) => { // go returns promise so you can always just tack on a .catch on the end
      console.error('Ohh Nooo!!!!');
      console.error(err);
    });
  }
}

async function go(name, last) {
  console.log(`Starting for ${name} ${last}!!!`);
  const res = await breathe(1000);
  console.log(res);
  const res2 = await breathe(300);
  console.log(res2);
  const res3 = await breathe(750);
  console.log(res3);
  const res4 = await breathe(900);
  console.log(res4);
}

/** CURRYING **/
const wrappedFunction = catchErrors(go);
wrappedFunction('Barry', 'Blando');

const fibonacciRecursion = function (num) {
  if (num <= 1) return 1;
  return fibonacciRecursion(num -1) + fibonacciRecursion(num -2);
}

fibonacciRecursion(20); /*?.*/
