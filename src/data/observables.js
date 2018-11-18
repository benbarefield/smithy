import {combineLatest, concat, from, fromEvent, merge } from "rxjs";
import {map, scan} from "rxjs/operators";


export let whichKeyUp = (subjects, observables) =>
    concat(from([false]), fromEvent(window, 'keyup'))
        .pipe(map(e => e.which));

// required observables: whichKeyUp
const SPACE_BAR = 32;
export let paused = (subjects, observables) =>
    merge(observables.whichKeyUp, subjects.pauseButton)
        .pipe(scan((paused, value) => {
            if(value === true) { return true; }
            if(value === false) { return false; }
            return value === SPACE_BAR ? !paused : paused
        }, false));

// required observables: paused
export let timeData = (subjects, observables) =>
    combineLatest(subjects.timeTracker, observables.paused)
    .pipe(scan((time, next) => next[1] ? time : time + next[0].elapsed, 0),
          map(time => Math.floor(time / 1000)));
