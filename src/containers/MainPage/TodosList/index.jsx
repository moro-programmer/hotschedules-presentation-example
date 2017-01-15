import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import ListItem from './ListItem';
import styles from './index.module.scss';

class TodosList extends Component {
    constructor(props) {
        super(props);
        this.onToggleTodo = this.onToggleTodo.bind(this);
    }

    render() {
        const { todos } = this.props;

        return (
            <ul styleName='list'>
                {todos.map(todo => <ListItem key={todo.get('id')} todo={todo} toggleTodo={this.onToggleTodo} />)}
            </ul>
        );
    }

    onToggleTodo(e) {
        const { toggleTodo } = this.props;

        toggleTodo(e.target.checked, e.target.getAttribute('data-id'));
    }
}

TodosList.propTypes = {
    todos: PropTypes.object.isRequired,
    toggleTodo: PropTypes.func.isRequired
};

export default CSSModules(TodosList, styles);
