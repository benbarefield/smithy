import './DetailsView.scss';
import rxWrapper from '../rxWrapper';
import React from 'react';
import JobDetails from './JobDetails';
import * as cardTypes from '../cards/constants';

const additionalDetailsMap = {
    [cardTypes.CARD_TYPE_JOB]: JobDetails
};

class DetailsView extends React.Component {
    render() {
        if(!this.props.selectedCard) {
            return null;
        }
        const { description } = this.props.selectedCard;
        const AdditionalDetails = additionalDetailsMap[this.props.selectedCard.type];
        return (
            <div className={'card--details'}>
                <div className={'item--description'}>{description}</div>
                { AdditionalDetails ? <AdditionalDetails card={this.props.selectedCard} /> : null }
            </div>
        );
    }
}

export default rxWrapper(DetailsView,
    ['selectedCard'],
    selectedCard => ({selectedCard}));