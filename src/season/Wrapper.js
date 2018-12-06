import rxWrapper from '../rxWrapper';
import View from './View';
import {map} from "rxjs/operators"

function signalMap(dataMap) {
    const timeRemaining = dataMap.observables.season.pipe(map(season => (season.time / 1000).toFixed(1)));
    const seasonClass = dataMap.observables.season.pipe(map(season => season.info.className));
    return {
        timeRemaining,
        seasonClass
    };
}

export default rxWrapper(View, signalMap);