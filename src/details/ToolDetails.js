import './ToolDetails.scss';
import React from 'react';
import rxWrapper from "../rxWrapper";
import Card from '../cards/CardView';

class ToolDetails extends React.Component {
    constructor(props) {
        super(props);

        this.startTool = e => {
            e.stopPropagation();
            const { selectedTool, cards } = this.props;
            const slottedCards = cards.filter(c => !!selectedTool.slots.find(s => s.id === c.position));
            this.props.selectedTool.sink({slottedCards});
        }
    }

    render() {
        if(!this.props.selectedTool) { return null; }
        let {description, slots} = this.props.selectedTool;
        return (
            <div className={'tool-details'}>
                <div className={'tool-details__description'}>{description}</div>
                <div className={'tool-slots'}>
                    {slots.map(s => <ToolSlot key={s.id} slotId={s.id}/> )}
                </div>
                <button className='tool-details__start' onClick={this.startTool}>Start</button>
            </div>
        )
    }
}

class ToolSlotComponent extends React.Component {
    constructor(props) {
        super(props);

        this.slotClicked = e => {
            e.stopPropagation();
            const inSlotCard = getCardInSlot(this.props.cards, this.props.slotId);
            if(!this.props.selectedCard || !!inSlotCard) { return; } // TODO: selectedCard is null until a card is selected, need to get starting values... maybe change observable/subject type
            this.props.sinks.moveCard({cardId: this.props.selectedCard.id, position: this.props.slotId});
        }
    }

    render() {
        const inSlotCard = getCardInSlot(this.props.cards, this.props.slotId);
        return (
            <div className={'tool-slots__slot'} onClick={this.slotClicked}>
                {inSlotCard ? <Card cardData={inSlotCard}/> : null}
            </div>
        )
    }
}
function getCardInSlot(cards, slotId) {
    if(!cards) { return null; }
    return cards.find(c => c.position === slotId);
}
const ToolSlot = rxWrapper(ToolSlotComponent,
    ['cards', 'selectedCard', 'moveCard'],
    (cards, selectedCard) => ({cards, selectedCard}),
    (cards, selectedCard, moveCard) => ({moveCard}));

export default rxWrapper(ToolDetails,
    ['cards','selectedTool'],
    (cards, selectedTool) => ({cards, selectedTool}));