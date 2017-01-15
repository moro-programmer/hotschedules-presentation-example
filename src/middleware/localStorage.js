import { equals } from 'ramda';

export default function localStorage(key) {
    return ({ getState }) => next => (action) => {
        const previousState = Object.assign({}, getState());
        const result = next(action);
        const nextState = Object.assign({}, getState());

        if (!equals(previousState, nextState)) {
            const storageValue = JSON.stringify(nextState);
            window.localStorage.setItem(key, storageValue);
        }

        return result;
    };
}
