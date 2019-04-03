import React from 'react';
import rxWrapper from "../rxWrapper";

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.select = e => {
            e.stopPropagation();
            this.props.sinks.select(this.props.cardData);
        }
    }

    render() {
        let { name } = this.props.cardData;
        let selected = this.props.selectedCard === this.props.cardData ? 'selected' : '';
        return (
            <div className={`card item ${selected}`} onClick={this.select}>
                <div className={'card--icon'}>{name}</div>
            </div>
        );
    }
}

export default rxWrapper(Item,
    ['selectedCard'],
    selectedCard => ({selectedCard}),
    selectedCard => ({select: selectedCard})
);
