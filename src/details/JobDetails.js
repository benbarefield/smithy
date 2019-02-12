import React from 'react';

export default class extends React.Component {
    render() {
        const {basePay} = this.props.card;
        return (
            <div className={'job-pay'}>
                <span className={'job-pay__description'}>Paying: </span>
                <span className={'job-pay__value'}>{basePay}</span>
                <span className={'job-pay__unit'}>g</span>
            </div>
        )
    }
}