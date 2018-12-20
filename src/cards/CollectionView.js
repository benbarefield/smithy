import React from 'react';
import Job from './JobView';
import Item from './ItemView';
import Tool from '../tools/ToolWrapper';

export default class extends React.Component {
    render() {
        if(!this.props.cards) { return null; }
        return (
        <div className={'jobs'}>
            {this.props.cards.filter(c => c.type === 'job').map(j => <Job key={j.id} jobData={j} timeData={this.props.timeData} selected={j === this.props.selectedCard} select={this.props.sinks.select} />)}
            {this.props.cards.filter(c => c.type === 'item').map(i => <Item key={i.id} data={i} selected={i === this.props.selectedCard} select={this.props.sinks.select} />)}
            {this.props.cards.filter(c => c.type === 'tool').map(t => <Tool key={t.id} dataMap={t}/>)}
        </div>
        );
    }
}