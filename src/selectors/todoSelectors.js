import { SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/filters';

export const getVisibleTodos = (state) => {
    const { todos: { items, visibilityFilter } } = state;

    switch (visibilityFilter) {
    case SHOW_COMPLETED :
        return items.filter(item => item.get('completed'));
    case SHOW_ACTIVE :
        return items.filter(item => !item.get('completed'));
    default :
        return items;
    }
};
