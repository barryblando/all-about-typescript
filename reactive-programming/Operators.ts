import {
  range,
  of,
  fromEvent,
  Observable,
  interval,
} from 'rxjs';

import {
  filter,
  map,
  take,
  scan,
  first,
  tap,
  switchMap,
} from 'rxjs/operators';

import { print } from './util/print';

// MODULE: OPERATOR
// help you control flow of data going through the observables

// Creating observable using range or from([1, 3, 3, etc..])
const source$ = range(0, 10);

// INFO: When using .pipe order matters
// data will flow through this Observable sequence chain(what you call stream / pipe) and then modified by each function/operation
source$
  .pipe(
    filter(x => x % 2 === 0), // filter emit values that meet the condition
    map(x => x + x), // transform to new array
    scan((acc, x) => acc + x, 0), // scan same as reduce,
    take(3), // only emit 3 values from the observable,
    first() // take first index in the array
  )
  .subscribe(print)
  .unsubscribe() // terminate stream

// When doing JSON API call
const jsonString = '{ "type": "Dog", "breed": "Pug" }';
const apiCall = of(jsonString);

apiCall
    .pipe(map(json => JSON.parse(json)))
    .subscribe((obj) => {
      print(obj.type);
      print(obj.breed)
    });

// When doing mouse event
let clicks1 = fromEvent(document, 'click');

clicks1
    .pipe(
      map(e => (Math.random() * 10)),
      tap(print),
      scan((highScore, score) => highScore + score, 0)
    )
    .subscribe(highScore => {
      print(`High Score ${highScore}`)
    })

// MODULE: Tap (do)
// Operator which allows you to trigger side effects from inside the observable pipe

const strSource$ = of('Barry');

const tapped = strSource$
  .pipe(
    tap(print),
    map(v => v.toUpperCase()),
    tap(print)
  );

tapped.subscribe();

// MODULE: SWitchMap
// Start with one observable and then switch to another one which is important when talking about relational data e.g 'Type Ahead', 'Firebase'

let clicks2 = fromEvent(document, 'click');

clicks2
    .pipe(switchMap(_ => interval(500)))
    .subscribe(print);

// Example Firebase Auth
const user$ = of({ uid: Math.random() });

// function that return observable
const fetchOrders = (userId: number): Observable<string> => {
  return of(`${userId}'s order data`)
};

// To get userId out of the observable
const order$ = user$.pipe(
  switchMap(user => {
    return fetchOrders(user.uid)
  })
);

order$.subscribe(print)


