import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.module.scss';

class TodoInput extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    render() {
        const { text } = this.state;
        return (
            <div>
                <input
                    type='text'
                    value={text}
                    styleName='input'
                    placeholder='What needs to be done?'
                    onChange={this.onChange}
                    onKeyPress={this.onKeyPress}
                />
            </div>
        );
    }

    onKeyPress(e) {
        if (e.charCode === 13) {
            const { text } = this.state;
            const { addTodo } = this.props;

            addTodo(text);
            this.setState({
                text: ''
            });
        }
    }

    onChange(e) {
        this.setState({
            text: e.target.value
        });
    }
}

TodoInput.propTypes = {
    addTodo: PropTypes.func.isRequired
};

export default CSSModules(TodoInput, styles);
