import React from 'react';
import Season from './season/Wrapper';
import Cards from './cards/CollectionView';
import CardDetails from './details/CardDetails';
import ToolDetails from './details/ToolDetails';
import rxWrapper from "./rxWrapper";
import {map, distinct} from "rxjs/operators";
import Footer from "./footer/Footer";
import {DECONSTRUCTABLE, MISSHAPEN} from "./constants/cardModifiers";
import {CARD_TYPE_JOB, CARD_TYPE_TOOL, TOOL_ANVIL, TOOL_DECONSTRUCTOR, TOOL_JOB_DELIVERY} from "./constants/cardTypes";

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.appClicked = () => {
            if(this.props.selectedCard && this.props.selectedCard.position !== 0) {
                this.props.sinks.move({ cardId: this.props.selectedCard.id, position: 0});
            }
            this.props.sinks.selectCard(null);
            this.props.sinks.selectTool(null);
        };
    }

    render() {
        return (
            <div className='game' onClick={this.appClicked}>
                <Season/>
                <Cards/>
                <div className='details'>
                    <ToolDetails/>
                    <CardDetails/>
                </div>
                <Footer/>
            </div>
        );
    }
}

function signalMap(timeTracker, season, addCard, selectedCard) {
    const frame = t => {
        timeTracker.next(t);
        window.requestAnimationFrame(frame);
    };
    window.requestAnimationFrame(frame);

    season.pipe(
        map(season => season.jobs.reduce((currentJob, job) => job.seasonStartTime > season.time ? job : currentJob, null)),
        distinct()
    ).subscribe(event => {
        if(event) {
            addCard.next(event);
            event.associatedCards && event.associatedCards.forEach(c => addCard.next(c));
        }
    });

    setTimeout(() => {
        addCard.next({
            id: 'TOOL_ANVIL',
            name: 'Anvil',
            description: "An anvil",
            slots: [
                {
                    id: 'anvil_slot_1',
                    acceptedModifiers: [MISSHAPEN]
                }
            ],
            type: CARD_TYPE_TOOL,
            toolType: TOOL_ANVIL,
            position: 0,
            dataSelector: dataMap => dataMap.anvil
        });
        addCard.next({
            id: 'TOOL_DELIVERY',
            name: 'Delivery',
            description: "Deliver the fruits of your labor",
            slots: [
                { id: 'job_delivery_slot_1', acceptedModifiers: [CARD_TYPE_JOB] },
            ],
            type: CARD_TYPE_TOOL,
            toolType: TOOL_JOB_DELIVERY,
            position: 0,
            dataSelector: dataMap => dataMap.jobDelivery
        });
        addCard.next({
            id: 'TOOL_DECONSTRUCTOR',
            name: 'Deconstructor',
            description: "Breaks something into its component parts and vomits the remaining resources",
            slots: [
                { id: 'deconstructor_slot_1', acceptedModifiers: [DECONSTRUCTABLE] },
            ],
            type: CARD_TYPE_TOOL,
            toolType: TOOL_DECONSTRUCTOR,
            position: 0,
            dataSelector: dataMap => {}
        });
    },1);

    return { selectedCard };
}

export default rxWrapper(Game,
    ['timeTracker', 'season', 'addCard', 'selectedCard', 'moveCard', 'selectedTool'],
    signalMap,
    (tt, s, ac, selectedCard, moveCard, selectedTool) => ({selectCard: selectedCard, move: moveCard, selectTool: selectedTool})
);
