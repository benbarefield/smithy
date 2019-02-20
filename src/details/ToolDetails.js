import './ToolDetails.scss';
import React from 'react';
import rxWrapper from "../rxWrapper";
import Card from '../cards/CardView';

class ToolSlotComponent extends React.Component {
    constructor(props) {
        super(props);

        this.slotClicked = e => {
            e.stopPropagation();
            const inSlotCard = getCardInSlot(this.props.cards, this.props.slotId);
            if(!this.props.selectedCard || !!inSlotCard) { return; }
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

class ToolDetails extends React.Component {
    render() {
        if(!this.props.selectedTool) { return null; }
        let {description, slots} = this.props.selectedTool;
        return (
            <div className={'tool-details'}>
                <div className={'tool-details__description'}>{description}</div>
                <div className={'tool-slots'}>
                    {slots.map(s => <ToolSlot key={s.id} slotId={s.id}/> )}
                </div>
            </div>
        )
    }
}

export default rxWrapper(ToolDetails,
    ['selectedTool'],
    (selectedTool) => ({selectedTool}));