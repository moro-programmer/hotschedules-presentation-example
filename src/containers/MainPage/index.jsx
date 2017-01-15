import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import TodoInput from './TodoInput';
import TodosList from './TodosList';
import ToggleAll from './ToggleAll';
import TodosFooter from './TodosFooter';
import * as actions from '../../actions/todosActions';
import { getVisibleTodos } from '../../selectors/todoSelectors';
import styles from './index.module.scss';

/* eslint-disable */
class MainPage extends Component {
/* eslint-disable */
    render() {
        const { todos, addTodo, toggleTodo, clearCompleted, visibilityFilter, setFilter } = this.props;

        return (
            <div styleName='container'>
                <h3 styleName='header'>todos</h3>
                <div styleName='body'>
                    <ToggleAll onChange={toggleTodo} todos={todos} />
                    <TodoInput addTodo={addTodo} />
                    <TodosList todos={todos} toggleTodo={toggleTodo} />
                    <TodosFooter
                        todos={todos}
                        setFilter={setFilter}
                        clearCompleted={clearCompleted}
                        visibilityFilter={visibilityFilter}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    todos: getVisibleTodos(state),
    visibilityFilter: state.todos.visibilityFilter
});

MainPage.propTypes = {
    addTodo: PropTypes.func.isRequired,
    clearCompleted: PropTypes.func.isRequired,
    todos: PropTypes.object.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    visibilityFilter: PropTypes.string.isRequired
};

export default connect(mapStateToProps, actions)(CSSModules(MainPage, styles));
