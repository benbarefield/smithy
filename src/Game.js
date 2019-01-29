import React from 'react';
import GameTime from './gameTime/Wrapper';
import Season from './season/Wrapper';
import Jobs from './cards/Wrapper';
import rxWrapper from "./rxWrapper";
import {map, distinct} from "rxjs/operators";

class Game extends React.Component {
    render() {
        return (
            <div className='game'>
                <Season/>
                <GameTime/>
                <Jobs/>
            </div>
        );
    }
}

function signalMap(timeTracker, season, addCard) {
    const frame = t => {
        timeTracker.next(t);
        window.requestAnimationFrame(frame);
    };
    window.requestAnimationFrame(frame);

    season.pipe(
        map(season => season.jobs.reduce((currentJob, job) => job.seasonStartTime > season.time ? job : currentJob, null)),
        distinct()
    ).subscribe(j => {
        if(j) {
            addCard.next(j);
            j.associatedCards.forEach(c => addCard.next(c));
        }
    });

    return {};
}

export default rxWrapper(Game,
    ['timeTracker', 'season', 'addCard'],
    signalMap
);