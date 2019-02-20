import './CardDetails.scss';
import rxWrapper from '../rxWrapper';
import React from 'react';
import JobDetails from './JobDetails';
import { CARD_TYPE_JOB } from "../constants/cardTypes";

const additionalDetailsMap = {
    [CARD_TYPE_JOB]: JobDetails,
};

class CardDetails extends React.Component {
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
                <div className='card-details__modifiers'>
                    {this.props.selectedCard.modifiers.map(m => <div className={`card-details__modifier ${m.className}`}/> )}
                </div>
            </div>
        );
    }
}

export default rxWrapper(CardDetails,
    ['selectedCard'],
    selectedCard => ({selectedCard}));