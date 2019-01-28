// [More Info]: https://www.typescriptlang.org/docs/handbook/decorators.html

// MODULE: Decorator is just a function it will be decorator when we appended or attach it with (@) sign

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
function logging(value: boolean): any {
  return value ? logged : null;
}

@logging(true)
class CarDecorator {
  constructor() {
    console.log('Car Class Decorator')
  }
}

// MODULE: Advanced Decorator
function printable(constructorFn: Function) {
  constructorFn.prototype.print = function() {
    console.log(this)
  }
}

@printable
class PlantPrintable {
  name = "Green Plant";
}

const plantPrintable = new PlantPrintable();
(<any>plantPrintable).print();