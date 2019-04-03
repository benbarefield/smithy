import React from 'react';
import rxWrapper from '../rxWrapper';

class View extends React.Component {
    constructor(props) {
        super(props);

        this.select = e => {
            e.stopPropagation();
            this.props.sinks.select(this.props.cardData);
        };
    }

    render() {
        let time = this.props.toolData ? (this.props.toolData.processingTime || 0) : 0;
        time = Math.round(time / 100) / 10;
        const selected = this.props.selectedTool === this.props.cardData ? 'selected' : '';
        return (
            <div className={`card tool ${selected}`} onClick={this.select}>
                <div className={'card--icon'}>{this.props.cardData.name}</div>
                {time > 0 ? <div className={'card--timer'}>{`${time}s`}</div> : null}
            </div>
        );
    }
}

function signalMap(selectedTool, observableMap, ownProps) {
    return {
        toolData: ownProps.cardData.dataSelector(observableMap),
        selectedTool: selectedTool
    };
}

export default rxWrapper(View,
    ['selectedTool'],
    signalMap,
    (selectedTool) => ({select: selectedTool})
);
