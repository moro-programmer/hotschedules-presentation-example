import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import MainPage from './containers/MainPage';
import '../styles/global.scss';

ReactDOM.render(
    <Provider store={store()}>
        <MainPage />
    </Provider>,
    document.getElementById('root')
);
