import { combineLatest, concat, from, fromEvent, merge } from "rxjs";
import { map, scan, share } from "rxjs/operators";
import { nextSeason } from '../season/seasons';

export let whichKeyUp = () =>
    concat(from([false]), fromEvent(window, 'keyup'))
        .pipe(map(e => e.which), share());

// required observables: whichKeyUp
const SPACE_BAR = 32;
export let gameSpeed = dataMap =>
    merge(dataMap.whichKeyUp, dataMap.timeButton)
        .pipe(scan((gameSpeed, subjectValue) => {
            if(subjectValue && subjectValue.speed !== undefined) { return subjectValue.speed; }
            if(subjectValue === SPACE_BAR) { return gameSpeed === 0 ? 1 : 0; }
            return gameSpeed;
        }, 1), share());

// required observables: gameSpeed
export let timeData = dataMap =>
    combineLatest(dataMap.timeTracker, dataMap.gameSpeed)
        .pipe(scan((time, [timeData, gameSpeed]) => {
            const speed = (gameSpeed === null || gameSpeed === undefined) ? 1 : gameSpeed;
            const elapsed = timeData.elapsed * speed;
            return {
                elapsed,
                total: time.total + elapsed
            };
        }, { elapsed: 0, total: 0 }), share());

// required observables: timeData
export let season = dataMap =>
    dataMap.timeData
    .pipe(scan((data, time) => {
        let remaining = data.time - time.elapsed;
        if(remaining <= 0) {
            return nextSeason(data.info.name, time.total);
        }
        return Object.assign({}, data, {time : remaining});
    }, nextSeason()), share());

export let cards = dataMap =>
    merge(dataMap.timeData, dataMap.addCard, dataMap.moveCard) // todo: remove card
    .pipe(scan((cards, action) => {
        if(action.type === 'add')
            return cards.concat(action.cardData);
        if(action.type === 'move')
            return cards.map(c => c.id === action.cardId ? Object.assign(c, {position: action.position}) : c);
        if(action.total) {
            return cards.filter(c => !c.completionTime || c.completionTime >= action.total); // TODO: can't use total time so card doesn't lose time in tool slot
        }
        return cards;
    }, []), share());