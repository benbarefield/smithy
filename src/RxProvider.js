import React from 'react';
import { Subject, merge } from 'rxjs';
import { map, scan } from 'rxjs/Operators';

export const Context = React.createContext(null);

class RxProvider extends React.Component {
    constructor(props) {
        super(props);
        this.actions = createActions();
        this.dataMapper = createDataMapObservable(this.actions);
        this.state = { dataMap: this.actions };
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }

    componentDidMount() {
        this.dataMapper.subscribe(dataMap => {
            this.setState({dataMap});
        });
        this.props.startRx((key, creator) => this.actions.addToDataMap.next({key, creator}));
    }
}

function createActions() {
    return {
        addToDataMap: new Subject().pipe(map(metadata => {
            return Object.assign({ type: 'add' }, metadata);
        })),
        removeFromDataMap: new Subject().pipe(map(metadata => {
            return Object.assign({ type: 'remove' }, metadata);
        }))
    };
}

function createDataMapObservable({addToDataMap, removeFromDataMap}) {
    return merge(addToDataMap, removeFromDataMap).pipe(scan((dataMap, action) => {
        if(action.type === 'add') {
            if(dataMap[action.key]) { console.error(`key: ${action.key} already exists. ignoring.`); }
            else {
                return Object.assign({}, dataMap, {[action.key]: action.creator(dataMap)});
            }
        } else if(action.type === 'remove') {
            if(!dataMap[action.key]) { console.error(`key: ${action.key} does not exist. ignoring`); }
            else {
                const newDataMap = Object.assign({}, dataMap);
                delete dataMap[action.key];
                return newDataMap;
            }
        }
        return dataMap
    }, {
        addToDataMap,
        removeFromDataMap
    }));
}

export default RxProvider;