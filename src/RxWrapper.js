import { Component } from 'react';

class RxWrapper extends Component {
    componentDidMount() {

    }
}

export default function(wrappedComponent, dispatchMap) {
    let actions = Object.keys(dispatchMap).reduce((actions, k) => {
        actions[k] = v => dispatchMap[k].next(v);
        return actions;
    }, {});
}