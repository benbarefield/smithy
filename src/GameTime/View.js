import './View.scss';

import React from 'react'

class GameTime extends React.Component {
    componentDidMount() {
        const frame = t => {
            this.props.sinks.timeTracker(t);
            window.requestAnimationFrame(frame);
        };
        window.requestAnimationFrame(frame);
    }

    render() {
        return (
            <div className="container">
                <div className={"time--container"}>
                    Time: {this.props.time}
                </div>
                <div className={'key--container'}>
                    Key: {this.props.keyCode}
                </div>
                <button className={this.props.paused ? 'selected' : ''} onClick={e => {if(e.detail > 0) {this.props.sinks.pauseButton(true)}}}>
                    Pause
                </button>
                <button className={this.props.paused ? '' : 'selected'} onClick={() => this.props.sinks.pauseButton(false)}>
                    Normal
                </button>
            </div>
        );
    }
}

export default GameTime;