import React from 'react';

export default function(WrappedComponent, signalsMap, sinksMap) { //default values?
    class RxWrapper extends React.Component {
        constructor(props) {
            super(props);
            const sinks = sinksMap(props.dataMap);
            this.sinks = Object.keys(sinks).reduce((m, k) => {
                m[k] = v => sinks[k].next(v);
                return m;
            }, {});
            this.signals = signalsMap(props.dataMap);
            this.state = Object.keys(this.signals).reduce((s, k) => {
                s[k] = null;
                return s;
            }, {});
        }

        componentDidMount() {
            Object.keys(this.signals).forEach(k => {
                this.signals[k].subscribe(v => {
                    this.setState({[k]: v})
                });
            });
        }

        render() {
            const props = Object.assign({}, this.state, {sinks: this.sinks});
            return <WrappedComponent {...props} />
        }
    }

    return RxWrapper;
}