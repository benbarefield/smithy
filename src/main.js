import React from 'react';
import { render } from 'react-dom';
import GameTime from './GameTime/Wrapper';

import './main.scss';
import dataObjects from './data/dataObjects';

const dataMap = dataObjects();

render(
    (
        <GameTime dataMap={dataMap}/>
    ),
    document.getElementById('main')
);