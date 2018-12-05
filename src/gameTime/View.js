import './View.scss';

import React from 'react'

class GameTime extends React.Component {
    render() {
        return (
            <div className="game-time--container">
                <button className={this.props.gameSpeed === 0 ? 'selected' : ''} onClick={setSpeed.bind(this, 0)}>
                    Pause
                </button>
                <button className={this.props.gameSpeed === 1 ? 'selected' : ''} onClick={setSpeed.bind(this, 1)}>
                    Normal
                </button>
            </div>
        );
    }
}

function setSpeed(speed, e) {
    if(e.detail > 0)
        this.props.sinks.timeButton({ speed });
}

export default GameTime;

/*
<div className={"time--container"}>
                    Time: {this.props.time}
                </div>
                <div className={'key--container'}>
                    Key: {this.props.keyCode}
                </div>
 */