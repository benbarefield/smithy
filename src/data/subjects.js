import { Subject } from 'rxjs';
import { scan, map } from "rxjs/operators";

export let timeButton = () => new Subject();

export let timeTracker = () => new Subject()
    .pipe(scan((time, now) => {
        return {
            now,
            elapsed: now - time.now
        }
    }, { now: 0, elapsed: 0 }));

export let addCard = () => new Subject()
    .pipe(map(cardData => ({ type: 'add', cardData })));
export let removeCard = () => new Subject()
    .pipe(map(cardData => ({ type: 'remove', cardData })));

export let selectedCard = () => new Subject()
    .pipe(scan((selection, clicked) => clicked));

export let selectedTool = () => new Subject()
    .pipe(scan((selection, clicked) => clicked));

export let moveCard = () => new Subject()
    .pipe(map(({cardId, position}) => ({ type: 'move', cardId, position})));

export let purchaseFromAdventurer = () => new Subject()
    .pipe(map((slottedCards, purchase) => ({ type: 'purchase', payment: slottedCards, details: purchase })));

export let startTool = () => new Subject();
