import React from 'react';
import {CARD_TYPE_JOB, CARD_TYPE_TOOL} from "../constants/cardTypes";
import rxWrapper from '../rxWrapper';

const NAME = 'Delivery';
const CARD_BASE = {
    name: NAME,
    description: "Deliver the fruits of your labor",
    slots: [
        { id: 'job_delivery_slot_1', acceptedModifiers: [CARD_TYPE_JOB] },
    ],
    type: CARD_TYPE_TOOL
};

class View extends React.Component {
    constructor(props) {
        super(props);

        this.selected = e => {
            e.stopPropagation();
            this.props.sinks.select(this.card);
        };

        this.card = Object.assign({
            sink: this.props.sinks.deliverJob
        }, CARD_BASE);
    }

    render() {
        const selected = this.props.selectedTool === this.card ? 'selected' : '';
        return (
            <div className={`card item ${selected}`} onClick={this.selected}>
                <div className={'card--icon'}>Deliver</div>
            </div>
        );
    }
}

function signalMap(selectedTool, deliverJob, removeCard, addCash) {
    deliverJob.subscribe(next => {
        next.slottedCards.forEach(c => removeCard.next(c));
        addCash.next(next.slottedCards[0].basePay); 
    });
    return {
        selectedTool
    };
}
function processCard(card) {
    return Object.assign({}, card, {
        position: 0,
        modifiers: card.modifiers.filter(m => m !== MISSHAPEN)
    });
}

export default rxWrapper(View,
    ['selectedTool', 'deliverJob', 'removeCard', 'addCash'],
    signalMap,
    (selectedTool, deliverJob) => ({deliverJob, select: selectedTool})
);
