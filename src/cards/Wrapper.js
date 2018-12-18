import rxWrapper from '../rxWrapper';
import CollectionView from './CollectionView';

function signalMap(dataMap) {
    return {
        cards: dataMap.observables.cards,
        timeData: dataMap.observables.timeData,
        selectedCard: dataMap.subjects.selectedCard
    };
}

function sinkMap(dataMap) {
    return {
        select: dataMap.subjects.selectedCard
    }
}

export default rxWrapper(CollectionView, signalMap, sinkMap);