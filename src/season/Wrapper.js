import rxWrapper from '../rxWrapper';
import View from './View';
import {map} from "rxjs/operators"

function signalMap(season) {
    const timeRemaining = season.pipe(map(season => (season.time / 1000).toFixed(1)));
    const seasonClass = season.pipe(map(season => season.info.className));
    return { timeRemaining, seasonClass };
}

export default rxWrapper(View, ['season'], signalMap);