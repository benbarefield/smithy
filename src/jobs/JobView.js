import React from 'react';

import './JobView.scss';

export default class extends React.Component {
    render() {
        let { type, description, basePay, startTime, timeLimit } = this.props.jobData;
        let timeRemaining = Math.round(((startTime + timeLimit) - this.props.timeData.total) / 100) / 10;
        return (
            <div className={`card job ${type}`}>
                <div className={'card--icon'}>{type}</div>
                <div className={'card--details'}>
                    <div className={'job--description'}>{description}</div>
                    <div className={'job--pay'}>
                        <span className={'job--pay__description'}>Paying: </span>
                        <span className={'job--pay__value'}>{basePay}</span>
                        <span className={'job--pay__unit'}>g</span>
                    </div>
                </div>
                <div className={'card--timer'}>{`${timeRemaining}s`}</div>
            </div>
        );
    }
}