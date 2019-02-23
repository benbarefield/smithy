import React from 'react';
import GameTime from './gameTime/Wrapper';
import Season from './season/Wrapper';
import Cards from './cards/CollectionView';
import Anvil from './tools/Anvil';
import CardDetails from './details/CardDetails';
import ToolDetails from './details/ToolDetails';
import rxWrapper from "./rxWrapper";
import { Subject } from 'rxjs';
import {map, distinct} from "rxjs/operators";

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
                <GameTime/>
                <Cards/>
                <Anvil/>
                <div className='details'>
                    <CardDetails/>
                    <ToolDetails/>
                </div>
            </div>
        );
    }
}

function signalMap(timeTracker, season, addCard, addToDataMap, selectedCard) {
    const frame = t => {
        timeTracker.next(t);
        window.requestAnimationFrame(frame);
    };
    window.requestAnimationFrame(frame);

    season.pipe(
        map(season => season.jobs.reduce((currentJob, job) => job.seasonStartTime > season.time ? job : currentJob, null)),
        distinct()
    ).subscribe(job => {
        if(job) {
            addCard.next(job);
            job.associatedCards.forEach(c => addCard.next(c));
        }
    });

    addToDataMap.next({
        key: 'anvil',
        creator: () => new Subject()
    });

    return { selectedCard };
}

export default rxWrapper(Game,
    ['timeTracker', 'season', 'addCard', 'addToDataMap', 'selectedCard', 'moveCard', 'selectedTool'],
    signalMap,
    (tt, s, ac, atdm, selectedCard, moveCard, selectedTool) => ({selectCard: selectedCard, move: moveCard, selectTool: selectedTool})
);
