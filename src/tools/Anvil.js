import React from 'react';
import rxWrapper from '../rxWrapper';
import {merge} from "rxjs";
import {scan} from "rxjs/operators";

const ANVIL_NAME = 'Anvil';

class View extends React.Component {
    constructor(props) {
        super(props);
        this.selected = selected.bind(this);
    }

    render() {
        let time = this.props.toolData ? this.props.toolData.processingTime : 0;
        time = Math.round(time / 100) / 10;
        const selected = this.props.selectedCard && this.props.selectedCard.name === ANVIL_NAME ? 'selected' : '';
        return (
            <div className={`card item ${selected}`} onClick={this.selected}>
                <div className={'card--icon'}>Anvil</div>
                {time > 0 ? <div className={'card--timer'}>{`${time}s`}</div> : null}
            </div>
        );
    }
}

function selected(e) {
    e.stopPropagation();
    if(this.props.selectedCard) {
        this.props.sinks.anvil({ processingCards: [this.props.selectedCard] });
    }
    this.props.sinks.select({name: ANVIL_NAME});
}

function signalMap(anvil, timeData, selectedCard) {
    return {
        toolData: merge(anvil, timeData).pipe(
            scan((toolData, next) => {
                let nextTime = toolData.processingTime;
                let processingCards = toolData.processing;

                if(next.elapsed) {
                    nextTime = Math.max(0, nextTime - next.elapsed);
                } else if(next.processingCards && !processingCards) {
                    nextTime = 30 * 1000;
                    processingCards = next.processingCards;
                }

                if(nextTime === 0 && toolData.processingTime !== 0) {
                    dataMap.sinks.removeCard(processingCards[0]);
                    dataMap.sinks.addCard(processCard(processingCards[0]));
                }

                return Object.assign({}, toolData, {
                    processingTime: nextTime,
                    processing: processingCards
                });
            }, {
                processingTime: 0
            })
        ),
        selectedCard
    };
}
function processCard(card) {
    if(card.quality) {
        return Object.assign({}, card, {
            quality: card.quality + Math.ceil(0.75 * card.maxQuality)
        });
    }
    return card;
}

export default rxWrapper(View,
    ['anvil', 'timeData', 'selectedCard'],
    signalMap,
    (anvil, timeData, selectedCard) => ({anvil, select: selectedCard})
);
