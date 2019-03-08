import React from 'react';
// import rxWrapper from "../rxWrapper";

export default class JobDetails extends React.Component {
    render() {
        const {basePay, extendedRequirements} = this.props.card;
        return (
            <div className='job__details'>
                <div className='job-pay'>
                    <span className='job-pay__description'>Paying: </span>
                    <span className='job-pay__value'>{basePay}</span>
                    <span className='job-pay__unit'>g</span>
                </div>
                <div className='job__requirements'>
                    {
                        extendedRequirements.reduce((rs, c) => rs.concat(
                            c.acceptedModifiers.map((m, i) => <div key={`card-details__modifier--${i}`} className={`card-details__modifier ${m.className}`}/>)
                        ), [])
                    }
                </div>
            </div>
        )
    }
}

// export default rxWrapper(JobDetails)
