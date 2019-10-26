import {
  Observable,
  of,
  from,
  interval,
  fromEvent,
  asyncScheduler,
  Observer
} from 'rxjs';

import { print } from './util/print';

// INFO: When working with RxJS you should think yourself as a plumber, in a literal sense
// INFO: Think of RxJS as “LoDash” for handling asynchronous events.
// INFO: What makes RxJS powerful is its ability to produce values using pure functions. That means your code is less prone to errors.

// MODULE: Observable
// - Wrapper for some data that can be subscribed to and then the subscriber will be notified anytime the data changes
// - Essentially a pipe for data, rxjs will provide apis to modify those pipes
// - able to deliver values either synchronously or asynchronously.
// - INFO: To be precised, it is an Array which gets build over time by Subscribing to it

// INFO: Core Observable concerns:
// Creating Observables
// Subscribing to Observables
// Executing the Observable
// Disposing Observables

// INFO: Observable and Function
// - Observables can "return" multiple values over time, something which functions cannot.

function foo() {
  console.log('Hello');
  return 42;
  return 100; // dead code. will never happen
}

// Functions can only return one value. Observables, however, can do this:

// Rx.Observable.create is an alias for the Observable constructor, and it takes one argument: the subscribe function.
// INFO: using create gives us callback function that we can use to notify a subscriber if it is created otherwise won't be called,
// NOTE: that observable.subscribe and subscribe inside Observable.create(function subscribe(observer) {...}) have the same name. In the library, they are different, but for practical purposes you can consider them conceptually equal.
const observable$: Observable<any> = Observable.create(function subscribe(observer: Observer<string>) {
  // Executing Observables
  observer.next('A');
  observer.next('B');
  observer.complete(); // stream closed won't reach C
  throw 'Catch me!'
  observer.next('C');
});

// INFO: http://reactivex.io/rxjs/manual/overview.html#subscribing-to-observables
// subscriber takes a observer object with optional callbacks or arguments that will be called every time the observable emits a new value.
// A subscribe call is simply a way to start an "Observable execution" and deliver values or events to an Observer of that execution.
// observable.subscribe(next*(error|complete)?) /  observable.subscribe({ next, err?, complete? })
const subscription = observable$.subscribe(print, err => console.log(err), () => console.log('Complete!'));

// Later: Disposing Observable Executions
// This cancels the ongoing Observable execution which was started by calling subscribe with an Observer.
// This will keep you from having a memory leak per se
// A Subscription essentially just has an unsubscribe() function to release resources or cancel Observable executions.
subscription.unsubscribe();

// using 'of' creation observable to stream raw value any type of data
const hello = of('hello', ['world', 'Nice'], 23, true, JSON.stringify({ cool: 'stuff' }), {});
hello.subscribe(print);

// using 'from' creation observable that takes an array promise or iterable then emits each individual item from the observable
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('resolve!');
  }, 1000)
});

const obPromise = from(promise);
// obPromise.subscribe(print)

const world = from('world');
world.subscribe(print);

// Creating observable in an event using fromEvent, which takes dom element and dom event as its arguments, every time you click dom it prints
const event = fromEvent(document, 'click');
// event,subscribe(print)

// Creating observable using interval, it takes the number of milliseconds as its argument and emits a number each time that interval passes
const periodic = interval(500);
// periodic.subscribe(print)


// Conclusion:
// - function call() means "give me one value synchronously"
// - observable.subscribe() means "give me any amount of values, either synchronously or asynchronously"

// MODULE: Reactive Synchronous & Asynchronous
// You probably never to mess with this but you can control that behavior by modifying scheduler of the observable

const helloAsync = of('hello', asyncScheduler);

helloAsync.subscribe(print);

print('world');

