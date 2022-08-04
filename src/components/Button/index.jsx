import { Component } from 'react';

import './styles.css';

export class Button extends Component {
    render(){
        const { actionFn, disabled, text } = this.props;
        return (
            <button
                disabled={disabled}
                className='button' 
                onClick={actionFn}
                type="button"
                >
                {text}
            </button>
        )
    }
}