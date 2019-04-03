import React from 'react';
import { every } from 'underscore';
import { Context } from './RxProvider';

const emptyReturn = () => { return []; };
const noop = arg => arg;

export default function(WrappedComponent, requiredSignals = emptyReturn, signalsMap = noop, sinksMap = noop) {
    class RxWrapper extends React.Component {
        constructor(props) {
            super(props);

            this.passthroughProps = Object.keys(props)
                .filter( k => k !== 'dataMap' && k !== 'children')
                .reduce((p, k) => { p[k] = this.props[k]; return p; }, {}); // TODO: do not like

            const allSignals = requiredSignals.map(k => props.dataMap[k]);
            this.signals = signalsMap(...allSignals, props.dataMap, this.passthroughProps);
            this.state = Object.keys(this.signals).reduce((s, k) => {
                if(!this.signals[k]) { return s; }
                s[k] = null;
                this.signals[k].subscribe(v => {
                    this.setState({[k]: v})
                });
                return s;
            }, {});

            const sinks = sinksMap(...allSignals, props.dataMap, this.passthroughProps);
            this.sinks = Object.keys(sinks).reduce((m, k) => {
                m[k] = v => sinks[k].next(v);
                return m;
            }, {});
        }

        render() {
            const props = Object.assign({}, this.state, {sinks: this.sinks}, this.passthroughProps);
            return (
                <WrappedComponent {...props}>
                    {this.props.children}
                </WrappedComponent>
            )
        }
    }

    function rxer(props, value) {
        if(requiredSignals.some(k => !value.dataMap[k])) { return null; }
        return (
            <RxWrapper dataMap={value.dataMap} {...props}>
                {this.props.children}
            </RxWrapper>
        )
    }

    class RxWrapperHelper extends React.Component {
        constructor(props) {
            super(props);
            this.rxer = rxer.bind(this, props);
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
