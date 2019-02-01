// [More Info]: https://www.typescriptlang.org/docs/handbook/decorators.html
// [More Info]: https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841
// [More Info]: https://www.sparkbit.pl/typescript-decorators/
// [More Info]: https://www.spectory.com/blog/A%20deep%20dive%20into%20TypeScript%20decorators
// [More Info]: https://dev.to/scleriot/typescript-method-decorators-example-1imc

// MODULE: Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.

// INFO: Decorators can help writing better code, clear and reasonable:
// * Separate the essence of the class/method.
// * Describe the object, for instance, a class with ‘@component’ decorator is immediately recognized as one, much more fast then if it would have certain properties or methods within.
// * Create common code to reuse in many places, such as logging, validation etc.

// INFO: In order to create a decorator, we just have to create a simple function. The function receives three parameters:
// [MORE INFO]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
// * target - Either the constructor function of the class for a static member or the prototype of the class for an instance member.
// * key - The name of the member/property to be defined or modified.
// * descriptor - The Property Descriptor for the member.

// Here we attach logged to a class as a decorator which gives reference to the constructor function
function logged(constructorFn: Function) {
  console.log(constructorFn);
}

@logged
class PersonDecorator {
  constructor() {
    console.log('Person Class Decorator')
  }
}




// MODULE: Factory Decorator
// A Decorator Factory is simply a function that returns the expression that will be called by the decorator at runtime.
function logging(value: boolean): any {
  return value ? logged : null;
}

@logging(true)
class CarDecorator {
  constructor() {
    console.log('Car Class Decorator')
  }
}




// MODULE: Advanced Decorator and using Multiple Decorator Composition
// When multiple decorators apply to a single declaration, their evaluation is similar to function composition in mathematics.
// In this model, when composing functions f and g, the resulting composite (f ∘ g)(x) is equivalent to f(g(x)).

// As such, the following steps are performed when evaluating multiple decorators on a single declaration in TypeScript:
// - The expressions for each decorator are evaluated top-to-bottom.
// - The results are then called as functions from bottom-to-top.

function printable(constructorFn: Function) {
  constructorFn.prototype.print = function() {
    console.log(this)
  }
}

@logging(true)
@printable
class PlantPrintable {
  name = "Green Plant";
}

const plantPrintable = new PlantPrintable();
// cast/assert any otherwise typescript won't know print exist
(<any>plantPrintable).print();



// MODULE: Decorator Evaluation
// There is a well defined order to how decorators applied to various declarations inside of a class are applied:
  // MORE INFO: https://github.com/Microsoft/TypeScript/issues/6268
// * Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each instance member.
// * Parameter Decorators, followed by Method, Accessor, or Property Decorators are applied for each static member.
// * Parameter Decorators are applied for the constructor.
// * Class Decorators are applied for the class.




// MODULE: Method Decorator
function LogEdit(value: boolean = false): any {
  return value ? function(target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
    descriptor.writable = value;
    const originalMethod = descriptor.value; // store foo to new variable
    target // P2 { }
    descriptor // P2 { }
    // Override foo function and its parameters/arguments
    descriptor.value = function (...args: Array<string>) {
      args
      console.log(`${<string>key} was called with:`, args);
      args[0] = 'Woah!'; // a
      args
      // return new foo and its new value for parameters
      var result = originalMethod.apply(this, args);
      return result;
    };
    return descriptor;
  } : null;
}

class P2 {
  projectName: string;

  constructor(name: string) {
    this.projectName = name;
  }

  @LogEdit(true)
  foo(a: string, b: string, c: string) {
    console.log(a, b, c);
  }
}

const p2 = new P2("WeW");
p2.foo('Hello', 'World', 'Yeah!');



// MODULE: Property Decorator
// NOTE: Property decorators are similar to method decorators. The only difference is they do not accept property descriptor as argument.
function calcCircleParams(target: Object, key: string | symbol): any {
  // Property value. Access only the Radius which was the only one given
  let _val = (<any>target)[key];

  // Property getter.
  const getter = function () {
    return _val;
  };

  // Property setter.
  const setter = function (newVal: any) {
    _val = newVal;
    // Set new Properties
    (<any>target)['Area'] = _val * _val * Math.PI;
    (<any>target)['Circumference'] = 2 * _val * Math.PI;
  };

  let newDescriptor: PropertyDescriptor;
  // Delete property. An accessor descriptor also has the following optional keys: get & set
  if (delete (<any>target)[key]) {
    // Create new property with getter and setter
    // Object.defineProperty(target, key, {
    //   get: getter,
    //   set: setter,
    //   enumerable: true,
    //   configurable: true
    // });
    newDescriptor = {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    }
    return newDescriptor;
  }
}

class Circle {
  @calcCircleParams
  static Radius: Number;
  static Area: Number;
  static Circumference: Number;

  constructor() { }
}


Circle.Radius = 3;

console.log(`Radius: ${Circle.Radius},
            Area: ${Circle.Area},
            Circumference: ${Circle.Circumference}`);

Circle.Radius = 5;

console.log(`Radius: ${Circle.Radius},
            Area: ${Circle.Area},
            Circumference: ${Circle.Circumference}`);




// MODULE: Parameter Decorator
// - applied to the function for a class constructor or method declaration.
// - The expression for the parameter decorator will be called as a function at runtime, with the following three arguments:
//   - The prototype of the class
//   - The name of the member
//   - The ordinal index of the parameter in the function’s parameter list.

function required(target: Object, methodName: string | symbol, paramIndex: number) {
  target
  methodName
  paramIndex
  let metadataKey = `__required_${<string>methodName}_parameters`;

  // if Calc metadataKey is an array property then
  if (Array.isArray((<any>target)[metadataKey])) {
    // push
    (<any>target)[metadataKey].push(paramIndex);
  } else {
    // initialize a new one
    (<any>target)[metadataKey] = [paramIndex];
  }
}

// Method Decorator
function validate(target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
  target
  key
  let originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    let metadataKey = `__required_${<string>key}_parameters`;
    var indices = (<any>target)[metadataKey].sort(); // ?
    for (let i = 0; i < args.length; i++) {
      args // ?
      indices[i] // ?
      args.indexOf(args[indices[i]]) // ?
      args.indexOf(args[indices[i]]) === indices[i] // ?
      args[indices[i]] // ?
      // check only those who have a required on parameter, you can use Metadata Reflection API for declarative way
      if (args[indices[i]] === undefined && args.indexOf(args[indices[i]]) === indices[i]) {
        throw new Error('missing required parameter')
      }
    }
    const result = originalMethod.apply(this, args);
    return result;
  }

  return descriptor;
}

class Calculator {
  @validate
  add(a: number, @required b: any, @required c: any) {
    return a + b + c;
  }

  @validate
  sub(a: number, @required b: number, c: number) {
    return a - b - c;
  }
}

// I declare class calculator with method ‘add’ that decorated with ‘validate’, and params that are decorated with ‘required’.
// It means that every time the method is called, the ‘validate’ decorator will be called before.
// The parameter decorator is called before the method parameter and inserts the required fields into ‘metadataKey’ array.
// The ‘validate’ decorator goes over all the fields in the ‘metadataKey’ field and verifies that they are defined.
// If not, it throws an exception.

const calc = new Calculator();
calc.add(5, 4, 10) // ?
// calc.sub(5, undefined, 4) // ?


// MODULE: Accessor Decorator
// is declared just before an accessor declaration. The accessor decorator is applied to the Property Descriptor for the accessor and can be used to observe, modify, or replace an accessor ’s definitions. An accessor decorator cannot be used in a declaration file, or in any other ambient context (such as in a declare class).

function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.configurable = value;
  };
}

class Point {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
      this._x = x;
      this._y = y;
  }

  @configurable(false)
  get x() { return this._x; }

  @configurable(false)
  get y() { return this._y; }
}