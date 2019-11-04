// A Chain adding Function
var addFunc = function(n: number) {
  // return self so we can make chain, currying + recursion
  let f = (num: number) => addFunc(n + num);
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf
  // f.valueOf() method will also returns the primitive value of the specified object. valueOf is called by JavaScript internals.
  f.valueOf = () => n
  n
  return f;
};

// + casts the result of addFunc to number, In that case JavaScript calls the .valueOf method of an object. Since I'm returning anonymous function, this helps to convert it to primitive type.
// As per ES5 specs, the + runs the abstract ToNumber, which in turn calls abstract ToPrimitive which calls internal method `[[DefaultValue]]` which finally calls valueOf.
+addFunc(1)(2)(3) === 6; // ?
// ''+addFunc(1)(2)(3) === '6'; // ?
