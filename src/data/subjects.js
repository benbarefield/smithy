import {Subject} from 'rxjs';
import {scan} from "rxjs/operators";

export let timeButton = () => new Subject();

export let timeTracker = () => new Subject()
    .pipe(scan((time, now) => {
        return {
            now,
            elapsed: now - time.now
        }
    }, { now: 0, elapsed: 0 }));

export let addCard = () => new Subject();
// export let removeCard = () => new Subject();//??