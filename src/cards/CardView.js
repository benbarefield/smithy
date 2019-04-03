import React from 'react';
import Item from './ItemView';
import Job from './JobView';
import Tool from './ToolView';
import {CARD_TYPE_JOB, CARD_TYPE_ITEM, CARD_TYPE_TOOL} from '../constants/cardTypes';

const views = {
    [CARD_TYPE_JOB]: Job,
    [CARD_TYPE_ITEM]: Item,
    [CARD_TYPE_TOOL]: Tool
};

export default class extends React.Component {
    render() {
        const View = views[this.props.cardData.type];
        return (<View cardData={this.props.cardData}/>);
    }
}
