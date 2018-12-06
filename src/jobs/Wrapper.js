import rxWrapper from '../rxWrapper';
import CollectionView from './CollectionView';

function signalMap(dataMap) {
    return {
        jobs: dataMap.observables.cards,
        timeData: dataMap.observables.timeData
    };
}

export default rxWrapper(CollectionView, signalMap);