import React from 'react';
import Item from './ItemView';
import Job from './JobView';
import { CARD_TYPE_JOB, CARD_TYPE_ITEM } from '../constants/cardTypes';

const views = {
    [CARD_TYPE_JOB]: Job,
    [CARD_TYPE_ITEM]: Item
};

export default class extends React.Component {
    render() {
        const View = views[this.props.cardData.type];
        return (<View data={this.props.cardData}/>);
    }
}