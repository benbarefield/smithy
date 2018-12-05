import './View.scss';
import React from 'react';

export default class extends React.Component {
    render() {
        if(!this.props.seasonClass) { return null; }
        // const currentSeason = this.props.season.info.className;
        // const timeRemaining = Math.floor(this.props.season.time / 100) / 10;
        return (
            <div className={`card season ${this.props.seasonClass}`}>
                <div className={'card--icon'} />
                <div className={'card--timer'}>{`${this.props.timeRemaining}s`}</div>
            </div>
        );
    }
}