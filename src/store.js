import { createStore, compose, applyMiddleware } from 'redux';
import { List, Map } from 'immutable';
import rootReducer from './reducers';
import { STORE_KEY } from './constants';
import localStorage from './middleware/localStorage';

const middlewares = [applyMiddleware(localStorage(STORE_KEY))];

if (process.env.NODE_ENV === 'development') {
    /* eslint-disable */
    const createLogger = require('redux-logger');
    /* eslint-enable */

    middlewares.push(applyMiddleware(createLogger()));

    if (window.devToolsExtension) {
        middlewares.push(window.devToolsExtension());
    }
}

function loadInitialState() {
    const data = JSON.parse(window.localStorage.getItem(STORE_KEY) || '{}');
    const result = data;

    if (data.todos && data.todos.items) {
        result.todos.items = List(data.todos.items.map(item => Map(item)));
    }

    return result;
}

export default function configureStore(initialState = loadInitialState()) {
    const store = compose(...middlewares)(createStore)(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            /* eslint-disable */
            const nextReducer = require('./reducers');
            /* eslint-enable */
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
