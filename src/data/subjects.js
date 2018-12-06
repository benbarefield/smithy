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
    .pipe(map(cardData => { return { type: 'add', cardData }; }));
// export let removeCard = () => new Subject();//??