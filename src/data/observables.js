import {combineLatest, concat, from, fromEvent, merge } from "rxjs";
import {map, scan} from "rxjs/operators";


export let whichKeyUp = (subjects, observables) =>
    concat(from([false]), fromEvent(window, 'keyup'))
        .pipe(map(e => e.which));

// required observables: whichKeyUp
const SPACE_BAR = 32;
export let gameSpeed = (subjects, observables) =>
    merge(observables.whichKeyUp, subjects.timeButton)
        .pipe(scan((gameSpeed, subjectValue) => {
            if(subjectValue === SPACE_BAR) { return gameSpeed === 0 ? 1 : 0; }
            return subjectValue === 0 ? 0 : (subjectValue || gameSpeed);
        }, 1));

// required observables: gameSpeed
export let timeData = (subjects, observables) =>
    combineLatest(subjects.timeTracker, observables.gameSpeed)
        .pipe(scan((time, next) => {
            const speed = (next[1] === null || next[1] === undefined) ? 1 : next[1];
            const elapsed = next[0].elapsed * speed;
            return {
                elapsed,
                total: time.total + elapsed
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