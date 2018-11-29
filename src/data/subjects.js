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

export let contracts = () => new Subject()
    .pipe(scan((contracts, contract) => {
        if(contracts.indexOf(contract) >= 0) {
            return contracts.filter(c => c !== contract);
        }
        return contracts.concat(contract);
    }));