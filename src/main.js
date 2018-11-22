import React from 'react';
import { render } from 'react-dom';

import GameTime from './gameTime/Wrapper';
import Season from './season/Wrapper';

import './main.scss';
import dataObjects from './data/dataObjects';


const dataMap = dataObjects();
const frame = t => {
    dataMap.subjects.timeTracker.next(t);
    window.requestAnimationFrame(frame);
};
window.requestAnimationFrame(frame);

render(
    (
        <div className='game'>
            <Season dataMap={dataMap}/>
            <GameTime dataMap={dataMap}/>
        </div>
    ),
    document.getElementById('main')
);