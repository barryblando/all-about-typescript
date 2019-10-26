import { of, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'

import { print } from './util/print';

const sub = new Subject();

sub.pipe(
  // by using catchError we can handle it in the background and provide some information to the user and frontEnd
  catchError(err => of(`something broke!, but we handled it. Error: ${err}`)), // return of observable that emits raw value
  // retry(2) // retry two times, super useful when working with HTTP calls

).subscribe(print)

sub.next('good');
sub.error('Oh No! App Crashed!')

