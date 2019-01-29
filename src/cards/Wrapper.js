import rxWrapper from '../rxWrapper';
import CollectionView from './CollectionView';

export default rxWrapper(CollectionView,
    ['cards', 'timeData', 'selectedCard'],
    (cards, timeData, selectedCard) => ({cards, timeData, selectedCard}),
    (cards, timeData, selectedCard) => ({selectedCard})
);