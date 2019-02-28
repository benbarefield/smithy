import './Footer.scss';
import React from 'react';
import rxWrapper from "../rxWrapper";
import GameTime from "../gameTime/View";

class Footer extends React.Component {
    render() {
        const cash = this.props.cash || 0;
        return (
            <div className='footer'>
                <div className='footer--section cash'>
                    <span>Cash</span>
                    <span className='cash--amount'>{cash}</span>
                </div>
                <div className='footer--section gameTime'>
                    <GameTime/>
                </div>
            </div>
        );
    }
}

export default rxWrapper(Footer, ['cash'], cash => ({cash}));
