import React from 'react';
import Job from './JobView';
import Item from './ItemView';

export default class extends React.Component {
    render() {
        if(!this.props.cards) { return null; }
        return (
        <div className={'jobs'}>
            {this.props.cards.filter(c => c.type === 'job').map(j => <Job key={j.id} jobData={j} timeData={this.props.timeData} />)}
            {this.props.cards.filter(c => c.type === 'item').map(i => <Item key={i.id} data={i} />)}
        </div>
        );
    }
}