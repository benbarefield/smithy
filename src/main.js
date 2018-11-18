import React from 'react';
import { render } from 'react-dom';
import GameTime from './GameTime/Wrapper';

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
        <GameTime dataMap={dataMap}/>
    ),
    document.getElementById('main')
);