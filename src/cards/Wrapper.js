import rxWrapper from '../rxWrapper';
import CollectionView from './CollectionView';

function signalMap(dataMap) {
    return {
        cards: dataMap.observables.cards,
        timeData: dataMap.observables.timeData
    };
}

export default rxWrapper(CollectionView, signalMap);