import React from 'react';

export default class extends React.Component {
    render() {
        let { name, description } = this.props.data;
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