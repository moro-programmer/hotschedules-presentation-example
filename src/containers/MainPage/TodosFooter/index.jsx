import React, { PureComponent, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import * as filters from '../../../constants/filters';
import ToggleLink from '../../../components/ToggleLink';
import styles from './index.module.scss';

class TodosFooter extends PureComponent {
    constructor(props) {
        super(props);
        this.setFilter = this.setFilter.bind(this);
    }

    render() {
        const { todos, clearCompleted, visibilityFilter } = this.props;
        const hasCompleted = todos.find(item => item.get('completed'));
        const unCompletedSize = todos.filter(item => !item.get('completed')).size;

        return (
            <footer styleName='footer'>
                <span>
                    {unCompletedSize} items left
                </span>
                <span styleName='filters'>
                    <ToggleLink
                        text='All'
                        data-id='SHOW_ALL'
                        onClick={this.setFilter}
                        active={visibilityFilter === filters.SHOW_ALL}
                    />
                    <ToggleLink
                        text='Active'
                        data-id='SHOW_ACTIVE'
                        onClick={this.setFilter}
                        active={visibilityFilter === filters.SHOW_ACTIVE}
                    />
                    <ToggleLink
                        text='Completed'
                        data-id='SHOW_COMPLETED'
                        onClick={this.setFilter}
                        active={visibilityFilter === filters.SHOW_COMPLETED}
                    />
                </span>
                { hasCompleted &&
                    <span styleName='clear-link'>
                        <a href='' onClick={(e) => { e.preventDefault(); clearCompleted(); }}>Clear completed</a>
                    </span>
                }
            </footer>
        );
    }

    setFilter(e) {
        e.preventDefault();
        const { setFilter } = this.props;

        setFilter(e.target.getAttribute('data-id'));
    }
}

TodosFooter.propTypes = {
    clearCompleted: PropTypes.func.isRequired,
    setFilter: PropTypes.func.isRequired,
    todos: PropTypes.object.isRequired,
    visibilityFilter: PropTypes.string.isRequired
};

export default CSSModules(TodosFooter, styles);
