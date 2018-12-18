import React from 'react';

export default class extends React.Component {
    render() {
        let { name, description, quality } = this.props.data;
        if(quality !== undefined && quality <= 10) {
            description = `Broken ${description}`;
        }
        return (
            <div className={`card item`}>
                <div className={'card--icon'}>{name}</div>
                <div className={'card--details'}>
                    <div className={'item--description'}>{description}</div>
                </div>
            </div>
        );
    }
}