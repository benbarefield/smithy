import React from 'react';

export default class extends React.Component {
    render() {
        if(!this.props.toolData) { return null; }
        const time = this.props.toolData.processingTime;
        return (
            <div className={`card item`}>
                <div className={'card--icon'}>Anvil</div>
                {time > 0 ? <div className={'card--timer'}>{`${time}s`}</div> : null}
            </div>
        );
    }
}