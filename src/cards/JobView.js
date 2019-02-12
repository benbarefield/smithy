import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.select = e => {
            e.stopPropagation();
            this.props.select(this.props.jobData);
        }
    }

    render() {
        let { jobType: type, completionTime } = this.props.jobData;
        let timeRemaining = ((completionTime - this.props.timeData.total) / 1000).toFixed(1);
        return (
            <div className={`card job ${type}`} onClick={this.select}>
                <div className={'card--icon'}>{type}</div>
                <div className={'card--timer'}>{`${timeRemaining}s`}</div>
            </div>
        );
    }
}