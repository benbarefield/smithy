import React from 'react';
import Job from './JobView';

export default class extends React.Component {
    render() {
        if(!this.props.jobs) { return null; }
        return (
        <div className={'jobs'}>
            {this.props.jobs.map(j => <Job key={j.id} jobData={j} timeData={this.props.timeData} />)}
        </div>
        );
    }
}