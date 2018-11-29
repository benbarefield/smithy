import {combineLatest, concat, from, fromEvent, merge } from "rxjs";
import {map, scan} from "rxjs/operators";
import SEASONS from '../constants/seasons';

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

// required observables: timeData
export let season = (subjects, observables) =>
    observables.timeData
    .pipe(scan((data, time) => {
        let remaining = data.time - time.elapsed;
        if(remaining <= 0) {
            return nextSeason(data.info.name);
        }
        return Object.assign({}, data, {time : remaining});
    }, nextSeason()));
function nextSeason(currentSeasonName) {
    return {
        time: 60 * 1000,
        info: followingSeason(currentSeasonName)
    };
}
function followingSeason(currentSeasonName) {
    switch(currentSeasonName) {
        case SEASONS.SPRING.name: return SEASONS.SUMMER;
        case SEASONS.SUMMER.name: return SEASONS.AUTUMN;
        case SEASONS.AUTUMN.name: return SEASONS.WINTER;
        default: return SEASONS.SPRING;
    }
}