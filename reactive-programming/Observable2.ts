import {
  of,
  Observable,
  Observer,
  interval,
  zip,
  forkJoin,
  combineLatest,
  merge
} from 'rxjs';

import {
  map,
  take,
  delay,
} from 'rxjs/operators';

import { print } from './util/print';

// MODULE: zip (not an operator anymore, listed as observable now)
// if you have two or more observables that are the same length and connected in some way, merging its indexes

let age$ = of<number>(27, 25, 29);
let name$ = of<string>('Foo', 'Bar', 'Beer');
let isDev$ = of<boolean>(true, true, false);

// will combine arrays based of their index position in the observable
zip(age$, name$, isDev$)
  .pipe(
    map(([age, name, isDev]) => ({ age, name, isDev })),
  )
  .subscribe(x => console.log(x));

// MODULE: forkJoin (same as zip not an operator, listed as observable now)
// takes any number of Observables which can be passed either as an array or directly as arguments.
// If no input Observables are provided, resulting stream will complete immediately.
// will wait for all passed Observables to complete and then it will emit an array with last values from corresponding Observables.

const observable =
  forkJoin(
    interval(1000).pipe(take(3)), // emit 0, 1, 2 every second and complete
    interval(500).pipe(take(4)),  // emit 0, 1, 2, 3 every half a second and complete
  ).pipe(
    map(([n, m]) => n + m),
  );

observable
  .subscribe(
    value => console.log(value),
    _err => {},
    () => console.log('This is how it ends!'), // complete
  );

// Logs:
// 5 after 3 seconds
// "This is how it ends!" immediately after

// This is useful if you have a bunch of related API calls and wait for all of them to resolve before sending any data through to the UI

// MODULE: combineLatest
// useful in cases where you have multiple observables that you just want to combine into a single stream

const randomAsync$: Observable<any> = Observable.create((o: Observer<any>) => o.next(Math.random()));
const delayed = randomAsync$.pipe(delay(1000));

// combineLatest will take array of observables and it will wait for each observable to emit a value then emit together as an array
const combo = combineLatest([
  delayed, // will wait for the delay to resolve into a value before emitting anything, after that it will emit everything as an array
  randomAsync$,
  randomAsync$,
]);

combo.subscribe(print);

// In case you don't want to wait for that delay, use merge which will just emit each value one by one
// merge doesn't care about the array position of the observable, it only cares about when it emits it in the context of time
const merged = merge(
  delayed,
  randomAsync$,
  randomAsync$,
);

merged.subscribe(print)

