import { fromEvent } from 'rxjs';
import { debounceTime, throttleTime, bufferCount } from 'rxjs/operators';

// MODULE: BackPressure
// basically means an observable that's emitting way more values that you actually need

// listen to events
const event = fromEvent(document, 'mousemove');

// when hovered it will cause the observable to emit multiple events every second
// so what we do is to control it, first strategy to use debounce

// MODULE: DEBOUNCE - Wait X time, then give me the last value.
const debounced = event.pipe(
  debounceTime(1000)
  // debounce will filter out all events until they have stopped happening for a certain period of time
  // i.e TypeAhead where you don't want to make an API call until the user is done typing
);
// debounced.subscribe(print)

// MODULE: THROTTLE - Give value first, then wait X time.
const throttled = event.pipe(
  throttleTime(1000)
  // it will emit the first value but make sure that no additional value can be emitted until a certain time period has passed
);
// throttled.subscribe(print)

// MODULE: BUFFER COUNT
// Caveat of debounce & throttle is that they filtering out a lot of data if you want to keep all the data
// but just not listen to it all at once is to use buffer

const buffered = event.pipe(bufferCount(20));
// it will collect all the events into an array and then only emit when they get to a length of 20
buffered.subscribe(print);

// Conclusion: throttle gives you the very first event when you just move the mouse onto the DOM while debounce gives you the last event after you move the mouse away from the DOM

// INFO: https://css-tricks.com/the-difference-between-throttling-and-debouncing/
// INFO: https://www.codementor.io/abolaji_dev/throttling-and-debounce-with-rxjs-observable-cjcgdii1d