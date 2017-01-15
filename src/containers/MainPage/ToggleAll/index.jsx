import React, { PropTypes, Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.module.scss';

class ToggleAll extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <div styleName='body'>
                <input
                    type='checkbox'
                    checked={this.isCompleted()}
                    onChange={this.onChange} />
            </div>
        );
    }

    onChange(e) {
        const { onChange } = this.props;
        onChange(e.target.checked);
    }

    isCompleted() {
        const { todos } = this.props;
        return todos.filter(item => item.get('completed')).size === todos.size && todos.size !== 0;
    }
}

ToggleAll.propTypes = {
    onChange: PropTypes.func.isRequired,
    todos: PropTypes.object.isRequired
};

export default CSSModules(ToggleAll, styles);
