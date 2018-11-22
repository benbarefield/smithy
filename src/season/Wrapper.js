import rxWrapper from '../rxWrapper';
import View from './View';

function signalMap(dataMap) {
    return {
        season: dataMap.observables.season
    };
}

export default rxWrapper(View, signalMap);