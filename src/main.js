import React from 'react';
import { render } from 'react-dom';

import GameTime from './gameTime/Wrapper';
import Season from './season/Wrapper';
import Jobs from './jobs/Wrapper';

import './main.scss';
import dataObjects from './data/dataObjects';
import {distinct, map, tap} from "rxjs/operators";


const dataMap = dataObjects();
const frame = t => {
    dataMap.subjects.timeTracker.next(t);
    window.requestAnimationFrame(frame);
};
window.requestAnimationFrame(frame);

dataMap.observables.season
    .pipe(
        map(season => season.jobs.reduce((currentJob, job) => job.seasonStartTime > season.time ? job : currentJob, null)),
        distinct()
    )
    .subscribe(j => { if(j) dataMap.subjects.addCard.next(j) });

render(
    (
        <div className='game'>
            <Season dataMap={dataMap}/>
            <GameTime dataMap={dataMap}/>
            <Jobs dataMap={dataMap}/>
        </div>
    ),
    document.getElementById('main')
);