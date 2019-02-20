import React from 'react';
import rxWrapper from '../rxWrapper';
import Card from './CardView';

class CollectionView extends React.Component {
    render() {
        if(!this.props.cards) { return null; }
        const boardCards = this.props.cards.filter(c => c.position === 0);
        return (
        <div className={'jobs'}>
            {boardCards.map(c => <Card key={c.id} cardData={c}/>)}
        </div>
        );
    }
}

export default rxWrapper(CollectionView,
    ['cards'],
    (cards) => ({cards})
);

/*
{this.props.cards.filter(c => c.type === CARD_TYPE_JOB && c.position === 0)
    .map(j => <Job key={j.id} jobData={j} timeData={this.props.timeData} selected={j === this.props.selectedCard} select={this.props.sinks.select} />)}
{this.props.cards.filter(c => c.type === CARD_TYPE_ITEM && c.position === 0)
    .map(i => <Item key={i.id} data={i} selected={i === this.props.selectedCard} select={this.props.sinks.select} />)}
 */