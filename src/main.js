import React from 'react';
import { render } from 'react-dom';
import GameTime from './GameTime/View';

import './main.scss';

render(
    (
        <GameTime/>
    ),
    document.getElementById('main')
);