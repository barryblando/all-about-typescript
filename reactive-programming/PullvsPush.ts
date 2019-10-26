// Pull and Push are two different protocols that describe how a data Producer can communicate with a data Consumer.

// MODULE: PULL

// (Producer) Passive: Produces data when requested
// (Consumer) Active: Decides when data is requested

// In Pull systems, the Consumer determines when it receives data from the data Producer. The Producer itself is unaware of when the data will be delivered to the Consumer.

// Every JavaScript Function is a Pull system. The function is a Producer of data, and the code that calls the function is consuming it by "pulling" out a single return value from its call.

// ES2015 introduced generator functions and iterators (function*), another type of Pull system. Code that calls iterator.next() is the Consumer, "pulling" out multiple values from the iterator (the Producer).

// MODULE: PUSH

// (Producer) Passive: Produces data at its own pace
// (Consumer) Active: reacts to receive data

// In Push systems, the Producer determines when to send data to the Consumer. The Consumer is unaware of when it will receive that data.

// Promises are the most common type of Push system in JavaScript today. A Promise (the Producer) delivers a resolved value to registered callbacks (the Consumers), but unlike functions, it is the Promise which is in charge of determining precisely when that value is "pushed" to the callbacks.

// RxJS introduces Observables, a new Push system for JavaScript. An Observable is a Producer of multiple values, "pushing" them to Observers (Consumers).

// - A Function is a lazily evaluated computation that synchronously returns a single value on invocation.
// - A Generator is a lazily evaluated computation that synchronously returns zero to (potentially) infinite values on iteration.
// - A Promise is a computation that may (or may not) eventually return a single value.
// - An Observable is a lazily evaluated computation that can synchronously or asynchronously return zero to (potentially) infinite values from the time it's invoked onwards.