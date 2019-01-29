import React from 'react';
import { every } from 'underscore';
import { Context } from './RxProvider';

const emptyReturn = () => { return []; };
const noop = arg => arg;

export default function(WrappedComponent, requiredSignals = emptyReturn, signalsMap = noop, sinksMap = noop) {
    class RxWrapper extends React.Component {
        constructor(props) {
            super(props);

            const allSignals = requiredSignals.map(k => props.dataMap[k]);
            this.signals = signalsMap(...allSignals);
            this.state = Object.keys(this.signals).reduce((s, k) => {
                if(!this.signals[k]) { return s; }
                s[k] = null;
                this.signals[k].subscribe(v => {
                    this.setState({[k]: v})
                });
                return s;
            }, {});

            const sinks = sinksMap(...allSignals);
            this.sinks = Object.keys(sinks).reduce((m, k) => {
                m[k] = v => sinks[k].next(v);
                return m;
            }, {});
        }

        render() {
            const props = Object.assign({}, this.state, {sinks: this.sinks});
            return (
                <WrappedComponent {...props}>
                    {this.props.children}
                </WrappedComponent>
            )
        }
    }

    function rxer(value) {
        if(requiredSignals.some(k => !value.dataMap[k])) { return null; }
        return (
            <RxWrapper dataMap={value.dataMap}>
                {this.props.children}
            </RxWrapper>
        )
    }

    class RxWrapperHelper extends React.Component {
        constructor(props) {
            super(props);
            this.rxer = rxer.bind(this);
        }

        render() {
            return (
                <Context.Consumer>
                    {this.rxer}
                </Context.Consumer>
            );
        }
    }

    return RxWrapperHelper;
}