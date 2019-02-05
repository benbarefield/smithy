import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.select = e => {
            e.stopPropagation();
            this.props.select(this.props.data);
        }
    }

    render() {
        let { name, description, quality } = this.props.data;
        let selected = this.props.selected;
        if(quality !== undefined && quality <= 10) {
            description = `Broken ${description}`;
        }
        return (
            <div className={`card item ${selected ? 'selected' : ''}`} onClick={this.select}>
                <div className={'card--icon'}>{name}</div>
                <div className={'card--details'}>
                    <div className={'item--description'}>{description}</div>
                </div>
            </div>
        );
    }
}