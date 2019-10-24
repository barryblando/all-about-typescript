// One thing jQuery used to take the JavaScript world by storm was it’s method chaining. 
// The ability to apply several methods on a single element was a big factor in the library’s adoption. 
// Also in object-oriented programming, polymorphism is one of it’s pillars.

// MODULE: Polymorphism
// the ability of an object to portray different forms depending on how and where it's used.

// MODULE: Polymorphic This
// How do we implement method chaining and polymorphic behavior in TypeScript? The polymorphic `this` type comes to the rescue.

// With the polymorphic this type, you return `this` as the result of a method of a class. The `this` will refer to the instance of the current class. When another class extends the former class, the `this` will refer to the instance of the class that extended. This way, `this` changes it’s form depending on where it is called. This is called polymorphism. Also, because we return `this`, we can call other methods which are in the class or it’s parent class. This is where the method chaining comes into play.

// Let’s say we run a car rental service. So in our Car class, we have three methods, Rent, Record and Return

class CarPT {
  Rent(type:string) : this {
    console.log(`${type} has been rented.`);
    return this;
  }

  Record() : this {
    console.log(`Car was rented at ${new Date().toLocaleString()}`);
    return this;
  }

  Return(type:string) : this {
    console.log(`${type} has been returned.`);
    return this;
  }
}

// The methods in our Car class return this. This makes our methods polymorphic. It will become clearer as we move along. Let’s create two new classes namely ElectricCar and GasCar which both extend the Car class.

class ElectricCarPT extends CarPT {
  Charge() : this {
    console.log(`Electric car has been charged.`);
    return this;
  }
}

class GasCarPT extends CarPT {
  Refill() : this {
    console.log(`Gas car has been refilled.`);
    return this;
  }
}

// Just like the methods in the Car class, both methods in ElectricCar and GasCar return this.

// Let’s say, someone wants to rent an electric car, so we create an instance of the ElectricCar class. Since we need to charge the car before giving it to the customer, we call the Charge method that exists in our ElectricCar class. Now, because our Charge method returns this, we can immediately chain our Rent method from our Car class.

let electricCar = new ElectricCarPT();
electricCar
  .Rent("Electric car") // Electric car has been rented.
  .Record() // logs current date and time

// See how we can beautifully chain the methods after each other just by returning `this`.

// Now, when the customer returns the rented car, we can chain different sets of methods to the electricCar to record that it has been returned.

electricCar.Return("Electric car") // Electric car has been returned.
  .Record() // logs current date and time.
  .Charge() // Electric car has been charged.

// Here, we see the effect of polymorphism. That is, even though the `this` returned from the Record method will normally be an instance of the Car class which does not contain a Charge method, we are still able to call the Charge method because the `this` keyword now represents an instance of the ElectricCar class. In short, the `this` keyword has changed form and that is exactly what polymorphism is.

// Another display of polymorphism is shown in the code below. By creating an instance of the GasCar class, we can call Refill after Record in our method chaining as opposed to Charge in the electricCar example. Once again, our `this` has changed it’s form.

let gasCar = new GasCarPT();
gasCar
  .Rent("Gas car") // Gas car has been rented.
  .Record() // logs current date and time

gasCar.Return("Gas car") // Gas car has been returned.
  .Record() // logs current date and time.
  .Refill() // Gas car has been refilled.

// By leveraging the Polymorphic this type, we can create an API that returns different result based on how it’s called. Pretty cool stuff if you ask me.
// NOTE: In case you want to extend from multiple classes, you can use mixins