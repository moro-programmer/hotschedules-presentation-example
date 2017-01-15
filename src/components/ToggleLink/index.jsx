import React, { PropTypes } from 'react';
import cx from 'classnames';
import CSSModules from 'react-css-modules';
import styles from './index.module.scss';

const ToggleLink = ({ active, text, ...rest }) => {
    const style = cx(styles.base, { [styles.active]: active });

    return (<a href='' className={style} {...rest}>{text}</a>);
};


ToggleLink.propTypes = {
    active: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};

export default CSSModules(ToggleLink, styles);
