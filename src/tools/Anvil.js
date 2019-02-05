import React from 'react';
import rxWrapper from '../rxWrapper';
import {merge} from "rxjs";
import {scan} from "rxjs/operators";

class View extends React.Component {
    render() {
        const time = this.props.toolData ? this.props.toolData.processingTime : 0;
        return (
            <div className={`card item`}>
                <div className={'card--icon'}>Anvil</div>
                {time > 0 ? <div className={'card--timer'}>{`${time}s`}</div> : null}
            </div>
        );
    }
}

function signalMap(anvil, timeData) {
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
        )
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
    ['anvil', 'timeData'],
    signalMap,
    anvil => ({anvil})
);