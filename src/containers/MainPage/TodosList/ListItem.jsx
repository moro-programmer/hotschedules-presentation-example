import React, { PropTypes } from 'react';
import cx from 'classnames';
import CSSModules from 'react-css-modules';
import styles from './index.module.scss';

const ListItem = ({ todo, toggleTodo }) => {
    const { id, completed, text } = todo.toObject();
    const textStyle = cx(styles.itemText, { [styles.itemTextCompleted]: completed });

    return (
        <li data-id={id} styleName='item'>
            <div>
                <input type='checkbox' data-id={id} checked={completed} onChange={toggleTodo} />
                <span className={textStyle}>
                    {text}
                </span>
            </div>
        </li>
    );
};


ListItem.propTypes = {
    todo: PropTypes.object.isRequired,
    toggleTodo: PropTypes.func.isRequired
};

export default CSSModules(ListItem, styles);
