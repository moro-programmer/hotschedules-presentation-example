import { equals } from 'ramda';

export default function localStorage(key) {
    return ({ getState }) => next => (action) => {
        const previousState = { ...getState() };
        const result = next(action);
        const nextState = { ...getState() };

        if (!equals(previousState, nextState)) {
            const storageValue = JSON.stringify(nextState);
            window.localStorage.setItem(key, storageValue);
        }

        return result;
    };
}
