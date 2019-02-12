import './DetailsView.scss';
import rxWrapper from '../rxWrapper';
import React from 'react';
import JobDetails from './JobDetails';
import ToolDetails from './ToolDetails';
import { CARD_TYPE_JOB, CARD_TYPE_TOOL } from "../constants/cardTypes";

const additionalDetailsMap = {
    [CARD_TYPE_JOB]: JobDetails,
    [CARD_TYPE_TOOL]: ToolDetails
};

class DetailsView extends React.Component {
    render() {
        if(!this.props.selectedCard) {
            return null;
        }
        const { description } = this.props.selectedCard;
        const AdditionalDetails = additionalDetailsMap[this.props.selectedCard.type];
        return (
            <div className={'card-details'}>
                <div className={'card-details__description'}>{description}</div>
                { AdditionalDetails ? <AdditionalDetails card={this.props.selectedCard} /> : null }
            </div>
        );
    }
}

export default rxWrapper(DetailsView,
    ['selectedCard'],
    selectedCard => ({selectedCard}));