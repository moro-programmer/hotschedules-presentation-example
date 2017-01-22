/* @flow */
import { List, Map } from 'immutable';
import { SHOW_ALL } from '../constants/filters';

type State = {
    visibilityFilter: string,
    items: List<Map<string, any>>
};

type Action = {
    type: string,
    text?: string,
    completed?: boolean,
    id?: number,
    filter?: string
};

const defaultState = {
    visibilityFilter: SHOW_ALL,
    items: List()
};

export default function config(state: State = defaultState, action: Action = { type: '' }): State {
    switch (action.type) {
    case 'TODO:ADD':
        return Object.assign({}, state, {
            items: state.items.push(Map({ id: String(Date.now()), text: action.text, completed: false }))
        });

    case 'TODO:TOGGLE_COMPLETED' : {
        const { completed, id } = action;
        const items = state.items.map((item) => {
            let result = item;

            if (!id || item.get('id') === id) {
                result = item.update('completed', () => completed);
            }

            return result;
        });

        return Object.assign({}, state, { items });
    }
    case 'TODO:CLEAR_COMPLETED' : {
        return Object.assign({}, state, { items: state.items.filter(item => !item.get('completed')) });
    }

    case 'TODO:SET_FILTER': {
        return Object.assign({}, state, { visibilityFilter: action.filter });
    }

    default:
        return state;
    }
}
