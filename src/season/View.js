import './View.scss';
import React from 'react';

export default class extends React.Component {
    render() {
        if(!this.props.season) { return null; }
        const currentSeason = this.props.season.current;
        const timeRemaining = Math.floor(this.props.season.time / 100) / 10;
        return (
            <div className={`card season ${currentSeason}`}>
                <div className={'card--icon'} />
                <div className={'card--timer'}>{`${timeRemaining}s`}</div>
            </div>
        );
    }
}