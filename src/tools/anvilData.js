import { Subject, merge } from 'rxjs';
import { scan } from 'rxjs/operators';

export default function(dataMap) {
    let sink = new Subject();
    let observable = merge(sink, dataMap.observables.timeData).pipe(
        scan((anvil, next) => {
            let nextTime = anvil.processingTime;
            let processingCards = anvil.processing;

            if(next.elapsed) {
                nextTime = Math.max(0, nextTime - next.elapsed);
            } else if(next.processingCards && !processingCards) {
                nextTime = 30 * 1000;
                processingCards = next.processingCards;
            }

            if(nextTime === 0 && anvil.processingTime !== 0) {
                dataMap.sinks.removeCard(processingCards[0]);
                dataMap.sinks.addCard(processCard(processingCards[0]));
            }

            return Object.assign({}, anvil, {
                processingTime: nextTime,
                processing: processingCards
            });
        }, {
            processingTime: 0
        })
    );
    return {
        id: -1, // TODO: id needs to be a UUID
        type: "tool",
        sink,
        observable
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