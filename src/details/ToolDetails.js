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
            if(slottedCards.length !== this.props.selectedTool.slots.length) { return; }
            this.props.sinks.startTool({slottedCards, selectedTool});
        }
    }

    render() {
        if(!this.props.selectedTool) { return null; }
        const {description, slots} = this.props.selectedTool;
        const slottedCards = slots.map(s => this.props.cards.find(c => c.position === s.id));
        return (
            <div className={'tool-details'}>
                <div className={'tool-details__description'}>{description}</div>
                <div className={'tool-slots'}>
                    {slots.map(s => <ToolSlot key={s.id} slotInfo={s}/> )}
                    {slottedCards.reduce((extraSlots, card) => {
                        if(!card || !card.extendedRequirements ||!card.extendedRequirements.length) { return; }
                        return extraSlots.concat(card.extendedRequirements.map(s => <ToolSlot key={s.id} slotInfo={s} />));
                    }, [])}
                </div>
                <button className='tool-details__start' onClick={this.startTool}>Start</button>
            </div>
        );
    }
}

export default rxWrapper(ToolDetails,
    ['cards','selectedTool','startTool'],
    (cards, selectedTool) => ({cards, selectedTool}),
    (c, sT, startTool) => ({startTool}));

class ToolSlotComponent extends React.Component {
    constructor(props) {
        super(props);

        this.slotClicked = e => {
            e.stopPropagation();
            const inSlotCard = getCardInSlot(this.props.cards, this.props.slotInfo.id);
            if(!this.props.selectedCard || !!inSlotCard) { return; } // TODO: selectedCard is null until a card is selected, need to get starting values... maybe change observable/subject type
            if(!cardMatchesRequirements(this.props.slotInfo, this.props.selectedCard)) { return; }
            this.props.sinks.moveCard({cardId: this.props.selectedCard.id, position: this.props.slotInfo.id});
            this.props.sinks.selectCard(null);
        }
    }

    render() {
        const inSlotCard = getCardInSlot(this.props.cards, this.props.slotInfo.id);
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
function cardMatchesRequirements(slot, card) {
    if(!slot.acceptedModifiers || !slot.acceptedModifiers.length) { return true; }
    return (!slot.acceptedModifiers || !!slot.acceptedModifiers.find(m => m === card.type || card.modifiers.indexOf(m) > -1)) &&
        (!slot.rejectedModifiers || slot.rejectedModifiers.every(r => r !== card.type && card.modifiers.indexOf(r) < 0));
}

const ToolSlot = rxWrapper(ToolSlotComponent,
    ['cards', 'selectedCard', 'moveCard', 'startTool'],
    (cards, selectedCard) => ({cards, selectedCard}),
    (cards, selectedCard, moveCard) => ({selectCard: selectedCard, moveCard}));
