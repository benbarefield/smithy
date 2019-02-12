import React from 'react';

export default class extends React.Component {
    render() {
        let {slots} = this.props.card;
        return (
            <div className={"tool-slots"}>
                {slots.map(s => <div className={'tool-slots__slot'} key={s.id} /> )}
            </div>
        )
    }
}