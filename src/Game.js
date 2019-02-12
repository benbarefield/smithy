import React from 'react';
import GameTime from './gameTime/Wrapper';
import Season from './season/Wrapper';
import Jobs from './cards/Wrapper';
import Anvil from './tools/Anvil';
import DetailsView from './details/DetailsView';
import rxWrapper from "./rxWrapper";
import { Subject } from 'rxjs';
import {map, distinct} from "rxjs/operators";

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.appClicked = () => this.props.sinks.select(null);
    }

    render() {
        return (
            <div className='game' onClick={this.appClicked}>
                <Season/>
                <GameTime/>
                <Jobs/>
                <Anvil/>
                <DetailsView/>
            </div>
        );
    }
}

function signalMap(timeTracker, season, addCard, addToDataMap) {
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

    return {};
}

export default rxWrapper(Game,
    ['timeTracker', 'season', 'addCard', 'addToDataMap', 'selectedCard'],
    signalMap,
    (tt, s, ac, atdm, selectedCard) => ({select: selectedCard})
);
