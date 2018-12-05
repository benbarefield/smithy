import rxWrapper from '../rxWrapper';
import View from './View';
import {map} from "rxjs/operators"

function signalMap(dataMap) {
    const timeRemaining = dataMap.observables.season.pipe(map(season => Math.round(season.time / 100) / 10));
    const seasonClass = dataMap.observables.season.pipe(map(season => season.info.className));
    return {
        // season: dataMap.observables.season
        timeRemaining,
        seasonClass
    };
}

export default rxWrapper(View, signalMap);