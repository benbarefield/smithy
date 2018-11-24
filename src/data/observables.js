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
    .pipe(scan((time, next) => {
        return {
            elapsed: next[1] ? 0 : next[0].elapsed,
            total: next[1] ? time.total : time.total + next[0].elapsed
        };
    }, { elapsed: 0, total: 0 }));

function nextSeason(currentSeason) {
    switch(currentSeason) {
        case 'spring': return 'summer';
        case 'summer': return 'autumn';
        case 'autumn': return 'winter';
        case 'winter': return 'spring';
    }
}
export let season = (subjects, observables) =>
    observables.timeData
    .pipe(scan((data, time) => {
        let remaining = data.time - time.elapsed;
        let currentSeason = data.current;
        if(remaining <= 0) {
            remaining = 60 * 1000;
            currentSeason = nextSeason(currentSeason);
        }
        return Object.assign({}, data, {time : remaining, current: currentSeason})
    }, {
        time: 60 * 1000,
        current: 'spring'
    }));