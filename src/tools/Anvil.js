import React from 'react';
import rxWrapper from '../rxWrapper';
import {merge} from "rxjs";
import {scan} from "rxjs/operators";
import {CARD_TYPE_TOOL} from "../constants/cardTypes";
import {MISSHAPEN} from "../constants/cardModifiers";

const ANVIL_NAME = 'Anvil';
const ANVIL_CARD = {
    name: ANVIL_NAME,
    description: "An anvil",
    slots: [
        { id: 'anvil_slot_1' }
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
            sink: this.props.sinks.anvil
        }, ANVIL_CARD);
    }

    render() {
        let time = this.props.toolData ? this.props.toolData.processingTime : 0;
        time = Math.round(time / 100) / 10;
        const selected = this.props.selectedCard === this.card ? 'selected' : '';
        return (
            <div className={`card item ${selected}`} onClick={this.selected}>
                <div className={'card--icon'}>Anvil</div>
                {time > 0 ? <div className={'card--timer'}>{`${time}s`}</div> : null}
            </div>
        );
    }
}

function signalMap(anvil, timeData, selectedTool, addCard, removeCard) {
    return {
        toolData: merge(anvil, timeData).pipe(
            scan((toolData, next) => {
                let nextTime = toolData.processingTime;
                let processingCards = toolData.processing;

                if(next.elapsed) {
                    nextTime = Math.max(0, nextTime - next.elapsed);
                } else if(next.slottedCards && !processingCards) {
                    nextTime = 5 * 1000; // TODO: fix time and constantize
                    processingCards = next.slottedCards;
                }

                if(nextTime === 0 && toolData.processingTime !== 0) {
                    removeCard.next(processingCards[0]);
                    addCard.next(processCard(processingCards[0]));
                }

                return Object.assign({}, toolData, {
                    processingTime: nextTime,
                    processing: processingCards
                });
            }, {
                processingTime: 0
            })
        ),
        selectedCard: selectedTool
    };
}
function processCard(card) {
    return Object.assign({}, card, {
        position: 0,
        modifiers: card.modifiers.filter(m => m !== MISSHAPEN)
    });
}

export default rxWrapper(View,
    ['anvil', 'timeData', 'selectedTool', 'addCard', 'removeCard'],
    signalMap,
    (anvil, timeData, selectedTool) => ({anvil, select: selectedTool})
);
