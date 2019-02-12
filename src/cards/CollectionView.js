import React from 'react';
import Job from './JobView';
import Item from './ItemView';
import * as cardTypes from './constants';

export default class extends React.Component {
    render() {
        if(!this.props.cards) { return null; }
        return (
        <div className={'jobs'}>
            {this.props.cards.filter(c => c.type === cardTypes.CARD_TYPE_JOB)
                .map(j => <Job key={j.id} jobData={j} timeData={this.props.timeData} selected={j === this.props.selectedCard} select={this.props.sinks.select} />)}
            {this.props.cards.filter(c => c.type === cardTypes.CARD_TYPE_ITEM)
                .map(i => <Item key={i.id} data={i} selected={i === this.props.selectedCard} select={this.props.sinks.select} />)}
        </div>
        );
    }
}