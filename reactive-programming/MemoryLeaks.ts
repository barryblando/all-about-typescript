import { interval, timer, of } from 'rxjs';
import { takeWhile, takeUntil, finalize } from 'rxjs/operators';

import { print } from './util/print';

const source = interval(100);

// MODULE: Basic Prevention
const subscription = source.subscribe(v => {
  print(v);
  if (v >= 10) {
    subscription.unsubscribe(); // will stop the leak
  }
});

// MODULE: takeUntil, takeWhile

// *takeUntil - Allows us to complete an observable based on the value of another observable

const intVal = interval(500);
const notifier = timer(2000);

// interval is going to emit values every 500ms until the timer runs out after 2s
intVal
    .pipe(
      takeUntil(notifier),
      // finalize(() => print('Complete!')) // or use finalize to terminate stream
    )
    .subscribe(i => print(i));

// *takeWhile - will tell observable to emit values until a certain condition turns true

const names = of('Bob', 'Jeff', 'Doug', 'Steve');

names
  .pipe(
    takeWhile(name => name != 'Doug'), // emit until doug found
    finalize(() => print('Complete! I found Doug!'))
  )
  .subscribe(print)


