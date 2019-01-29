import React from 'react';
import { render } from 'react-dom';

import RxProvider from './RxProvider';
import Game from './Game';
import anvil from './tools/anvilData';

import './main.scss';
import dataObjects from './data/dataObjects';

render(
    (
        <RxProvider startRx={dataObjects}>
            <Game />
        </RxProvider>
    ),
    document.getElementById('main')
);

// dataMap.addCard.next(anvil(dataMap));