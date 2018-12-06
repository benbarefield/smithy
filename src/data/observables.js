import { combineLatest, concat, from, fromEvent, merge } from "rxjs";
import { map, scan, share } from "rxjs/operators";
import { nextSeason } from '../season/seasons';

export let whichKeyUp = (subjects, observables) =>
    concat(from([false]), fromEvent(window, 'keyup'))
        .pipe(map(e => e.which), share());

// required observables: whichKeyUp
const SPACE_BAR = 32;
export let gameSpeed = (subjects, observables) =>
    merge(observables.whichKeyUp, subjects.timeButton)
        .pipe(scan((gameSpeed, subjectValue) => {
            if(subjectValue && subjectValue.speed !== undefined) { return subjectValue.speed; }
            if(subjectValue === SPACE_BAR) { return gameSpeed === 0 ? 1 : 0; }
            return gameSpeed;
        }, 1), share());

// required observables: gameSpeed
export let timeData = (subjects, observables) =>
    combineLatest(subjects.timeTracker, observables.gameSpeed)
        .pipe(scan((time, [timeData, gameSpeed]) => {
            const speed = (gameSpeed === null || gameSpeed === undefined) ? 1 : gameSpeed;
            const elapsed = timeData.elapsed * speed;
            return {
                elapsed,
                total: time.total + elapsed
            };
        }, { elapsed: 0, total: 0 }), share());

// required observables: timeData
export let season = (subjects, observables) =>
    observables.timeData
    .pipe(scan((data, time) => {
        let remaining = data.time - time.elapsed;
        if(remaining <= 0) {
            return nextSeason(data.info.name, time.total);
        }
        return Object.assign({}, data, {time : remaining});
    }, nextSeason()), share());

export let cards = (subjects, observables) =>
    merge(observables.timeData, subjects.addCard) // this will update to a merge
    .pipe(scan((cards, action) => {
        if(action.type === 'add')
            return cards.concat(action.cardData);
        if(action.total) {
            return cards.filter(c => c.completionTime >= action.total);
        }
        return cards;
    }, []));