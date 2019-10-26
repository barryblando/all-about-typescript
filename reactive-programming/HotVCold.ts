import { Observable, Observer, Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { share, shareReplay, publish, tap, multicast } from 'rxjs/operators';
import { print } from './util/print';

// INFO: https://jaredforsyth.com/posts/visualizing-reactive-streams-hot-and-cold/
// Hot - Observable can have multiple subscriptions, basically an observable where data is created outside itself
// Cold - Observable can only have one subscription, basically an observable where data is created inside of it

const Cold$: Observable<number> = Observable.create((o: Observer<number>) => o.next(Math.random()));

// Cold$.subscribe(print)
// Cold$.subscribe(print)

// 'share' to make it hot or allow it to be broadcast to a multiple subscribers i.e here the pipe
// const Hot$ = Cold$.pipe(share());
// but the caveat of share operator is that it can only provide the current value to the "first" subscriber,
// in order for it to be share across multiple subscribers is to use 'shareReplay'

const Hot$ = Cold$.pipe(shareReplay(1));

// both subscribers will get the same random number 'cause of shareReplay caching last emitted value
// Hot$.subscribe(print);
// Hot$.subscribe(print);

// INFO: there's a way to do hot without decoupling data from the observable using publish

// this tells to emit data once we called a corresponding 'connect' method on it
const HotP$ = Cold$.pipe(
  // side effects will be executed once
  tap(_ => console.log('Do Something!')),
  // do nothing until connect() is called
  publish()
);

HotP$.subscribe(print);
HotP$.subscribe(print);

(<any>HotP$).connect()

// This sharing technique can be improve by using Subjects / Behavior Subjects

// MODULE: Subjects / Behavior Subjects
// - is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners.
// - A hot Observable but it has the added benefit of being able to have new value pushed to it using next
// INFO: In plumbing terms it's more like a pump where you can add new values to the stream after it's been created
// INFO: What's unique with subject is that it has a next method that we call call to add new values to the stream
// INFO: Caveat with regular subject is that you need to have subscription setup first before you start adding values

const subject$ = new Subject();

subject$.subscribe(print);

// subject$.next('Hello');
// subject$.next('World');

// this won't get latest value 'cause it subscribed late after the values were already at it.
subject$.subscribe(print);

// So here, BehaviorSubject will be useful, similar with 'Subject' except it has the concept of a current value
// it means the last emitted value be cached similar to shareReplay, so every subscription will always receive a value
// INFO: A BehaviorSubject is a ReplaySubject(1) behind the scenes that keeps track of the last value.
// This is important if we want to subscribe to that observable in a later stage (which is kinda what we do with the takeUntil operator).
// A powerful feature when doing things like state management and frontend application

const bs$ = new BehaviorSubject('What!');

bs$.subscribe(print);

// bs$.next('World');

// event though this subscriber came in late it still gets the last emitted value
// bs$.subscribe(print);

// MODULE: multicast - an operator
// used to send values to multiple subscribers but not any related side effects
// beneficial if you have multiple subscribers to a single data source(observable)
// that is running some sort of side effect

const mObservable = fromEvent(document, 'click');

const clicks =
  mObservable
    .pipe(
      tap(_ => print('Do One Time'))
    );

const subject =
  clicks
    .pipe(multicast(() => new Subject()));

// const subA = subject.subscribe(c => print(`Sub A: ${c.timeStamp}`));
// const subB = subject.subscribe(c => print(`Sub B: ${c.timeStamp}`));

(<any>subject).connect()