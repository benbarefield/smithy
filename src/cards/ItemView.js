import React from 'react';
import rxWrapper from "../rxWrapper";

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.select = e => {
            e.stopPropagation();
            this.props.sinks.select(this.props.data);
        }
    }

    render() {
        let { name } = this.props.data;
        let selected = this.props.selectedCard === this.props.data ? 'selected' : '';
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