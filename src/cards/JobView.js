import React from 'react';
import rxWrapper from "../rxWrapper";

class Job extends React.Component {
    constructor(props) {
        super(props);

        this.select = e => {
            e.stopPropagation();
            this.props.sinks.select(this.props.cardData);
        }
    }

    render() {
        if(!this.props.timeData) { return null; }
        let { jobType: type, completionTime } = this.props.cardData;
        let timeRemaining = ((completionTime - this.props.timeData.total) / 1000).toFixed(1);
        let selected = this.props.selectedCard === this.props.cardData ? 'selected' : '';
        return (
            <div className={`card job ${type} ${selected}`} onClick={this.select}>
                <div className={'card--icon'}>{type}</div>
                <div className={'card--timer'}>{`${timeRemaining}s`}</div>
            </div>
        );
    }
}

export default rxWrapper(Job,
    ['selectedCard', 'timeData'],
    (selectedCard, timeData) => ({timeData, selectedCard}),
    (selectedCard) => ({select: selectedCard})
);
