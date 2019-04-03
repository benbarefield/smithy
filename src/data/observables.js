import { combineLatest, concat, from, fromEvent, merge } from "rxjs";
import { map, scan, share } from "rxjs/operators";
import { nextSeason } from '../season/seasons';
import {COPPER_BIT, MISSHAPEN} from "../constants/cardModifiers";
import {TOOL_ANVIL, TOOL_JOB_DELIVERY} from "../constants/cardTypes";

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

// required observables: timeData, addCard, removeCard, moveCard
export let cards = dataMap =>
    merge(dataMap.timeData, dataMap.addCard, dataMap.removeCard, dataMap.moveCard, dataMap.purchaseFromAdventurer)
    .pipe(scan((cards, action) => {
        if(action.type === 'add')
            return cards.concat(action.cardData);
        if(action.type === 'remove')
            return cards.filter(c => c !== action.cardData);
        if(action.type === 'move')
            return cards.map(c => c.id === action.cardId ? Object.assign(c, {position: action.position}) : c);
        if(action.type === 'purchase') {
            return cards.filter(c => action.payment.indexOf(c) < 0).concat(action.details.sold);
        }
        if(action.total) {
            return cards.filter(c => !c.completionTime || c.completionTime >= action.total); // TODO: can't use total time so card doesn't lose time in tool slot
        }
        return cards;
    }, []), share());

// required observables: addCard, removeCard
export let cash = dataMap =>
    merge(dataMap.addCard, dataMap.removeCard)
    .pipe(scan((cash, action) => {
        if(!action.cardData || !action.cardData.modifiers) { return cash; }
        if(action.type === 'add' && action.cardData.modifiers.indexOf(COPPER_BIT) >= 0) {
            return cash + 1;
        }
        if(action.type === 'remove' && action.cardData.modifiers.indexOf(COPPER_BIT) >= 0) {
            return cash - 1;
        }
        return cash;
    }, 0), share());

export let anvil = dataMap =>
    merge(dataMap.startTool, dataMap.timeData).pipe(
        scan((toolData, next) => {
            let nextTime = toolData.processingTime;
            let processingCards = toolData.processing;

            if(next.elapsed) {
                nextTime = Math.max(0, nextTime - next.elapsed);
            } else if(next.slottedCards && next.selectedTool.toolType === TOOL_ANVIL && !processingCards) {
                nextTime = 5 * 1000; // TODO: fix time and constantize
                processingCards = next.slottedCards;
            }

            if(nextTime === 0 && toolData.processingTime !== 0) {
                dataMap.removeCard.next(processingCards[0]);
                dataMap.addCard.next(processCard(processingCards[0]));
            }

            return Object.assign({}, toolData, {
                processingTime: nextTime,
                processing: processingCards
            });
        }, {
            processingTime: 0
        })
    );
function processCard(card) {
    return Object.assign({}, card, {
        position: 0,
        modifiers: card.modifiers.filter(m => m !== MISSHAPEN)
    });
}

export let jobDelivery = dataMap =>
    merge(dataMap.startTool).pipe(
        map(next => {
            if(next.selectedTool.toolType === TOOL_JOB_DELIVERY) {
                next.slottedCards[0].pay.forEach(p => dataMap.addCard.next(p));
                next.slottedCards.forEach(c => dataMap.removeCard.next(c));
            }
            return {};
        })
    );
