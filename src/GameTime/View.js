import './View.scss';

import React from 'react'
import { Subject, fromEvent, combineLatest, merge, from, concat } from 'rxjs';
import { map, scan } from 'rxjs/operators';


class GameTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: 0, keyCode: '', paused: false };

        this.pauseButton = new Subject();
        this.keyData = concat(from([false]), fromEvent(window, 'keyup'))
            .pipe(map(e => e.which));

        this.paused = merge(this.keyData, this.pauseButton)
            .pipe(scan((paused, value) => {
                if(value === true) { return true; }
                return value === 80 ? !paused : paused
            }, false));

        const timeTracker = new Subject()
            .pipe(scan((time, now) => {
                return {
                    now,
                    elapsed: now - time.now
                }
            }, { now: 0, elapsed: 0 }));
        this.timeData = combineLatest(timeTracker, this.paused)
            .pipe(scan((time, next) => next[1] ? time : time + next[0].elapsed, 0),
                map(time => Math.floor(time / 1000)));

        this.frame = t => {
            timeTracker.next(t);
            window.requestAnimationFrame(this.frame);
        };
        window.requestAnimationFrame(this.frame);
    }

    componentDidMount() {
        this.timeData.subscribe(currentTime => this.setState({'time': currentTime}));
        this.keyData.subscribe(key => this.setState({'keyCode': key}));
        this.paused.subscribe(paused => this.setState({paused}));
    }

    render() {
        return (
            <div className="container">
                <div className={"time--container"}>
                    Time: {this.state.time}
                </div>
                <div className={'key--container'}>
                    Key: {this.state.keyCode}
                </div>
                <button className={this.state.paused ? 'selected' : '' } onClick={() => this.pauseButton.next(true)}>
                    Pause
                </button>
            </div>
        );
    }
}

export default GameTime;